
import './App.css';
import InputField from './components/InputField';
import NavBar from './components/NavBar';
import TodoList from './components/TodoList';
import UserName from './components/UserName';

import { TodoProvider } from './TodoContext';




function App() {

  return (
    <TodoProvider>

      {/* <div> */}
      <NavBar  />

      <UserName/>
        <InputField />
        <TodoList />
      {/* </div> */}
    </TodoProvider>
  );
}

export default App;
