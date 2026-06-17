import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  try {
    const q = (req.query.q as string || '').trim();
    if (!q) {
      return res.json({ success: true, data: [] });
    }

    const like = `%${q}%`;
    const results: any[] = [];

    const stateStmt = db.prepare("SELECT id, name, slug, 'state' as entity_type FROM states WHERE name LIKE ? OR capital LIKE ? OR culture_description LIKE ? OR economy_overview LIKE ?");
    const states = stateStmt.all(like, like, like, like);
    for (const s of states) results.push(s);

    const cityStmt = db.prepare("SELECT id, name, slug, 'city' as entity_type FROM cities WHERE name LIKE ? OR description LIKE ?");
    const cities = cityStmt.all(like, like);
    for (const c of cities) results.push(c);

    const monumentStmt = db.prepare("SELECT id, name, slug, 'monument' as entity_type FROM monuments WHERE name LIKE ? OR description LIKE ? OR history LIKE ?");
    const monuments = monumentStmt.all(like, like, like);
    for (const m of monuments) results.push(m);

    const foodStmt = db.prepare("SELECT id, name, slug, 'food' as entity_type FROM foods WHERE name LIKE ? OR description LIKE ?");
    const foods = foodStmt.all(like, like);
    for (const f of foods) results.push(f);

    const festivalStmt = db.prepare("SELECT id, name, slug, 'festival' as entity_type FROM festivals WHERE name LIKE ? OR description LIKE ?");
    const festivals = festivalStmt.all(like, like);
    for (const f of festivals) results.push(f);

    res.json({ success: true, data: results });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
