import express from 'express';
import { JobService } from "../../services/JobService";

const router = express.Router();

router.get('/list', JobService.listJobs);
router.post('/create', JobService.createJob);
router.delete('/job/:jobId', JobService.deleteJob);
router.delete('/object/:jobId', JobService.deleteJobObject);

export default router;
