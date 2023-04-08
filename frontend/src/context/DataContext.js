import { createContext, useReducer } from 'react'

export const DataContext = createContext({});

export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'ALL_TASKS':
      return { todos: action.payload }
    case 'NEW_TASK':
      return { todos: [action.payload, ...state.todos] }
    case 'DELETE_TASK':
      return { todos: state.todos.filter(w => w._id !== action.payload) }
    default:
      return state
  }
}

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, { todos: null })

  return (
    <DataContext.Provider value={{ ...state, dispatch }}>
      { children }
    </DataContext.Provider>
  )
}

