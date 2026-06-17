import { Router } from 'express';
import statesRouter from './states';
import citiesRouter from './cities';
import monumentsRouter from './monuments';
import foodsRouter from './foods';
import festivalsRouter from './festivals';
import historyRouter from './history';
import searchRouter from './search';
import quizRouter from './quiz';
import itinerariesRouter from './itineraries';
import contributionsRouter from './contributions';

const router = Router();

router.use('/api/states', statesRouter);
router.use('/api/cities', citiesRouter);
router.use('/api/monuments', monumentsRouter);
router.use('/api/foods', foodsRouter);
router.use('/api/festivals', festivalsRouter);
router.use('/api/history', historyRouter);
router.use('/api/search', searchRouter);
router.use('/api/quiz', quizRouter);
router.use('/api/itineraries', itinerariesRouter);
router.use('/api/contributions', contributionsRouter);

export default router;
