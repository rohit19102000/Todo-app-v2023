import { useTodoContext } from '../TodoContext';

function InputField() {
  const { todo, addTodo, handleInputChange } = useTodoContext();

  return (
    <div className='inputContainer'>
      <select style={{padding:"10px", marginRight:"50px" ,borderRadius:"5px"}}
        className='categorySelect'
        name='category'
        value={todo.category}
        onChange={(e) => handleInputChange({ target: { name: 'category', value: e.target.value } })}
      >
        <option value='All'>All</option>
        <option value='Done'>Done</option>
        <option value='Pending'>Pending</option>
      </select>
      <input
        className='input'
        type='text'
        name='text'
        placeholder='Enter a task'
        value={todo.text}
        onChange={handleInputChange}
      />
      {todo.text.trim() !== '' || todo.editMode ? (
        <button onClick={() => addTodo(todo)}>{todo.editMode ? '✍' : '+'}</button>
      ) : null}
    </div>
  );
}

export default InputField;
