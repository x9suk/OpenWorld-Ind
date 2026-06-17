import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

function parseJsonFields(row: any): any {
  if (!row) return row;
  const fields = ['personalities', 'locations'];
  for (const field of fields) {
    if (typeof row[field] === 'string') {
      try { row[field] = JSON.parse(row[field]); } catch { row[field] = []; }
    }
  }
  return row;
}

router.get('/', (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
    const offset = (page - 1) * limit;
    const period = req.query.period as string;

    let countSql = 'SELECT COUNT(*) as total FROM historical_events';
    let sql = 'SELECT * FROM historical_events';
    const params: any[] = [];

    if (period) {
      countSql += ' WHERE period = ?';
      sql += ' WHERE period = ?';
      params.push(period);
    }

    sql += ' ORDER BY year ASC LIMIT ? OFFSET ?';

    const countStmt = db.prepare(countSql);
    const { total } = countStmt.get(...params) as { total: number };

    const stmt = db.prepare(sql);
    const rows = stmt.all(...params, limit, offset).map(parseJsonFields);

    res.json({ success: true, data: rows, total });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/timeline', (req: Request, res: Response) => {
  try {
    const stmt = db.prepare('SELECT * FROM historical_events ORDER BY year ASC');
    const rows = stmt.all().map(parseJsonFields);
    res.json({ success: true, data: rows });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/period/:period', (req: Request, res: Response) => {
  try {
    const stmt = db.prepare('SELECT * FROM historical_events WHERE period = ? ORDER BY year ASC');
    const rows = stmt.all(req.params.period).map(parseJsonFields);
    res.json({ success: true, data: rows });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const stmt = db.prepare('SELECT * FROM historical_events WHERE id = ?');
    const row = stmt.get(req.params.id) as any;
    if (!row) {
      return res.status(404).json({ success: false, error: 'Event not found' });
    }
    res.json({ success: true, data: parseJsonFields(row) });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
