
import  { createContext, useContext, useEffect, useState } from 'react';

const TodoContext = createContext();

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export function TodoProvider({ children }) {
  const storedTodoList = JSON.parse(localStorage.getItem('todoList')) || [];
  const storedIdCounter = JSON.parse(localStorage.getItem('idCounter')) || 1;

  const [todo, setTodo] = useState({
    text: '',
    time: '',
    date: '',
    status: false,
    editMode: false,
    category: 'All',
  });

  const [todoList, setTodoList] = useState(storedTodoList);
  const [idCounter, setIdCounter] = useState(storedIdCounter);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  useEffect(() => {
    localStorage.setItem('idCounter', JSON.stringify(idCounter));
  }, [idCounter]);


  const addTodo = (newTodo) => {
    if (newTodo.text.trim() !== '') {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const formattedTime = currentDate.toLocaleTimeString();

      const updatedTodo = {
        id: idCounter,
        text: newTodo.text,
        time: formattedTime,
        date: formattedDate,
        status: false,
        editMode: false,
        category: newTodo.category || 'All',
      };

      setIdCounter(idCounter + 1);

      const updatedTodoList = todo.editMode
        ? todoList.map((item) => (item.id === todo.id ? updatedTodo : item))
        : [...todoList, updatedTodo];

      setTodoList(updatedTodoList);

      setTodo({
        text: '',
        status: false,
        editMode: false,
        category: 'All',
      });
    }
  };

  const handleInputChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  const toggleStatus = (id) => {
    const updatedTodoList = [...todoList];
    const todoToUpdate = updatedTodoList.find((todo) => todo.id === id);
  
    if (todoToUpdate) {
      todoToUpdate.status = !todoToUpdate.status;
      setTodoList(updatedTodoList);
    }
  };


  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);
  };

  const editTodo = (id) => {
    const todoToEdit = todoList.find((todo) => todo.id === id);
    if (todoToEdit) {
      setTodo({
        ...todoToEdit,
        editMode: true,
      });
    }
  };
  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        todoList,
        addTodo,
        removeTodo,
        handleInputChange,
        toggleStatus,
        editTodo,
      
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}