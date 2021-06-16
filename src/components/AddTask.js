import { useState } from "react";
import { store } from "react-notifications-component";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function AddTask({ onAdd }) {
  const [name, setname] = useState("");
  var day = "";
  const [remainder, setremainder] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const onsubmit = (e) => {
    e.preventDefault();

    day = startDate.toString();
    day = day.slice(4, 25);
    console.log(day);
    if (!name) {
      store.addNotification({
        title: "Error!",
        message: "Please Enter Task Name",
        type: "danger",
        container: "top-right",
        insert: "top",
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      return;
    }
    if (!startDate) {
      store.addNotification({
        title: "Error!",
        message: "Please Select Task Date And Time",
        type: "danger",
        container: "top-right",
        insert: "top",

        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      return;
    }

    onAdd({ name, day, remainder });
    setname("");
    setremainder(false);
    store.addNotification({
      title: "Success!",
      message: "Task Added To State Successfully",
      type: "success",
      container: "top-right",
      insert: "top",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
        showIcon: true,
      },
    });
    const newTask = {
      taskname: name,
    };
    axios.post("http://localhost:3001/create", newTask).catch(console.error());
    console.log("AXIOS EXECUTED");
  };
  return (
    <div>
      <form className="add-form" onSubmit={onsubmit}>
        <div className="form-control">
          <label>Task Name</label>
          <input
            type="text"
            placeholder="Type in Task Name here"
            value={name}
            onChange={(e) => setname(e.target.value)}
            name="taskname"
          />
        </div>
        <div className="form-control">
          <label>Date & Time</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            timeInputLabel="Time:"
            dateFormat="dd, MMMM yyyy h:mm a"
            showTimeInput
          />
        </div>
        <div className="form-control form-control-check">
          <label>Reminder</label>
          <input
            type="checkbox"
            checked={remainder}
            value={remainder}
            onChange={(e) => setremainder(e.currentTarget.checked)}
          />
        </div>
        <input
          type="submit"
          value="Add Task to State"
          className="btn btn-block"
        />
      </form>
    </div>
  );
}
