import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        id
        name
        born
        bookCount
    }
`

const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        published
        genres
        author {
            ...AuthorDetails
        }
    }

    ${AUTHOR_DETAILS}
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            ...AuthorDetails
        }
    }

    ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
    query ($genre: String) {
        allBooks(
            genre: $genre
        ) {
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
`

export const CURRENT_USER = gql`
    query {
        me {
            username
            favoriteGenre
        }
    }
`

export const ALL_BOOKS_GENRES = gql`
    query {
        allBookGenres
    }
`

export const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title,
            author: $author,
            published: $published,
            genres: $genres
        ) {
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
`

export const UPDATE_AUTHOR = gql`
    mutation updateAuthor($name: String!, $born: Int!) {
        editAuthor(
            name: $name,
            setBornTo: $born
        ) {
            ...AuthorDetails    
        }
    }

    ${AUTHOR_DETAILS}
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            value
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }

    ${BOOK_DETAILS}
`

