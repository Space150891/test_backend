import schedule from 'node-schedule';
import { mockedJobs } from "../../mocks/jobs";
import { JobService } from "../../services/JobService";

export default function fetchJobs() {
  const {
    CRON_FETCH_JOBS_SECOND: second,
    CRON_FETCH_JOBS_MINUTE: minute,
    CRON_FETCH_JOBS_HOUR: hour,
    CRON_FETCH_JOBS_DAY: day,
    CRON_FETCH_JOBS_MONTH: month,
    CRON_FETCH_JOBS_DAY_OF_WEEK: dayOfWeek
  } = process.env;

  const rule = `${second} ${minute} ${hour} ${day} ${month} ${dayOfWeek}`;

  schedule.scheduleJob(rule, () => {
    mockedJobs.forEach(JobService.insertJob);
  });
}
