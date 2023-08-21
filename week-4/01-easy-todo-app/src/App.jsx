import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import TodoForm from './components/TodoForm'

function App() {
  const [todos, setTodos] = useState([])
    // fetch all todos from server

  return (
    <div>
      <Header/>
      <TodoForm/>
    </div>
  )
}

function Todo(props) {
    // Add a delete button here so user can delete a TODO.
    return <div>
        {props.title}
    </div>
}

export default App
