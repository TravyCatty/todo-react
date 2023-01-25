import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      complited: false,
    }
    setTodos([...todos].concat(newTodo))
    setTodo('')
  }

  function deleteTodo(id) {
    const updateTodos = [...todos].filter((todo) => todo.id !== id)

    setTodos(updateTodos)
  }

  function toggleComplete() {}

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTodo(e.target.value)}
          value={todo}
        />
        <button type="submit">Add todo</button>
      </form>
      {todos.map((todo) => (
        <div key={todo.id}>
          <div>{todo.text}</div>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <input type="checkbox" onChange={() => toggleComplete(todo.id)} />
        </div>
      ))}
    </div>
  )
}

export default App
