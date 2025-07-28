import { CronJob } from "cron";

const CRONTAB = process.env.CRONTAB;

async function runProcess() {
  console.log("echo");
}

if (!CRONTAB) {
  console.log("env: CRONTAB required");
  process.exit(1);
}

new CronJob(
  CRONTAB, // cronTime
  runProcess, // onTick
  null, // onComplete
  true, // start
  "Asia/Jakarta", // timeZone
);
