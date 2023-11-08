// TodoContext.js
import  { createContext, useContext, useState } from 'react';

const TodoContext = createContext();

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export function TodoProvider({ children }) {
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

  const addTodo = (newTodo) => {
    if (newTodo.trim() !== '') {
      setTodoList([...todoList, newTodo]);
      setTodo('');
    }
  };

  const removeTodo = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
  };

  return (
    <TodoContext.Provider value={{ todo, setTodo, todoList, addTodo,removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
}
