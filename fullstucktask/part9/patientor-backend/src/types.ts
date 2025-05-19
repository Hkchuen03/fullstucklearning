import { z } from "zod";
import { newDiagnoseEntrySchema, newPatientEntrySchema, newEntrySchema } from "./utils";

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

/*
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {
}
*/

export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}

export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[];
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRatring: HealthCheckEntry;
}

interface Discharge {
    date: string;
    criteria: string;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge;
}

interface SickLeave {
    startDate: string;
    endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewDiagnoseEntry = z.infer<typeof newDiagnoseEntrySchema>;

export type NewPatientEntry = z.infer<typeof newPatientEntrySchema>;

export type NewEntry = z.infer<typeof newEntrySchema>;

export type NonSSNPatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;