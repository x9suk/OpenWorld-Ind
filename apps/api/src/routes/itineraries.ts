import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

function parseDayPlans(row: any): any {
  if (!row) return row;
  if (typeof row.day_plans === 'string') {
    try { row.day_plans = JSON.parse(row.day_plans); } catch { row.day_plans = []; }
  }
  return row;
}

router.get('/', (req: Request, res: Response) => {
  try {
    const stateId = req.query.state_id as string;
    const type = req.query.type as string;

    const conditions: string[] = [];
    const params: any[] = [];

    if (stateId) {
      conditions.push('state_id = ?');
      params.push(stateId);
    }
    if (type) {
      conditions.push('type = ?');
      params.push(type);
    }

    const where = conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : '';
    const stmt = db.prepare('SELECT * FROM itineraries' + where + ' ORDER BY title ASC');
    const rows = stmt.all(...params).map(parseDayPlans);

    res.json({ success: true, data: rows });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const stmt = db.prepare('SELECT * FROM itineraries WHERE id = ?');
    const row = stmt.get(req.params.id) as any;
    if (!row) {
      return res.status(404).json({ success: false, error: 'Itinerary not found' });
    }
    res.json({ success: true, data: parseDayPlans(row) });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
