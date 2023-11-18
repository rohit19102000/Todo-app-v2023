import { useTodoContext } from '../TodoContext';

function TodoList() {
  const { todoList, removeTodo, toggleStatus, editTodo } = useTodoContext();
  const { todo } = useTodoContext();

  const filteredTodoList = todoList.filter((item) => {
    if (todo.category === 'All') {
      return true; 
    } else {
      return item.status === (todo.category === 'Done');
    }
  });

  return (
    <div className='todoList'>
      {filteredTodoList.map((item) => (
        <div key={item.id} className='todoCard'>
          <strong>{item.text}</strong>
          <p style={{ fontSize: '.5rem' }}>{item.status === true ? 'done' : 'pending'}</p>
          <div className='details'>
            <p>{item.time}</p>
            <p>{item.date}</p>
            <h6></h6>
            <button style={{ fontSize: '1.5rem', padding: '5px' }} onClick={() => editTodo(item.id)}>
              ✍
            </button>
            <button onClick={() => toggleStatus(item.id)}>{item.status ? 'Done' : 'Pending'}</button>
            <button onClick={() => removeTodo(item.id)}>🗑</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;