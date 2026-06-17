import { Router, Request, Response } from 'express';
import db from '../db';

const router = Router();

function parseQuestions(row: any): any {
  if (!row) return row;
  if (typeof row.questions === 'string') {
    try { row.questions = JSON.parse(row.questions); } catch { row.questions = []; }
  }
  return row;
}

router.get('/', (req: Request, res: Response) => {
  try {
    const category = req.query.category as string;
    let sql = 'SELECT * FROM quizzes';
    const params: any[] = [];

    if (category) {
      sql += ' WHERE category = ?';
      params.push(category);
    }

    sql += ' ORDER BY title ASC';
    const stmt = db.prepare(sql);
    const rows = stmt.all(...params).map(parseQuestions);

    res.json({ success: true, data: rows });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

router.get('/:id', (req: Request, res: Response) => {
  try {
    const stmt = db.prepare('SELECT * FROM quizzes WHERE id = ?');
    const row = stmt.get(req.params.id) as any;
    if (!row) {
      return res.status(404).json({ success: false, error: 'Quiz not found' });
    }
    res.json({ success: true, data: parseQuestions(row) });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
