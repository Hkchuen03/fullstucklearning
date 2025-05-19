import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
import { isNotNumber } from "./utils";

const app = express();
app.use(express.json()); 

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack！');
});

app.get('/bmi', (req, res) => {
  console.log(req)
    if(!req.query || !req.query.height || !req.query.weight) {
      res.status(400).send({error: "malformatted parameters"})
    }
    else {
      const {height, weight} = req.query

      const bmi: string = calculateBmi(Number(height), Number(weight));
  
      const result = {
        height: Number(req.query.height),
        weight: Number(req.query.weight),
        bmi: bmi
      }
  
      res.send(result);
    }
    
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body

  if (!daily_exercises || !target) {
    res.status(400).send({error: "parameters missing"})
  }
  else{
    if(isNotNumber(target)) 
      res.status(400).send({error: "malformatted parameters"})
    else {
      try {
        daily_exercises.forEach((value: string) => {
          if (isNotNumber(value))
            throw new Error ('malformatted parameters')
        });

        const values = daily_exercises.map((i:string) => Number(i))

        res.send(calculateExercises(Number(target), values))

      } catch (error: unknown) {
        res.status(400).send({error: "malformatted parameters"})
      }
      
    }
  }
  
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});