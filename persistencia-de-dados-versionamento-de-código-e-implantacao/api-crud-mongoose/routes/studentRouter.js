import express from 'express';
import { studentModel } from '../models/studentModel.js'

const app = express();

// CREATE
app.post('/student', async (req, res) => {
    try {
        const student = new studentModel(req.body);
        await student.save();
        res.status(201).send(student);
    } catch(err) {
        res.status(500).send(err);
    }
});

// RETRIEVE
app.get('/student', async (req, res) => {
    try {
        const students = await studentModel.find({});
        res.status(200).send(students);
    } catch(err) {
        res.status(500).send(err);  
    }
});

// UPDATE
app.patch('/student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const students = await studentModel.findByIdAndUpdate({_id: id}, req.body, {new: true});
        if (!students) {
            res.status(404).send("Documento não encontrado na coleção.");
       } else {
           res.status(200).send("Documento alterado com sucesso.");
       }

    } catch(err) {
        res.status(500).send(err);  
    }
});

// DELETE
app.delete('/student/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const students = await studentModel.findByIdAndDelete({_id: id});
        
        if (!students) {
             res.status(404).send("Documento não encontrado na coleção.");
        } else {
            res.status(200).send("Documento deletado com sucesso.");
        }

    } catch(err) {
        res.status(500).send(err);  
    }
});

export {app as studentRouter };