import { useTodoContext } from '../TodoContext';
import { auth } from '../config/firebase'
import TodoItem from './TodoItem';

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
    } else if( todoList.length >=1 && category !== 'All') {
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
              <TodoItem key={item.id} item={item} editTodo={editTodo} toggleStatus={toggleStatus} removeTodo={removeTodo} />
            ))
          )
      }

      
    </div>
  );
}

export default TodoList;