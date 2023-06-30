import { useState, useEffect } from 'react'
import axios from 'axios'




const App = () => {
  const [value, setValue] = useState('')
  const [country, setCountry] = useState(null)
  const [countries, setCountries] = useState([])
  const [info, setInfo] = useState([])

  useEffect(() => {
    GetCountries()
    console.log('effect run, country is now', country)
    
    if (country) {
      console.log('fetching county info ...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
        .then(response => {
          setInfo(response.data)
          console.log('data: ', response.data)
      })
    }
  }, [country])

  const GetCountries = () => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then(response => {
      setCountries(response.data.map(country => country.name.common))
    })
  }

  const Country = ({country}) => {
    return (
      <div>
        {country}
      </div>
    )
  }

  const Languages = ({language}) =>{
    return (
      <div>
        <li>{language}</li>
      </div>
    )
  }
  const ShowCountryInfo = ({}) => {
    return (
      <div>
        <h1>{info.name.common}</h1>
        <p>capital {info.capital}</p>
        <p>area {info.area}</p>
        <br></br>
        <b>languages</b>
        <p>{info.flag}</p>
      </div>
    )
  }
  const ShowCountries = ({value}) => {
    if (value === '') {
      return(
        <div></div>
      )
    } else {
      const filteredCountries = countries.filter(country => country.toLowerCase().indexOf(value.toLowerCase()) != -1)
      if (filteredCountries.length === 1){
        setCountry(filteredCountries[0])
        console.log(country)
        return(
          <ShowCountryInfo info={info}/>
        )
      }
      if (filteredCountries.length > 10){
        return(
          <div>
            Too many countries, specify another filter
          </div>
        )
      }
      if (0 < filteredCountries.length <11){
        return (
          <div>
            {filteredCountries.map(country =>
              <Country key={country} country={country} />)}
          </div>
        )
      }
    }
  }

  const handleChange = (event) => {
    console.log(event.target.value)
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setCountry(value)
  }
  return (
    <div>
      <form onSubmit={onSearch}>
        find countries <input value={value} onChange={handleChange}/>
      </form>
      <ShowCountries value={value}/>
    </div>
  )
}

export default App;
