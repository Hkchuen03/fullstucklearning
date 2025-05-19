import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = ({country}) => {
  const languages = Object.values(country.languages)

  return (
    <div>
      <h1>
        {country.name.common}
      </h1>
      <div>
        <p>capital {country.capital}</p>
        <p>Area {country.area}</p>
      </div>
      <h1>Languages</h1>
      <ul>
        {languages.map((language) => (
          <li key={language}>
            {language}
          </li>
        ))}
      </ul>
    </div>
  )
}

const Countries = ({countriesToShow, handleShow}) => {
  console.log(countriesToShow.length)

  if (countriesToShow.length === 1) {
    console.log(countriesToShow)
    return (
      <div>
        <Country country={countriesToShow[0]} />
      </div>
    )
  }

  return (
    <ul>
      {countriesToShow.map((c) => (
        <div key={c.ccn3}>
          <li>
            {c.name.common}
            <button onClick={() => handleShow(c.ccn3)}>show</button>
          </li>
        </div>
      ))}
    </ul>
  )
}

const Filter = ({countriesToShow, handleShow}) => {

  if (typeof(countriesToShow) === 'string' || countriesToShow === null) {
    return (
      <div>
        {countriesToShow}
      </div>
    )
  }

  return (
    <div>
      <Countries countriesToShow={countriesToShow} handleShow={handleShow} />
    </div>
  )
}

const App = () => {
  const [filterResult, setFilterResult] = useState(null)
  //const [countries, setCountries] = useState(null)
  //const [country, setCountry] = useState(null)
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    console.log('start loading countries')
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setAllCountries(response.data)
      })   
  }, [])

  const handleFindChange = (event) => {

    if (event.target.value !== '') {
      const filterC = allCountries.filter((c) => c.name.common.toLowerCase().includes(event.target.value.toLowerCase()))

      if (filterC.length > 10) {
        setFilterResult('Too many matchs, specify another filter')
      } else if (filterC.length <= 10) {
        setFilterResult(filterC)
      } 
    }else {
      setFilterResult(null)
    }
  }

  const handleShow = (id) => {
    //console.log('id ', id)
    const country = allCountries.filter((c) => c.ccn3 === id)
    //console.log('click show', country)
    setFilterResult(country)
  }

  return (
    <div>
      <div>
        find countries
        <input 
          onChange={handleFindChange}
        />
      </div>
      <Filter countriesToShow={filterResult} handleShow={handleShow} />
    </div>
  )
}

export default App
