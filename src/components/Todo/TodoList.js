// TodoList.js
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import TodoListItem from "./TodoListItem";
import TodoForm from "./TodoForm";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodos,
} from "../../Services/api";

const TodoList = () => {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.userId);

  useEffect(() => {
    getItems().then((data) => {
      setItems(data);
    });
  }, [userId, token]);

  const getItems = async () => {
    return await getTodos(token, userId);
  };

  const addItem = async (item) => {
    const todo = {
      task: item.task,
      completed: item.completed,
      created_at: new Date(),
      completed_time: null,
      priority: `${items.length + 1}st`,
    };

    try {
      const response = await createTodo(todo, token, userId);

      if (response.task === item.task) {
        const newItem = item;
        setItems((prevItems) => [...prevItems, newItem]);
        toast.success("Todo Item added successfully");
      } else {
        console.log("Error adding item");
      }
    } catch (error) {
      console.log("Error adding item", error);
    }
  };

  const deleteItem = (index) => {
    const todo = items[index];
    deleteTodo(todo._id, token);
    toast.success("Todo Item deleted successfully");
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleSaveChanges = async (index, editedMessage) => {
    const todo = items[index];
    todo.task = editedMessage;

    try {
      var response = await updateTodo(todo, token);

      if (response.task === todo.task) {
        setItems((prevItems) => {
          const updatedItems = [...prevItems];
          updatedItems[index].task = editedMessage;
          return updatedItems;
        });
        toast.success("Todo Item updated successfully");
      } else {
        console.log("Error updating item");
        toast.error("Error updating item");
      }
    } catch (error) {
      console.log("Error updating item", error);
      toast.error("Error updating item");
    }
  };

  const handleCheckboxChange = async (index, checked) => {
    const todo = items[index];
    todo.completed = checked;

    try {
      var response = await updateTodo(todo, token);

      if (response.task === todo.task) {
        setItems((prevItems) => {
          const updatedItems = [...prevItems];
          updatedItems[index].completed = checked;
          return updatedItems;
        });
        toast.success("Item updated successfully");
      } else {
        console.log("Error updating item");
        toast.error("Error updating item");
      }
    } catch (error) {
      console.log("Error updating item", error);
      toast.error("Error updating item");
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container">
      <div className="col-12 col-md-8 col-lg-6 mx-auto py-4">
        <ToastContainer position="top-right" autoClose={3000} />
        <GlassMorphism id="todo-head" className="todo-header">
          <Head className="d-flex justify-content-between align-items-center p-3">
            <div className="p fw-normal d-flex justify-content-start align-items-center">
              <p className="mb-0">Enter the todo text here</p>
            </div>
            <div>
              <button
                className="btn btn-sm btn-transparent"
                onClick={toggleForm}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  className="bi bi-chevron-compact-down"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.553 6.776a.5.5 0 0 1 .67-.223L8 9.44l5.776-2.888a.5.5 0 1 1 .448.894l-6 3a.5.5 0 0 1-.448 0l-6-3a.5.5 0 0 1-.223-.67z"
                  />
                </svg>
              </button>
            </div>
          </Head>
          
          <ErrorMessage
            id="error-msg"
            className="text-sm text-warning"
          ></ErrorMessage>
          {showForm && <TodoForm getItem={addItem} />}{" "}
        </GlassMorphism>

        <ListItemWrapper className="my-3 text-dark">
          {items.map((item, index) => (
            <TodoListItem
              key={index}
              message={item}
              index={index}
              deleteItem={() => deleteItem(index)}
              onSaveChanges={handleSaveChanges}
              onCheckboxChange={handleCheckboxChange}
            >

              <Priority>{item.priority}</Priority>
        

            </TodoListItem>
          ))}
        </ListItemWrapper>
      </div>
    </div>
  );
};

export default TodoList;

const GlassMorphism = styled.div`
  background: rgba(34, 193, 195, 0.8); /* Change the color here */
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Head = styled.header``;

const ListItemWrapper = styled.div`
  background: #fafafa;
  border-radius: 10px;
`;

const ErrorMessage = styled.div``;

const Priority = styled.span`
  margin-right: 8px;
  font-weight: bold;
`;