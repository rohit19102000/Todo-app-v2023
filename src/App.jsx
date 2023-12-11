
import './App.css';
import InputField from './components/InputField';
import NavBar from './components/NavBar';
import TodoList from './components/TodoList';
import UserName from './components/UserName';

import { TodoProvider } from './TodoContext';




function App() {

  return (
    <TodoProvider>

      <NavBar  />

      <UserName/>
        <InputField />
        <TodoList />
    </TodoProvider>
  );
}

export default App;
