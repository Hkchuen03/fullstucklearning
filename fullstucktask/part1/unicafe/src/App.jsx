import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const StatisticLine = ({text, value}) => (
  <p>{text} {value}</p>
)

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>
          Statistics
        </h1>
        <div>
          <p>No feedback given</p>
        </div>
      </div>
    )
  }
  return (
    <div>
      <h1>
        Statistics
      </h1>
      <div>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value ={good + neutral + bad} />
        <StatisticLine text="average" value ={(good - bad) / (good + bad + neutral)} />
        <StatisticLine text="positive" value ={(good / (good + bad + neutral) * 100 ) + "%"} />
      </div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>
        give feedback
      </h1>
      <div>
        <Button onClick={() => handleGoodClick()} text="Good"/>
        <Button onClick={() => handleNeutralClick()} text="Neutral"/>
        <Button onClick={() => handleBadClick()} text="Bad"/>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App