
import { createContext, useContext, useState } from 'react';

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
    editMode: false,
    category: 'All', 
  });
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [idCounter, setIdCounter] = useState(1);

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
      if (todo.editMode) {
        const updatedTodoList = [...todoList];
        updatedTodoList[editIndex] = updatedTodo;

        setTodoList(updatedTodoList);

        setTodo({
          text: '',
          status: false,
          editMode: false,
          category: 'All', 
        });
        setEditIndex(null);
      } else {
        setTodoList([...todoList, updatedTodo]);

        setTodo({
          text: '',
          status: false,
          editMode: false,
          category: 'All',
        });
      }
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
    const index = updatedTodoList.findIndex((item) => item.id === id);
    if (index !== -1) {
      updatedTodoList[index].status = !updatedTodoList[index].status;
      setTodoList(updatedTodoList);
    }
  };

  const removeTodo = (id) => {
    const updatedTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(updatedTodoList);
  };

  const editTodo = (id) => {
    const index = todoList.findIndex((item) => item.id === id);
    if (index !== -1) {
      setEditIndex(index);
      setTodo({
        ...todoList[index],
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
