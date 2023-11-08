import { useTodoContext } from "../TodoContext";


function TaskList() {
  const { todoList,removeTodo } = useTodoContext();

  return (
    <ol>
      {todoList.map((item, index) => (
        <li key={index}>
          {item}
       
          <button onClick={() => removeTodo(index)}>x</button>
        </li>
      ))}
    </ol>
  );
}

export default TaskList;
