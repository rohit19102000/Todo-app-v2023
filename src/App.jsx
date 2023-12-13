
import './App.css';
import InputField from './components/InputField';
import NavBar from './components/NavBar';
import TodoList from './components/TodoList';
import UserName from './components/UserName';

import { TodoProvider } from './TodoContext';

import { auth } from './config/firebase'
import { useEffect, useState } from 'react';


function App() {


  const [userAuthenticated, setUserAuthenticated] =useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserAuthenticated(!!user); 
    });

    return () => unsubscribe();
  }, []);
  return (
    <TodoProvider>

      <NavBar  />
      {
      userAuthenticated? (
        <>
        <UserName/>
        <InputField />
        <TodoList />
        </>
      ) :
      <h1>
        please sign in to continue
      </h1>
      }
    </TodoProvider>
  );
}

export default App;
