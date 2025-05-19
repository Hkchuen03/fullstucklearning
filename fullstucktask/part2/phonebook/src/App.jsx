import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
        {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
    })
  }, [])
  console.log('render', persons.length, 'persons')

  const reloadLastData = () => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons)
      console.log('render', persons.length, 'persons in reload')
    })
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const orignalPersons = persons.filter((p) => p.name === newName)

    if(orignalPersons.length === 0) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService.create(personObject).then((returnedPerson) => {
        setErrorMessage(`${returnedPerson.name} is already added to phonebook`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    } else {
      //alert(`${newName} is already added to Numberbook`)
      const person = orignalPersons[0]
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one`)) {
        const changePerson = {...person, number: newNumber}
        personService
          .update(person.id, changePerson)
          .then((returnedPerson) => {
            setErrorMessage(`The new number of ${returnedPerson.name} is already replaced to phonebook`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setPersons(persons.map((person) => (person.id !== changePerson.id ? person : returnedPerson)))
            setNewName('')
            setNewNumber('')
          })
          .catch((error) => {
            setErrorMessage(`Information of ${person.name} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            reloadLastData()
          })
      }
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(id)
        .then((returnedPerson) => {
          setErrorMessage(`${person.name} deleted`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter((p) => p.id !== returnedPerson.id))
        })
        .catch((error) => {
          //console.log('In delete', error)
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          reloadLastData()
        })
    }
  }

  const showFilter = (filterName === '' ) ? persons : persons.filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <Filter value={filterName} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons persons={showFilter} deletePerson={deletePerson} />
    </div>
  )
}

export default App