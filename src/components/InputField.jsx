
import { useTodoContext } from '../TodoContext';

function InputField() {
  const { todo, setTodo, addTodo } = useTodoContext();

  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a task"
        value={todo}
        onChange={handleInputChange}
      />
      <button onClick={() => addTodo(todo)}>Add</button>
    </div>
  );
}

export default InputField;
