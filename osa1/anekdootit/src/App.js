import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const MostVoted = (props) => {
  const values = Object.values(props.votes)
  const max = Math.max(...values)
  const maxVotes = Object.keys(props.votes).find(key => props.votes[key] === max)
  console.log({maxVotes})
  return (
    <div>
      {props.anecdotes[maxVotes]}
      <p>
        has {max} votes
      </p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const points = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0}
  const [copy, setPoints] = useState({ ...points})
  console.log({selected})

  const newAnecdote = () => setSelected(Math.floor(Math.random()* anecdotes.length))
  const vote = () => setPoints({ ...copy, [selected]: copy[selected]+1})

  return (
    <div>
      <h1>Devoloper anecdotes</h1>
      <h2>{anecdotes[selected]}</h2>
      <p>this anecdote has {copy[selected]} votes</p>
      <Button handleClick={vote} text='vote'/>
      <Button handleClick={newAnecdote} text='next anecdote'/>
      <h1>Anecdote with most votes</h1>
      <MostVoted votes={copy} anecdotes={anecdotes} />
    </div>
  )
}

export default App