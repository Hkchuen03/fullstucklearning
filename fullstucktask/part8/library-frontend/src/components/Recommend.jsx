import { useQuery } from "@apollo/client"
import { useState, useEffect } from "react";

import { CURRENT_USER } from "../queries"
import { ALL_BOOKS } from "../queries"

const Recommend = (props) => {

  const userResult = useQuery(CURRENT_USER)

  const booksResult = useQuery(ALL_BOOKS, {
    pollInterval: 2000
  })

  if (!props.show) {
    return null
  }

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const books = booksResult.data.allBooks
  const user = userResult.data.me

  const favoriteBooks = (user && books) ? books.filter(book => book.genres.includes(user.favoriteGenre)) : books

  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favourite genre <b>{user.favoriteGenre} </b></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favoriteBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend