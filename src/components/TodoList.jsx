import { useTodoContext } from '../TodoContext';
import { auth } from '../config/firebase'

function TodoList() {
  const { todoList, removeTodo, toggleStatus, editTodo,handleInputChange } = useTodoContext();
  const { todo } = useTodoContext();

  const filteredTodoList = todoList.filter((item) => {
    if (todo.category === 'All') {
      return true; 
    } else {
      return item.status === (todo.category === 'Done');
    }
  });

  function getCategoryMessage(category) {
    if (category === 'All') {
      return 'Your to-do list is empty.';
    } else {
      return `you dont  have any todos in ${category} category`;
    }
  }

  const shouldRenderSelect = todoList.length > 1;

  return (
    <div className='todoList'>
      {shouldRenderSelect && (
        <select
          style={{
            padding: '10px',
            marginRight: '50px',
            marginBottom: '50px',
            borderRadius: '5px',
          }}
          className='categorySelect'
          name='category'
          value={todo.category}
          onChange={(e) => handleInputChange({ target: { name: 'category', value: e.target.value } })}
        >
          <option value='All'>All</option>
          <option value='Done'>Done</option>
          <option value='Pending'>Pending</option>
        </select>
      )}

          {

            filteredTodoList.length < 1 ? 
            <h1>{getCategoryMessage(todo.category)}</h1>
             :
            (
              filteredTodoList.map((item) => (
        
                <div key={item.id} className='todoCard' 
                style={{marginBottom :"30px", border: `2px solid ${item.status ? '#5de800' : '#ffbf00'}` }}>
                  <strong className={item.status ?"status-done":"status-pending" }>{item.text}</strong>
                  <div className='details displayNone'>
                  <p style={{ fontSize: '.5rem' }}>{item.status === true ? 'done' : 'pending'}</p>
                    <p >{item.time}</p>
                    <p>{item.date}</p>
                    <h6></h6>
                    </div>
                    <div className="buttons">
                    <button className='edit'  onClick={() => editTodo(item.id)}>
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
              ))
            )

          }

      
    </div>
  );
}

export default TodoList;