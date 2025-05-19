const { GraphQLError, subscribe } = require('graphql')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const resolvers = {
    Query: {
      //bookCount: () => books.length,
      bookCount: async () => Book.collection.countDocuments(),
      //authorCount: () => authors.length,
      authorCount: async () => Author.collection.countDocuments(),
      allBooks: async (root, args) => {
        let booksList = await Book.find({}).populate('author')
  
        if (args.author && args.genre) {
          return booksList.filter(book => book.author.name === args.author && book.genres.includes(args.genre))
        } else if (args.author) {
          return booksList.filter(book => book.author.name === args.author)
        } else if (args.genre) {
          if (args.genre === 'all genres')
            return booksList
          else
            return booksList.filter(book => book.genres.includes(args.genre))
        }
  
        return booksList
      },
      allAuthors: async () => {
        return Author.find({})
      },
      allBookGenres: async () => {
        let booksList = await Book.find({})
  
        let genresList = []
        
        booksList.forEach(book => {
          genresList = genresList.concat(book.genres)
        })
        /*
        booksList.forEach(book => {
          book.genres.forEach(genre => {
            if(!genresList.includes(genre))
              genresList.push(genre)
          })
        })
  
        */
  
        return [...new Set(genresList)]
      },
      me: (root, args, context) => {
        return context.currentUser
      }
    },
    Author : {
      bookCount: async ({name}) => {
        const author = await Author.find({name: name})
        return (await Book.find({author: author})).length
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if(!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        let author = await Author.findOne({name: args.author})
        try {
          if (!author) {
            author = new Author({
                name: args.author
            })

            await author.save()
          }
        } catch(error) {
          throw new GraphQLError('Add new Author error', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        let book = new Book({
            title: args.title,
            published: args.published,
            author: author,
            genres: args.genres
        })

        try{
          await book.save()
        } catch(error) {
          throw new GraphQLError('Add book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        }

        pubsub.publish('BOOK_ADDED', { bookAdded: book });

        return book
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
  
        if(!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
  
        const author = await Author.findOne({name: args.name})
  
        if(!author) {
          return null
        }
  
        author.born = args.setBornTo
        try {
          await author.save()
        } catch(error) {
          throw new GraphQLError('Editing born failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
  
        return author
      },
      createUser: async (root, args) => {
        const user = new User({ ...args })
  
        return user.save()
          .catch(error => {
            throw new GraphQLError(error.message, {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
  
        if ( !user || args.password !== 'secret') {
          throw new GraphQLError('wrong credentials', {
            extensions: { code: 'BAD_USER_INPUT'}
          })
        }
  
        const userForToken = {
          username: user.username,
          id: user._id,
        }
  
        const value = jwt.sign(userForToken, process.env.JWT_SECRET)
  
        return { value: value}
      },
    },
    Subscription: {
      bookAdded: {
        subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
      },
    },
  }

  module.exports = resolvers