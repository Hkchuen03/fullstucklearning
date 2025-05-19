import { v4 as uuidv4 } from "uuid";
import { NonSSNPatientEntry, PatientEntry, NewPatientEntry } from "../types";
import patients from "../../data/patients";

const getEntries = (): NonSSNPatientEntry[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries,
    }));
};

const findById = (id: string): PatientEntry | undefined => {
    const entry = patients.find(d => d.id === id);
    return entry;
};

const addPatient = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuidv4(),
        ...entry,
        entries: []
    };

    patients.push(newPatientEntry);
    return newPatientEntry;
};

export default {
    getEntries,
    findById,
    addPatient
};