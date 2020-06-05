import { JobModel } from "../models/Job";

export class JobService {
  static get insertOptions() {
    return { upsert: true, setDefaultsOnInsert: true };
  }

  static insertJob(job) {
    return JobModel.findOneAndUpdate({ id: job.id }, job, JobService.insertOptions, (err) => {
      if (err) {
        console.log('error on fetch: ', err);
      }
    });
  }

  static async createJob(req, res, next) {
    try {
      await JobService.insertJob(req.query);
      res.sendStatus(200);
    } catch(err) {
      next(err);
    }
  }

  static async listJobs(req, res, next) {
    try {
      const jobs = await JobModel.find({ deleted: false });
      res.status(200).send({ jobs });
    } catch(err) {
      next(err);
    }
  }

  static async deleteJob(req, res, next) {
    try {
      const { jobId } = req.params;
      await JobModel.findOneAndUpdate({ id: jobId }, { deleted: true });

      res.sendStatus(200);
    } catch(err) {
      next(err);
    }
  }

  static async deleteJobObject(req, res, next) {
    try {
      const { jobId } = req.params;
      await JobModel.findOne({ id: jobId }).remove();

      res.sendStatus(200);
    } catch(err) {
      next(err);
    }
  }
}
