import { useState, useEffect } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  const [todo, setTodo] = useState('')
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState('')

  useEffect(() => {
    const temp = localStorage.getItem('todos')
    const loadedTodos = JSON.parse(temp)

    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem('todos', temp)
  }, [todos])

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

  function toggleComplete(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.complited = !todo.complited
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText
      }
      return todo
    })
    setTodos(updatedTodos)
    setTodoEditing(null)
    setEditingText('')
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
        <div key={todo.id}>
          {todoEditing === todo.id ? (
            <input
              type="text"
              onChange={(e) => setEditingText(e.target.value)}
              value={editingText}
            />
          ) : (
            <div>{todo.text}</div>
          )}

          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          <input
            type="checkbox"
            onChange={() => toggleComplete(todo.id)}
            checked={todo.complited}
          />
          {todoEditing === todo.id ? (
            <button onClick={() => editTodo(todo.id)}>Submit Edit</button>
          ) : (
            <button onClick={() => setTodoEditing(todo.id)}>Edit todo</button>
          )}
        </div>
      ))}
    </div>
  )
}

export default App
