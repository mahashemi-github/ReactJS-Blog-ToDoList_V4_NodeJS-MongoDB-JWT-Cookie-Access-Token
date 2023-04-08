import { useState, useEffect } from 'react'
import ToDoForm from './ToDoForm'
import ToDoItem from './ToDoItem'
import { DataContext } from '../context/DataContext'
import { useContext } from 'react'

const ToDoList = () => {
  const { todos, dispatch } = useContext(DataContext)
  const [errorr, setErrorr] = useState(null)

  useEffect(() => {
    const fetchtodos = async () => {
      // const response = await fetch('todo')
      // const json = await response.json()

      // if (response.ok) {
      //   dispatch({type: 'ALL_TASKS', payload: json})
      // }
      //----------------------------------
      try{
        const response = await fetch('todo')
        const json = await response.json()
  
        if (response.ok) {
          dispatch({type: 'ALL_TASKS', payload: json})
        }
  
        if (!response.ok) {
          setErrorr('Something went wrong! Failed to fetch.')
          setErrorr('')
        }
      } catch(err) {
        console.log(err)
        if(err.message.includes('Unexpected token')) {
          setErrorr('Something went wrong! Failed to fetch.')
        }
      }
    }

  fetchtodos()
  }, [dispatch])

  return (
    <div>
      <div className="todo-container">
        <ToDoForm />
        <div className="todo">
          <h2>To-Dos</h2>
          <table>
            <thead>
              <tr>
              <th>Task </th>
              <th>Timeinterval</th>
              <th></th>
              </tr>
            </thead>
            {!errorr && todos && todos.map(todo => (
              <ToDoItem todo={todo} key={todo._id} />
            ))}
          </table>
          {errorr && <div className="error">
          <span className="material-symbols-outlined">Error</span>&nbsp; 
          {errorr}</div>}
        </div>
      </div>
    </div>
  )
}
 
export default ToDoList