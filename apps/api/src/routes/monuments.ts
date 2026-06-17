import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
    const offset = (page - 1) * limit;
    const stateId = req.query.state_id as string;

    let countSql = 'SELECT COUNT(*) as total FROM monuments';
    let sql = 'SELECT * FROM monuments';
    const params: any[] = [];

    if (stateId) {
      countSql += ' WHERE state_id = ?';
      sql += ' WHERE state_id = ?';
      params.push(stateId);
    }

    sql += ' ORDER BY name ASC LIMIT ? OFFSET ?';

    const countStmt = db.prepare(countSql);
    const { total } = countStmt.get(...params) as { total: number };

    const stmt = db.prepare(sql);
    const rows = stmt.all(...params, limit, offset);

    res.json({ success: true, data: rows, total });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:slug', (req: Request, res: Response) => {
  try {
    const stmt = db.prepare('SELECT * FROM monuments WHERE slug = ?');
    const row = stmt.get(req.params.slug);
    if (!row) {
      return res.status(404).json({ success: false, error: 'Monument not found' });
    }
    res.json({ success: true, data: row });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
