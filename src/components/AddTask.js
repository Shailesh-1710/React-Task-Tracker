import { useState } from "react";
import { store } from "react-notifications-component";

export default function AddTask({ onAdd }) {
  const [name, setname] = useState("");
  const [day, setday] = useState("");
  const [remainder, setremainder] = useState(false);

  const onsubmit = (e) => {
    e.preventDefault();

    if (!name) {
      {
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
      }
      return;
    }
    if (!day) {
      {
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
      }
      return;
    }
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
    onAdd({ name, day, remainder });
    setname("");
    setday("");
    setremainder(false);
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
          />
        </div>
        <div className="form-control">
          <label>Date & Time</label>

          <input
            type="text"
            placeholder="Enter Date and Time"
            value={day}
            onChange={(e) => setday(e.target.value)}
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
