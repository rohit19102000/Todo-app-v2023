
import { useTodoContext } from '../TodoContext';

function InputField() {
  const { todo, addTodo, handleInputChange } = useTodoContext();

  return (
    <div >
      <input
      className='input'
        type="text"
        name="text"
        placeholder="Enter a task"
        value={todo.text} // Access the text property of todo
        onChange={handleInputChange}
      />
      <button onClick={() => addTodo(todo)}>+</button>
    </div>
  );
}

export default InputField;
