import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0))
  const [maxselected, setMaxselected] = useState(0)

  const handleAnecdoteClick = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes([...copy])

    let maxVote = 0
    let maxVotedSelected = 0

    copy.forEach((value, idr) => {
      if(value >= maxVote) {
        maxVote = value
        maxVotedSelected = idr
      }
    })

    setMaxselected(maxVotedSelected)
  }

  return (
    <div>
      <h1>
        Anecdote of the day
      </h1>
      <div>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
      </div>
      <Button onClick={() => handleVoteClick()} text="vote" />
      <Button onClick={() => handleAnecdoteClick()} text="next anecdote" />
      <h1>
        Anecdote with most votes
      </h1>
      <div>
        <p>{anecdotes[maxselected]}</p>
        <p>has {votes[maxselected]} votes</p>
      </div>
    </div>
  )
}

export default App