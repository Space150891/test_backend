import express from 'express';
import jobsRoute from './jobs';

const router = express.Router();
router.use('/jobs', jobsRoute);

export default router;
