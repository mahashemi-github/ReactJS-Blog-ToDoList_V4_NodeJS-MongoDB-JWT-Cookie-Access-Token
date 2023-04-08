import { DataContext } from '../context/DataContext'
import { useContext } from 'react'

const ToDoItem = ({ todo }) => {
  const { dispatch } = useContext(DataContext)
  const id = todo._id;
  // console.log(id)

  const handleClick = async () => {
    const response = await fetch('/todo/' + id, {
      method: 'DELETE'
    })

    if (response.ok) {
      dispatch({type: 'DELETE_TASK', payload: id})
    }
  }

  return (
    <tbody>
    <tr className="todo-details">
      <td>{todo.task}</td>
      <td>{todo.timeinterval}</td>
      <td>
        <span onClick={handleClick}>delete</span>
      </td>
    </tr>
    </tbody>
  )
}
  
export default ToDoItem