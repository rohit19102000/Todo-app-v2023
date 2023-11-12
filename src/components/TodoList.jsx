import { useTodoContext } from '../TodoContext';

function TodoList() {
  const { todoList, removeTodo,toggleStatus,editTodo } = useTodoContext();

  return (
    <div className='todoList'>
      {todoList.map((item, index) => (
        <div key={index}  className='todoCard'>
          <strong >{item.text} </strong> 
          <p style={{fontSize:".5rem"} }>{item.status=== true ? "done" : "pending"}</p>
          <div className=' details'>

          <p>{item.time}</p>
          <p>{item.date}</p>  

          <h6></h6>
          <button style={{fontSize:"1.5rem",padding:"5px"}} onClick={() => editTodo(index)}>✍</button>

          <button onClick={()=> toggleStatus(index)}>{item.status ? "Done" : "pending"}</button>
          <button onClick={() => removeTodo(index)}>🗑</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TodoList;

