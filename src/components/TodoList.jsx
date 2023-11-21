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
         {filteredTodoList.length > 0 ? (
        <h3 className={todo.category === 'Done' ? 'status-done' : 'status-pending'}>
          {todo.category === 'Done' ? 'Completed Tasks' : 'Pending Tasks'}
        </h3>
      ) : null}
      {filteredTodoList.map((item) => (
        
        <div key={item.id} className='todoCard' 
        style={{ border: `2px solid ${item.status ? '#5de800' : '#ffbf00'}` }}>
          <strong className={item.status ?"status-done":"status-pending" }>{item.text}</strong>
          <p style={{ fontSize: '.5rem' }}>{item.status === true ? 'done' : 'pending'}</p>
          <div className='details'>
            <p>{item.time}</p>
            <p>{item.date}</p>
            <h6></h6>
            <button className='edit' style={{ fontSize: '1.5rem', padding: '5px' }} onClick={() => editTodo(item.id)}>
              ✍
            </button>
            
          <button  className={item.status ? "btnA":"btnB"}
                  onClick={() => toggleStatus(item.id)}
        >
    {item.status ? 'X' : '✔'}
  </button>
            <button className='delete' onClick={() => removeTodo(item.id)}>🗑</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;