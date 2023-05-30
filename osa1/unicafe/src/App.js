import { useState } from 'react'

const Button = ({ handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatistcLine = (props) => {
  console.log(props)
  return(
    <tbody>
    <tr>
      <td>{props.text}: </td>
      <td>{props.value}</td>
    </tr>
    </tbody>
  )

}

const Statistcis = (props) => {
  console.log(props)
  if (props.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      <table>
        <StatistcLine text="Good" value={props.goodClicks}/>      
        <StatistcLine text="Neutral" value={props.neutralClicks}/>
        <StatistcLine text="Bad" value={props.badClicks}/>
        <StatistcLine text="All" value={props.all}/>
        <StatistcLine text="Average" value={props.average}/>
        <StatistcLine text="Positive" value={props.positive}/>
      </table>

    </div>
  )
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  
  let length = allClicks.length
  let sum = 0
  allClicks.forEach(x =>{
    sum+=x
  })
  let average = (sum / length)
  let positive = ((good / length)*100)

  const handleGoodClick = () => {
    setAll(allClicks.concat(1))
    setGood(good +1)
  }

  const handleNeutralClick = () => {
    setAll(allClicks.concat(0))
    setNeutral(neutral +1)
  }

  const handleBadClick = () => {
    setAll(allClicks.concat(-1))
    setBad(bad +1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistcis goodClicks={good} neutralClicks={neutral} badClicks={bad}
                all={length}  average={average} positive={positive+'%'}/>
    </div>
  )
}

export default App