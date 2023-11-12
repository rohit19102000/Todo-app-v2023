// TodoContext.js
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
  });
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); 


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
      editMode: false,
    };

    if (todo.editMode) {
      // If in edit mode, update the existing todo
      const updatedTodoList = [...todoList];
      updatedTodoList[editIndex] = updatedTodo;

      setTodoList(updatedTodoList);

      // Reset the todo text, editIndex, and switch back to "add" mode
      setTodo({
        text: '',
        status: false,
        editMode:false,
      });
      setEditIndex(null);
    } else {
      // If in add mode, add the new todo
      setTodoList([...todoList, updatedTodo]);

      // Reset the todo text
      setTodo({
        text: '',
        status: false,
        editMode:false,
      });

    }
  }
};

// ...

  const handleInputChange = (e) => {
    setTodo({
      ...todo,
      text: e.target.value,
    });
  };

  const toggleStatus = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList[index].status = !updatedTodoList[index].status;
    setTodoList(updatedTodoList);
  };

  const removeTodo = (index) => {
    const updatedTodoList = [...todoList];
    updatedTodoList.splice(index, 1);
    setTodoList(updatedTodoList);
  };
  const editTodo = (index) => {
    // Set the index to be edited, populate the input field with the current text, and switch to "update" mode
    setEditIndex(index);
    setTodo({
      ...todoList[index],
      editMode: true,
    });

  };
  return (
    <TodoContext.Provider value={{ todo, setTodo, todoList, addTodo, removeTodo, handleInputChange ,toggleStatus ,editTodo}}>
      {children}
    </TodoContext.Provider>
  );
}
