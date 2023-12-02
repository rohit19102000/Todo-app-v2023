
import { useEffect, useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import NavBar from './components/NavBar';
import TodoList from './components/TodoList';

import { TodoProvider } from './TodoContext';
import { auth } from './config/firebase';
import UserName from './components/UserName';


function App() {

  return (
    <TodoProvider>

      <div>
      <NavBar  />

      <UserName/>
        <InputField />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
