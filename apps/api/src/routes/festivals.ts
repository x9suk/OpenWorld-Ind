import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
    const offset = (page - 1) * limit;
    const stateId = req.query.state_id as string;
    const month = req.query.month as string;

    const conditions: string[] = [];
    const params: any[] = [];

    if (stateId) {
      conditions.push('state_id = ?');
      params.push(stateId);
    }
    if (month) {
      conditions.push('month LIKE ?');
      params.push(`%${month}%`);
    }

    const where = conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : '';

    const countStmt = db.prepare('SELECT COUNT(*) as total FROM festivals' + where);
    const { total } = countStmt.get(...params) as { total: number };

    const stmt = db.prepare('SELECT * FROM festivals' + where + ' ORDER BY name ASC LIMIT ? OFFSET ?');
    const rows = stmt.all(...params, limit, offset);

    res.json({ success: true, data: rows, total });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:slug', (req: Request, res: Response) => {
  try {
    const stmt = db.prepare('SELECT * FROM festivals WHERE slug = ?');
    const row = stmt.get(req.params.slug);
    if (!row) {
      return res.status(404).json({ success: false, error: 'Festival not found' });
    }
    res.json({ success: true, data: row });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
