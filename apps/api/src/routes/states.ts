import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

function parseJsonFields(row: any): any {
  if (!row) return row;
  const fields = ['languages', 'major_cities', 'tourist_attractions', 'famous_foods', 'festivals'];
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

    const countStmt = db.prepare('SELECT COUNT(*) as total FROM states');
    const { total } = countStmt.get() as { total: number };

    const stmt = db.prepare('SELECT * FROM states ORDER BY name ASC LIMIT ? OFFSET ?');
    const rows = stmt.all(limit, offset) as any[];
    const data = rows.map(parseJsonFields);

    res.json({ success: true, data, total });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:slug', (req: Request, res: Response) => {
  try {
    const stmt = db.prepare('SELECT * FROM states WHERE slug = ?');
    const row = stmt.get(req.params.slug) as any;
    if (!row) {
      return res.status(404).json({ success: false, error: 'State not found' });
    }
    res.json({ success: true, data: parseJsonFields(row) });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:slug/districts', (req: Request, res: Response) => {
  try {
    const stateStmt = db.prepare('SELECT id FROM states WHERE slug = ?');
    const state = stateStmt.get(req.params.slug) as any;
    if (!state) {
      return res.status(404).json({ success: false, error: 'State not found' });
    }
    const stmt = db.prepare('SELECT * FROM districts WHERE state_id = ?');
    const rows = stmt.all(state.id);
    res.json({ success: true, data: rows });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:slug/cities', (req: Request, res: Response) => {
  try {
    const stateStmt = db.prepare('SELECT id FROM states WHERE slug = ?');
    const state = stateStmt.get(req.params.slug) as any;
    if (!state) {
      return res.status(404).json({ success: false, error: 'State not found' });
    }
    const stmt = db.prepare('SELECT * FROM cities WHERE state_id = ?');
    const rows = stmt.all(state.id);
    res.json({ success: true, data: rows });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:slug/monuments', (req: Request, res: Response) => {
  try {
    const stateStmt = db.prepare('SELECT id FROM states WHERE slug = ?');
    const state = stateStmt.get(req.params.slug) as any;
    if (!state) {
      return res.status(404).json({ success: false, error: 'State not found' });
    }
    const stmt = db.prepare('SELECT * FROM monuments WHERE state_id = ?');
    const rows = stmt.all(state.id);
    res.json({ success: true, data: rows });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:slug/foods', (req: Request, res: Response) => {
  try {
    const stateStmt = db.prepare('SELECT id FROM states WHERE slug = ?');
    const state = stateStmt.get(req.params.slug) as any;
    if (!state) {
      return res.status(404).json({ success: false, error: 'State not found' });
    }
    const stmt = db.prepare('SELECT * FROM foods WHERE state_id = ?');
    const rows = stmt.all(state.id);
    res.json({ success: true, data: rows });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:slug/festivals', (req: Request, res: Response) => {
  try {
    const stateStmt = db.prepare('SELECT id FROM states WHERE slug = ?');
    const state = stateStmt.get(req.params.slug) as any;
    if (!state) {
      return res.status(404).json({ success: false, error: 'State not found' });
    }
    const stmt = db.prepare('SELECT * FROM festivals WHERE state_id = ?');
    const rows = stmt.all(state.id);
    res.json({ success: true, data: rows });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
