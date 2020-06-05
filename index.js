import cors from "cors";
import express from 'express';
import router from "./routes";
import runCronJobs from "./libs/cron";
import { initMongoose } from './libs/mongoose';
import authCheck from "./middleware/authCheck";
import errorHandler from "./middleware/errorHandler";
import { corsWhitelist } from "./configs";
require('dotenv').config();

const app = express();

app.use(cors({ whitelist: corsWhitelist }));
app.use(authCheck);
app.use('/', router);
app.use(errorHandler);

const { DB_HOST, DB_PORT, DB_NAME, SERVER_PORT } = process.env;

initMongoose({
  host: DB_HOST,
  port: DB_PORT,
  name: DB_NAME,

  initCallback: () => {
    app.listen(SERVER_PORT, () => {
      console.log(`Connected to ${SERVER_PORT} port`);
      runCronJobs();
    });
  }
});
