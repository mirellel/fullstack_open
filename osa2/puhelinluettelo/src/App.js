import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response)
      })
  }, [])
  
  const addFilter = (event) => {
    event.preventDefault()
    setNewFilter('')
  }

  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personsArray = persons.map(event => event.name)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (personsArray.includes(`${nameObject.name}`)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const personId = persons[personsArray.indexOf(newName)].id
        console.log('target id:', personId)
        personService
          .update(personId, nameObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== personId ? person : returnedPerson))
            setIsError(false)
            setMessage(
              `Phonenumber for ${newName} was changed`
            )
            setTimeout(()=> {
              setMessage(null)
            }, 3000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setIsError(true)
            setMessage(
              `Information of ${newName} was already deleted`
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
            setNewName('')
            setNewNumber('')
          })
      }
      else {
        setNewName('')
        setNewNumber('')
      }
    }
    else {
      personService
        .create(nameObject)
          .then(returnedName => {
            setPersons(persons.concat(returnedName))
            setIsError(false)
            setMessage(
              `${newName} was added to phonebook`
            )
            setTimeout(()=> {
              setMessage(null)
            }, 3000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log('error')
            console.log(error.response.data)
            setMessage('Name must be atleast the minimum required lenght (3) or number must be in correct form i.e. 09-654321 or 040-12345')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
        }
    }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personService
        .deletePerson(person.id)
        .then(() => {
          setPersons(deletedPerson => deletedPerson.filter(({ id }) => id !== person.id))
          setIsError(false)
          setMessage(
            `${person.name} was deleted from phonebook`
          )
          setTimeout(()=> {
            setMessage(null)
          }, 3000)
        })
    }
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} isError={isError} />
      <Filter
        addFilter={addFilter}
        newFilter={newFilter}
        handleFilterChange={handleFilterChange}
      />
      <h3>Add a new person</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons 
        persons={persons} 
        filter={newFilter}
        deletePerson={deletePerson}
      />
    </div>
  )}

export default App