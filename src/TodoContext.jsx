// TodoContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const TodoContext = createContext();

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export function TodoProvider({ children }) {
  const [todo, setTodo] = useState({
    text: '',
    time: '',
    date: '',
    status: false,
  });
  const [todoList, setTodoList] = useState([]);

  const addTodo = (newTodo) => {
    if (newTodo.text.trim() !== '') {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const formattedTime = currentDate.toLocaleTimeString();
  
      // Update values in todo
      const updatedTodo = {
        text: newTodo.text,
        time: formattedTime,
        date: formattedDate,
        status: false,
      };
  
      setTodoList([...todoList, updatedTodo]);
  
      // Reset the todo text
      setTodo({
        text: '',
        status: false,
      });
    }
  };
   
  const handleInputChange = (e) => {
    setTodo({
      ...todo,
      text: e.target.value,
    });
  };

  const removeTodo = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
  };

  return (
    <TodoContext.Provider value={{ todo, setTodo, todoList, addTodo, removeTodo, handleInputChange }}>
      {children}
    </TodoContext.Provider>
  );
}
