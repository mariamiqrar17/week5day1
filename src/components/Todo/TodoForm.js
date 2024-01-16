import React, { useRef, useState } from "react";

const TodoForm = ({ getItem }) => {
  const itemRef = useRef(null);
  const [priority, setPriority] = useState(""); // Set default value to empty string

  const handleSubmit = (event) => {
    event.preventDefault();
    if (itemRef.current.value === "") {
      itemRef.current.focus();
    } else {
      const item = {
        task: itemRef.current.value,
        priority: priority,
        completed: false,
      };
      getItem(item);
      itemRef.current.value = "";
    }
  };

  function onKeyEnter(e) {
    if (e.keyCode === 13) {
      console.log("enter key pressed");
      handleSubmit(e);
    }
  }

  return (
    <form className="mb-3 px-3 text-start d-flex flex-column" onSubmit={handleSubmit}>
      <div className="mb-2">
        <input
          type="text"
          name="Item"
          className="form-control"
          id="item"
          placeholder="Add Todo Items..."
          ref={itemRef}
          onKeyDown={onKeyEnter}
        />
      </div>
      <div className="mb-2">
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="" disabled hidden>
            Priority
          </option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div>
        <button type="submit" className="btn btn-sm btn-primary bg-green-700" style={{ width: "100%" }}>
          Add
        </button>
      </div>
    </form>
  );
};

export default TodoForm;