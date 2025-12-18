const express = require('express')
const app = express()

const cors = require('cors')

let todos = [{
    id: '1',
    task: 'Create a backend service for a todo app',
    status: false,
    date: '2025-08-06'
}, {
    id: '2',
    task: 'Create a frontend website for a todo app',
    status: false,
    date: '2025-08-06'
}]

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---')
    next()
}

app.use(express.json())
app.use(cors())
app.use(requestLogger)

app.get('/', (request, response) => {
    response.send('<h1>Hello New!</h1>')
})

app.get('/api/todos', (request, response) => {
    response.json(todos)
})

const generateId = () => {
    const maxId = todos.length > 0
        ? Math.floor(Math.random() * (todos.length + 100000))
        : 1
    return String(maxId)    
}

app.post('/api/todos', (request, response) => {
    const body = request.body

    if (!body.task) {
        return response.status(400).json({
            error: 'task is missing'
        })
    }

    const todo = {
        id: generateId(),
        task: body.task,
        status: body.status || false,
        date: new Date().toISOString().split('T')[0] // Default to today's date
    }

    todos = todos.concat(todo)

    response.json(todo)
})

app.delete('/api/todos/:id', (request, response) => {
    const id = request.params.id
    todos = todos.filter(todo => todo.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


