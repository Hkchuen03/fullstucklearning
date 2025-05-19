import { isNotNumber } from "./utils"

export const calculateBmi = (height: number, weight: number): string => {

    const bmi: number = weight / (height * height) * 10000

    if (bmi < 16)
        return ('Underweight (Severe thinness)')
    else if (bmi < 17 && bmi >= 16)
        return 'Underweight (Moderate thinness)'
    else if (bmi < 18.5 && bmi >= 17)
        return 'Underweight (Mild thinness)'
    else if (bmi < 25 && bmi >= 18.5)
        return 'Normal range'
    else if (bmi < 25 && bmi >= 18.5)
        return 'Normal range'
    else if (bmi < 30 && bmi >= 25)
        return 'Overweight (Pre-obese)'

    return 'no result'
}

if (require.main === module) {
    try {
        if (process.argv.length < 4) throw new Error('Not enough arguments');

        if (isNotNumber(process.argv[2]) || isNotNumber(process.argv[3])){
            throw new Error('Provided values were not numbers!');
        }
        const height: number = Number(process.argv[2])
        const weight: number = Number(process.argv[3])
    
        console.log(calculateBmi(height, weight))
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.'
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
}


