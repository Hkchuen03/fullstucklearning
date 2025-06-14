import express from 'express';
import { z } from 'zod';
import patientsService from '../services/patientsService';
import { toNewPatientEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientsService.getEntries());
});

router.get('/:id', (req, res) => {
    const patient = patientsService.findById(req.params.id);

    if(patient) {
        res.send(patient);
    }
    else {
        res.status(404);
    }
});

router.post('/', (req, res) => {
    try {
        const newPatientEntry = toNewPatientEntry(req.body);

        const addedEntry = patientsService.addPatient(newPatientEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        } else {
            res .status(400).send({error: 'Unknown error' });
        }
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    } 
});

export default router;