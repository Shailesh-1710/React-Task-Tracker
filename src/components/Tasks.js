import Task from "./Task";

const Tasks = ({ taskarray, onDelete, onToggle }) => {
  return (
    <div>
      {taskarray.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};
export default Tasks;
