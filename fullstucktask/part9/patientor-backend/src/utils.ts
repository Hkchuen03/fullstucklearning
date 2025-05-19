import { z } from 'zod';
import { NewDiagnoseEntry, Gender, NewPatientEntry, HealthCheckRating, NewEntry } from "./types";

export const newDiagnoseEntrySchema = z.object({
    name: z.string(),
    latin: z.string().optional()
});

export const toNewDiagnoseEntry = (object: unknown): NewDiagnoseEntry => {
    return newDiagnoseEntrySchema.parse(object);  
};

export const newEntrySchema = z.object({
    id: z.string(),
    description: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
    type: z.enum(['HealthCheck', 'OccupationalHealthcare', 'Hospital']),
    healthCheckRating: z.nativeEnum(HealthCheckRating).optional(),
    employerName: z.string().optional(),
    discharge: z.object({
        date: z.string().date(),
        criteria: z.string()
    }).optional(),
    sickLeave: z.object({
        startDate: z.string().date(),
        endDate: z.string().date()
    }).optional()
});

export const toNewEntry = (object: unknown): NewEntry => {
    return newEntrySchema.parse(object);
};

export const newPatientEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(newEntrySchema)
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    return newPatientEntrySchema.parse(object);
};



