import mysql from 'mysql'
import dotenv from 'dotenv'
import { log, success, mistake } from '../utils/chalk.js';

const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = dotenv.config().parsed

export const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME
})

db.connect((err) => {
  if (err) {
    log(mistake(err))
    return
  }
  log(success('[server]: successfully connect to the database'))
});


