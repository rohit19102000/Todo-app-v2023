
import './App.css';
import InputField from './components/InputField';
import TodoList from './components/TodoList';

import { TodoProvider } from './TodoContext';

function App() {
  return (
    <TodoProvider>
      <div>
        <h1>Todo List</h1>
        <h3>v2 started</h3>
        <InputField />
        <TodoList />
      </div>
    </TodoProvider>
  );
}

export default App;
