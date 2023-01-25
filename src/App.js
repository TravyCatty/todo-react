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
        <div key={todo.id}>{todo.text}</div>
      ))}
    </div>
  )
}

export default App
