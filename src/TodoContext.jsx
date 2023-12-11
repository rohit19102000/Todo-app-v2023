import { createContext, useContext, useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db,auth } from './config/firebase';

const TodoContext = createContext();

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export function TodoProvider({ children }) {
  const [todo, setTodo] = useState({
    text: '',
    status: false,
    editMode: false,
    category: 'All',
    userUID: null,
  });
  
  const [todoList, setTodoList] = useState([]);

  const todosCollection = collection(db, 'todos');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setTodo((prevTodo) => ({ ...prevTodo, userUID: user.uid }));
      }
    });

    return () => unsubscribe();
  }, []);
  
  const fetchTodos = async () => {
    const querySnapshot = await getDocs(todosCollection);
    console.log("hello")
    const todos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTodoList(todos);
  };
  
  const addTodo = async (newTodo) => {
    if (newTodo.text.trim() !== '') {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleDateString();
      const formattedTime = currentDate.toLocaleTimeString();
      
      const updatedTodo = {
        text: newTodo.text,
        time: formattedTime,
        date: formattedDate,
        status: false,
        editMode: false,
        category: newTodo.category || 'All',
        userUID: todo.userUID,
      };
      
      if (todo.editMode) {
        await updateDoc(doc(db, 'todos', `${todo.id}`), updatedTodo);
      } else {
        await addDoc(todosCollection, updatedTodo);
      }
      
      fetchTodos(); 
      setTodo({
        text: '',
        status: false,
        editMode: false,
        category: 'All',
        userUID: todo.userUID,
      });
    }
  };

  const removeTodo = async (id) => {
    await deleteDoc(doc(db, 'todos', `${id}`));
    fetchTodos(); 
  };

  const toggleStatus = async (id) => {
    const todoToUpdate = todoList.find((todo) => todo.id === id);

    if (todoToUpdate) {
      const updatedStatus = !todoToUpdate.status;
      await updateDoc(doc(db, 'todos', `${id}`), { status: updatedStatus });
      fetchTodos(); 
    }
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

  const handleInputChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        todoList,
        addTodo,
        removeTodo,
        toggleStatus,
        editTodo,
        handleInputChange,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
