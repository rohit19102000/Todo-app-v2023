// import { createContext, useContext, useEffect, useState } from 'react';
// import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
// import { db,auth } from './config/firebase';

// const TodoContext = createContext();

// export const useTodoContext = () => {
//   return useContext(TodoContext);
// };


// export function TodoProvider({ children }) {
//   const [todo, setTodo] = useState({
//     text: '',
//     status: false,
//     editMode: false,
//     category: 'All',
//     userUID: null,
//   });
  
//   const [todoList, setTodoList] = useState([]);

//   const todosCollection = collection(db, 'todos');


//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         setTodo((prevTodo) => ({ ...prevTodo, userUID: user.uid }));
//         await fetchTodos();
//       }
//     });

//     return () => unsubscribe();
//   }, []);
  
//   const fetchTodos = async () => {
//     const querySnapshot = await getDocs(todosCollection);
//     const todos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     setTodoList(todos);
//   };

  
//   const addTodo = async (newTodo) => {
//     if (newTodo.text.trim() !== '') {
//       const currentDate = new Date();
//       const formattedDate = currentDate.toLocaleDateString();
//       const formattedTime = currentDate.toLocaleTimeString();
      
//       const updatedTodo = {
//         text: newTodo.text,
//         time: formattedTime,
//         date: formattedDate,
//         status: false,
//         editMode: false,
//         category: newTodo.category || 'All',
//         userUID: todo.userUID,
//       };
      
//       if (todo.editMode) {
//         await updateDoc(doc(db, 'todos', `${todo.id}`), updatedTodo);
//       } else {
//         await addDoc(todosCollection, updatedTodo);
//       }
      
//       fetchTodos(); 
//       setTodo({
//         text: '',
//         status: false,
//         editMode: false,
//         category: 'All',
//         userUID: todo.userUID,
//       });
//     }
//   };

//   const removeTodo = async (id) => {
//     await deleteDoc(doc(db, 'todos', `${id}`));
//     fetchTodos(); 
//   };

//   const toggleStatus = async (id) => {
//     const todoToUpdate = todoList.find((todo) => todo.id === id);

//     if (todoToUpdate) {
//       const updatedStatus = !todoToUpdate.status;
//       await updateDoc(doc(db, 'todos', `${id}`), { status: updatedStatus });
//       fetchTodos(); 
//     }
//   };

//   const editTodo = (id) => {
//     const todoToEdit = todoList.find((todo) => todo.id === id);
//     if (todoToEdit) {
//       setTodo({
//         ...todoToEdit,
//         editMode: true,
//       });
//     }
//   };
  
//   const handleInputChange = (e) => {
//     setTodo({
//       ...todo,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <TodoContext.Provider
//       value={{
//         todo,
//         setTodo,
//         todoList,
//         addTodo,
//         removeTodo,
//         toggleStatus,
//         editTodo,
//         handleInputChange,
//       }}
//     >
//       {children}
//     </TodoContext.Provider>
//   );
// }
import { createContext, useContext, useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, onSnapshot } from 'firebase/firestore';
import { db, auth } from './config/firebase';

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
  const [userTodoCollection, setUserTodoCollection] = useState(null);

  useEffect(() => {
    let unsubscribeAuth = () => {};
    let unsubscribeTodo = () => {};

    const setupCollection = async (user) => {
      const userCollectionName = `todo_${user.uid}`;
      const collectionRef = collection(db, userCollectionName);
      setUserTodoCollection(collectionRef);

      unsubscribeTodo(); // Unsubscribe from the previous listener

      unsubscribeTodo = onSnapshot(collectionRef, (querySnapshot) => {
        const todos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTodoList(todos);
      });
    };

    unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setTodo((prevTodo) => ({ ...prevTodo, userUID: user.uid }));
        await setupCollection(user);
      }
    });

    return () => {
      unsubscribeAuth(); // Unsubscribe from the auth listener
      unsubscribeTodo(); // Unsubscribe from the todo listener
    };
  }, []); // No dependencies to ensure it only runs once

  const fetchTodos = async () => {
    if (userTodoCollection) {
      const querySnapshot = await getDocs(userTodoCollection);
      const todos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTodoList(todos);
    }
  };

  const addTodo = async (newTodo) => {
    if (newTodo.text.trim() !== '' && userTodoCollection) {
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
        await updateDoc(doc(userTodoCollection, `${todo.id}`), updatedTodo);
      } else {
        await addDoc(userTodoCollection, updatedTodo);
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
    if (userTodoCollection) {
      await deleteDoc(doc(userTodoCollection, `${id}`));
      fetchTodos();
    }
  };

  const toggleStatus = async (id) => {
    if (userTodoCollection) {
      const todoToUpdate = todoList.find((todo) => todo.id === id);

      if (todoToUpdate) {
        const updatedStatus = !todoToUpdate.status;
        await updateDoc(doc(userTodoCollection, `${id}`), { status: updatedStatus });
        fetchTodos();
      }
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
