import logo from "./logo.svg";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import "./App.css";
import { useState } from "react";
import AddTask from "./components/AddTask";
import ReactNotifications from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  const [showAddTask, setshowAddTask] = useState(false);
  const [taskarray, setTaskarray] = useState([
    {
      id: 1,
      name: "Default Appointment 1",
      day: "June 12 2021 14:30:00",
      remainder: true,
    },
    {
      id: 2,
      name: "Double Click me to Add Remainder",
      day: "Jul 15 2021 16:00:00",
      remainder: false,
    },
    {
      id: 3,
      name: "Double Click me to Remove Remainder",
      day: "Sep 23 2021 09:30:00",
      remainder: true,
    },
  ]);

  //Add Task To State
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    setTaskarray([...taskarray, newTask]);
  };

  //Delete Task Function

  const deleteTask = (id) => {
    setTaskarray(taskarray.filter((task) => task.id !== id));
  };

  //Toggle Remainder
  const ToggleRemainder = (id) => {
    setTaskarray(
      taskarray.map((task) =>
        task.id === id ? { ...task, remainder: !task.remainder } : task
      )
    );
    console.log(id);
  };

  return (
    <div className="App">
      <ReactNotifications />
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <div className="container">
        <Header
          onAdd={() => setshowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        {showAddTask && <AddTask onAdd={addTask} />}
        {taskarray.length > 0 ? (
          <Tasks
            taskarray={taskarray}
            onDelete={deleteTask}
            onToggle={ToggleRemainder}
          />
        ) : (
          <h4>Please Add Tasks to Show here</h4>
        )}
        <h4>
          Please Check state Component from react Chrome React Developer Tools
          to verify item.
        </h4>
      </div>
    </div>
  );
}

export default App;
