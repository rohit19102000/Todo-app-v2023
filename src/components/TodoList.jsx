import { useTodoContext } from "../TodoContext";


function TaskList() {
  const { todoList } = useTodoContext();

  return (
    <ul>
      {todoList.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default TaskList;
