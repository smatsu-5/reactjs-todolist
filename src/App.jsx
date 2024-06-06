import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import TodoList from './components/TodoList'
import Todoinput from './components/Todoinput'

function App() {
  //State
  const [todos, setTodos] = useState([])
  const [todoValue, setTodoValue] = useState('')


  //Whenever we add, edit or delete
  //Sets local storage to the new list created
  function persistData(newList) {
    localStorage.setItem('todos', JSON.stringify({ todos:
      newList 
    }))
  }

  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)

  }

  function handleEditTodo(index) {
    const valueToBeEdited = todos[index]
    setTodoValue(valueToBeEdited)
    handleDeleteTodo(index)

  }

  //If todos is changed, the code is run
  //Leave the array empty if running on page load
  useEffect( () => {
    //need to check if local storage exists
    if (!localStorage) {
      return
    }
    //Can see if the todos existed before
    let localTodos = localStorage.getItem('todos')
    if (!localTodos) {
      return
    }
    //if todos exists, we can override it
    //Can access todos through JSON
    localTodos = JSON.parse(localTodos).todos
    //if local todos exists, setTotos to the local todos
    setTodos(localTodos)
      }, [])

  return (
      <>
        <Todoinput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
        <TodoList handleDeleteTodo={handleDeleteTodo} handleEditTodo={handleEditTodo} todos={todos} />      
      </>
  )
}

export default App
