import { isNotNumber } from "./utils"

interface result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (target: number, values: number[]): result => {

    const trainingDays: number[] = values.filter((value) => value > 0)

    let total: number = 0
    trainingDays.forEach((value) => { total = total + value })

    const average: number = (total / values.length)

    let rating: number = 0
    let ratingDescription: string = ''

    if (average >= target) {
        rating = 3
        ratingDescription = 'good'
    } else if (average >= (target * 0.75)) {
        rating = 2
        ratingDescription = 'not too bad but could be better'
    } else {
        rating = 1
        ratingDescription = 'bad'
    }

    return {
        periodLength: values.length,
        trainingDays: trainingDays.length,
        success: average >= target ? true: false,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: (total / values.length)
    }
}

if (require.main === module) {
    try {
        if (process.argv.length < 4) throw new Error('Not enough arguments');

        let args: number[] = [];
        let target: number = 0
        for (let step: number = 2; step < process.argv.length; step++){
            if(isNotNumber(process.argv[step]))
                throw new Error ('value must be a number')

            if (step === 2)
                target = Number(process.argv[step])
            else 
                args.push(Number(process.argv[step]))
        }

        console.log(calculateExercises(target, args))
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.'
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }

}
//console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))