import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import Select from "react-select";

import { ALL_AUTHORS, UPDATE_AUTHOR } from "../queries";

const Authors = (props) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000
  })

  const [ updateAuthor ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      console.log(messages)
      //props.setError(messages)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, born: parseInt(born, 10)} })
    setBorn('')
  }


  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  if (!props.token) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  let options = []
  
  authors.forEach(author => {
    options = options.concat({value: author.name, label: author.name})
  });

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set Birthyear</h2>
      <div>
        <form onSubmit={submit} >
          <div className="App">
          <Select
            options={options}
            onChange={value => setName(value.value)}
            defaultValue={options[0]}
          />
          </div>
          <div>
            born: <input value={born}
              type="number"
              onChange={({target}) => setBorn(target.value)} />
          </div>
          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
