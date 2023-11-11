import { useTodoContext } from '../TodoContext';

function TodoList() {
  const { todoList, removeTodo } = useTodoContext();

  return (
    <div className='todoList'>
      {todoList.map((item, index) => (
        <div key={index}  className='todoCard'>
          <strong >{item.text}</strong>
          <div className=' details'>

          <p>{item.time}</p>
          <p>{item.date}</p>
          <h6>{item.status ? "Done" : "Incomplete"}</h6>
          <button onClick={() => removeTodo(index)}>🗑</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;

