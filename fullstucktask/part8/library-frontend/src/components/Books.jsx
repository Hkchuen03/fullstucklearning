import { useQuery } from "@apollo/client";

import { ALL_BOOKS, ALL_BOOKS_GENRES } from "../queries";
import { useState } from "react";

const Books = (props) => {
  const [genre, setGenre] = useState('all genres')

  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
    variables: {
      genre: genre.genre
    }
  })

  const genresResult = useQuery(ALL_BOOKS_GENRES, {
    pollInterval: 2000
  })

  if (!props.show) {
    return null
  }

  if (result.loading || genresResult.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  let genresList = Object.values(genresResult.data.allBookGenres)

  genresList.push('all genres')

  const onTypeHandle = (type) => {
    setGenre(type)
  }

  return (
    <div>
      <h2>books</h2>

      <p>in genre <b>{(!genre.genre) ? 'all genres' : genre.genre} </b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genresList.map((genre) => (
          <button key = {genre} onClick={() => onTypeHandle({genre})}>{genre}</button>
        ))}
      </div>
    </div>
  )
}

export default Books
