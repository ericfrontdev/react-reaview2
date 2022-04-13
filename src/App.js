import logo from './logo.svg'
import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      return JSON.parse(savedTodos)
    } else {
      return []
    }
  })
  const [todo, setTodo] = useState('')

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos])

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (todo !== '') {
      setTodos([
        ...todos,
        {
          id: todos.lenght + 1,
          text: todo.trim(),
        },
      ])
    }
    setTodo('')
  }

  const handleDeleteClick = (id) => {
    const removeItem = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(removeItem)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input name="todo" type="text" onChange={handleChange} value={todo} />
      </form>
      {todos.map((todo) => (
        <div key="todo.id">
          {todo.text} <button onClick={handleDeleteClick(todo.id)}>X</button>
        </div>
      ))}
    </div>
  )
}

export default App
