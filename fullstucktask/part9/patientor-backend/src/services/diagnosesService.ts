import { NewDiagnoseEntry } from '../types';
import diagnoses from '../../data/diagnoses';

const getEntries = (): NewDiagnoseEntry[] => {
  return diagnoses;
};

export default {
    getEntries
};