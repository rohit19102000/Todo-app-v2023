

function TodoItem({ item, editTodo, toggleStatus, removeTodo }) {
  return (
    <div key={item.id} className='todoCard' style={{ marginBottom: '30px', border: `2px solid ${item.status ? '#5de800' : '#ffbf00'}` }}>
      <strong className={item.status ? 'status-done' : 'status-pending'}>{item.text}</strong>
      <div className='details displayNone'>
        <p style={{ fontSize: '.5rem' }}>{item.status === true ? 'done' : 'pending'}</p>
        <p>{item.time}</p>
        <p>{item.date}</p>
        <h6></h6>
      </div>
      <div className="buttons">
        <button className='edit' onClick={() => editTodo(item.id)}>
          ✍
        </button>
        <button className={item.status ? "btnA" : "btnB"} onClick={() => toggleStatus(item.id)}>
          {item.status ? 'X' : '✔'}
        </button>
        <button className='delete' onClick={() => removeTodo(item.id)}>🗑</button>
      </div>
    </div>
  );
}

export default TodoItem;
