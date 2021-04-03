import express from "express";
import winston from "winston";
import grades from "./routes/grades.js";
import { promises as fs } from "fs";

const app = express();
const { readFile } = fs;

app.use(express.json());
app.use("/grades", grades);

global.fileName = "grades.json";

const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "grades-control-api-log" }),
  ],
  format: combine(
    label({ label: "grades-control-api" }),
    timestamp(),
    myFormat
  ),
});

app.listen(3000, async () => {
  try {
    await readFile(fileName);
    logger.info("API Started!");
  } catch (err) {
    logger.error(`Arquivo ${fileName} não encontrado.`);
  }
});
