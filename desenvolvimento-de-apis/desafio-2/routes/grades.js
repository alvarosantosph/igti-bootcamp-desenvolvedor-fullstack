import express from "express";
import { promises as fs, read } from "fs";

const { readFile, writeFile } = fs;
const router = express.Router();

router.get("/:id", async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = JSON.parse(await readFile(fileName));
    const grade = data.grades.find((grade) => grade.id == id);
    if (grade) {
      delete grade.timestamp;
      res.send(grade);
      logger.info(`GET /:id - ${JSON.stringify(grade)}`);
    } else {
      throw new Error("Register not found.");
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    let grade = req.body;
    if (
      !grade.student ||
      !grade.subject ||
      !grade.type ||
      grade.value == null
    ) {
      throw new Error("Student, subject, type and value are required.");
    }
    const data = JSON.parse(await readFile(fileName));
    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      timestamp: new Date(),
    };
    data.grades.push(grade);
    await writeFile(fileName, JSON.stringify(data, null, 2));
    res.send(grade);
    logger.info(`POST - ${JSON.stringify(grade)}`);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const grade = req.body;
    const id = parseInt(req.params.id);

    if (
      !grade.student ||
      !grade.subject ||
      !grade.type ||
      grade.value == null
    ) {
      throw new Error("Student, subject, type and value are required.");
    }
    const data = JSON.parse(await readFile(fileName));
    const index = data.grades.findIndex((a) => a.id === id);
    if (index === -1) {
      throw new Error("Register not found.");
    }
    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;
    data.grades[index].timestamp = new Date();
    await writeFile(fileName, JSON.stringify(data, null, 2));
    res.send(grade);
    logger.info(`PUT /:id - ${JSON.stringify(grade)}`);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(fileName));
    const id = parseInt(req.params.id);
    const grade = data.grades.find((grade) => grade.id === id);
    if (grade) {
      delete grade.timestamp;
      data.grades = data.grades.filter((grade) => grade.id !== id);
      await writeFile(fileName, JSON.stringify(data, null, 2));
      res.send(grade);
      logger.info(`DELETE /:id - ${JSON.stringify(grade)}`);
    } else {
      throw new Error("Register not found.");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/totalGrade/:student/:subject", async (req, res, next) => {
  try {
    const { student, subject } = req.params;
    const data = JSON.parse(await readFile(fileName));
    const grades = data.grades.filter(
      (grade) => grade.student === student && grade.subject === subject
    );
    if (grades.length) {
      const totalGrade = grades.reduce((acc, curr) => acc + curr.value, 0);
      res.send({ totalGrade: totalGrade });
      logger.info(
        `GET /totalGrade/:student/:subject - ${JSON.stringify({
          totalGrade: totalGrade,
        })}`
      );
    } else {
      throw new Error("Register not found.");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/average/:subject/:type", async (req, res, next) => {
  try {
    const { subject, type } = req.params;
    const data = JSON.parse(await readFile(fileName));
    const grades = data.grades.filter(
      (grade) => grade.subject === subject && grade.type === type
    );
    if (grades.length) {
      const total = grades.reduce((acc, curr) => acc + curr.value, 0);
      const quantidade = grades.length;
      res.send({ mediaGrade: (total / quantidade).toFixed(2) });
      logger.info(
        `GET /average/:subject/:type - ${JSON.stringify({
          mediaGrade: (total / quantidade).toFixed(2),
        })}`
      );
    } else {
      throw new Error("Register not found.");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/threeBestGrids/:subject/:type", async (req, res, next) => {
  try {
    const { subject, type } = req.params;
    const data = JSON.parse(await readFile(fileName));
    const grades = data.grades.filter(
      (grade) => grade.subject === subject && grade.type === type
    );
    if (grades.length) {
      const gradesOrder = grades.sort((a, b) => b.value - a.value);
      const threeBestGrids = gradesOrder.slice(0, 3);
      res.send(threeBestGrids);
      logger.info(
        `GET /threeBestGrids/:subject/:type - ${JSON.stringify(threeBestGrids)}`
      );
    } else {
      throw new Error("Register not found.");
    }
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(`${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
