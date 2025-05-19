import { Box, Typography } from "@mui/material";
import { Female, Male } from "@mui/icons-material";
import { Patient, Gender, Diagnosis, Entry } from "../../types";

interface Props {
    patient: Patient | null | undefined; 
    diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
    console.log(value);
    throw new Error(
        ``
    );
};

const EntryDetails: React.FC<{ entry: Entry}> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return (
                <div>

                </div>
            );
            break;
        case "OccupationalHealthcare":
            return (
                <div>

                </div>
            );
            break;
        case "HealthCheck":
            return (
                <div>

                </div>
            );
            break;
        default:
            return assertNever(entry);
    }
};


const PatientPage = ({ patient, diagnoses } : Props ) => {

    if (!patient) {
        return null;
    }

    console.log(diagnoses);

    return (
        <div>
            <Box sx={{ paddingTop: 2}}>
                <Typography variant="h4">
                    {patient.name} 
                    {patient.gender === Gender.Male ? (
                        <Male />
                    ) : patient.gender === Gender.Female ? (
                        <Female />
                    ) : null}
                </Typography>
                <Typography variant="body1">
                    <p>
                        ssn: {patient.ssn} <br />
                        occupation: {patient.occupation} <br />
                    </p>
                </Typography>
            </Box>
            <Box sx={{ paddingTop: 2 }}>
                <Typography variant="h5">entries</Typography>
                <Typography variant="body1">
                    {patient.entries.length === 0 ? (
                        <p>No entries</p>) : (  
                        <div>
                            {patient.entries.map((entry) => (
                                <EntryDetails key={entry.id} entry={entry} />
                            ))}
                        </div>
                    )}
                </Typography>
            </Box>
        </div>
    );
};

export default PatientPage;