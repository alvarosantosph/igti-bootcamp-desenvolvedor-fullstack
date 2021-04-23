import express from 'express';
import database from './config/database.js';

import { studentRouter } from './routes/studentRouter.js';

const app = express();

app.use(express.json());
app.use(studentRouter);

app.listen(3000, async() => {
    console.log("Api Iniciada na Porta 3000");
    await database.connect();
});