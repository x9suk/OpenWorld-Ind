import { Router, Request, Response } from 'express';
import db from '../db';
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
}

const router = Router();

router.post('/', (req: Request, res: Response) => {
  try {
    const { userId, type, data } = req.body;
    if (!userId || !type || !data) {
      return res.status(400).json({ success: false, error: 'userId, type, and data are required' });
    }

    const id = generateId();
    const now = new Date().toISOString();
    const stmt = db.prepare('INSERT INTO contributions (id, user_id, type, data, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)');
    stmt.run(id, userId, type, JSON.stringify(data), now, now);

    res.status(201).json({ success: true, data: { id, userId, type, data, status: 'pending', createdAt: now, updatedAt: now } });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/', (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
    const offset = (page - 1) * limit;
    const status = req.query.status as string;

    let countSql = 'SELECT COUNT(*) as total FROM contributions';
    let sql = 'SELECT * FROM contributions';
    const params: any[] = [];

    if (status) {
      countSql += ' WHERE status = ?';
      sql += ' WHERE status = ?';
      params.push(status);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';

    const countStmt = db.prepare(countSql);
    const { total } = countStmt.get(...params) as { total: number };

    const stmt = db.prepare(sql);
    const rows = stmt.all(...params, limit, offset) as any[];
    const data = rows.map((row: any) => {
      if (typeof row.data === 'string') {
        try { row.data = JSON.parse(row.data); } catch { }
      }
      return row;
    });

    res.json({ success: true, data, total });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.patch('/:id/status', (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, error: 'status is required' });
    }

    const stmt = db.prepare('UPDATE contributions SET status = ?, updated_at = ? WHERE id = ?');
    const result = stmt.run(status, new Date().toISOString(), req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, error: 'Contribution not found' });
    }

    res.json({ success: true, data: { id: req.params.id, status } });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
