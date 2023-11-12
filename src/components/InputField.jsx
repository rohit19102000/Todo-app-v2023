

import { useTodoContext } from '../TodoContext';

function InputField() {
  const { todo, addTodo, handleInputChange } = useTodoContext();

  
  
  
  return (
    <div className='inputContainer'>
      <input
        className='input'
        type='text'
        name='text'
        placeholder='Enter a task'
        value={todo.text}
        onChange={handleInputChange}
      />
      {todo.text.trim() !== '' || todo.editMode ? (
        <button onClick={() => addTodo(todo)}>{todo.editMode ||  undefined ? '✍' : '+'}</button>
      ) : null}
    </div>
  );
}

export default InputField;
