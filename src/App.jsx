
import './App.css';
import InputField from './components/InputField';
import NavBar from './components/NavBar';
import TodoList from './components/TodoList';

import { TodoProvider } from './TodoContext';

function App() {
  return (
    <TodoProvider>

      <div>
        <NavBar/>
        <h1>Todo List</h1>
        <h3>v3 started| firebase auth implementation</h3>
        <InputField />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
