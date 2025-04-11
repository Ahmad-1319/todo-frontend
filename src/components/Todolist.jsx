import React, { useEffect, useState } from "react";
import { useMode } from "../Context/modeContext";
import { IoAddCircleOutline } from "react-icons/io5";
import Todoitem from "./Todoitem";
import { useTodo } from "../Context/todoContext";

const Todolist = () => {
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const { darkMode } = useMode();
  const { addTodo, todos, getTodos, filter, updateTodo } = useTodo();

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const addTask = () => {
    if (input.trim() === "") return;
    addTodo(input, false);
    setInput("");
  };

  const handleEdit = (id, currentTitle) => {
    setEditId(id);
    setEditInput(currentTitle);
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (editInput.trim() === "") return;
    updateTodo(editId, editInput);
    setIsEditing(false);
    setEditId(null);
    setEditInput("");
  };

  // Safe check for todos, ensuring it's an array
  const filteredTodos = Array.isArray(todos)
    ? todos.filter((todo) => {
        if (filter === "All") return true;
        if (filter === "Completed") return todo.checked === true;
        if (filter === "Important") return todo.important === true;
        return true;
      })
    : [];

  return (
    <>
      {/* Task Done Stats */}
      <div className="w-full p-4 flex justify-center h-auto">
        <div
          className={`bg-transparent w-full sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-lg ${
            darkMode ? "border-blue-600" : "border-slate-800"
          } border-2 flex items-center justify-around gap-2 p-4`}
        >
          <span className={`${darkMode ? "text-white" : "text-slate-950"} text-2xl sm:text-3xl`}>
            Task Done
          </span>
          <div
            className={`${
              darkMode ? "bg-blue-500" : "bg-slate-500"
            } w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center`}
          >
            <span className="text-white text-2xl sm:text-3xl">
              {filteredTodos.filter((todo) => todo.checked).length || "0"}
            </span>
            <span className="text-white text-2xl sm:text-3xl mx-1">/</span>
            <span className="text-white text-2xl sm:text-3xl">{filteredTodos.length || "0"}</span>
          </div>
        </div>
      </div>

      {/* Input Field */}
      <div className="w-full sm:h-20 bg-transparent p-4 flex justify-center items-center">
        <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`${darkMode ? "text-white" : "text-black"} w-full rounded-md p-2 pr-10 ${
              darkMode ? "bg-slate-700" : "bg-slate-100"
            } shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400`}
            placeholder="Add a task..."
            required
          />
          <IoAddCircleOutline
            className={`absolute right-2 top-1/2 -translate-y-1/2 text-3xl ${
              darkMode ? "text-slate-100" : "text-slate-500"
            } cursor-pointer`}
            onClick={addTask}
          />
        </div>
      </div>

      {/* Todo List */}
      <div
        className={`w-full ${
          darkMode ? "bg-slate-700 border-blue-500 border-2" : "bg-slate-200"
        } sm:w-2/3 md:w-1/2 lg:w-1/3 rounded-lg text-white p-4 my-3 shadow-lg mx-auto`}
      >
        {filteredTodos.length > 0 ? (
          filteredTodos.map((todo) => (
            <Todoitem
              key={todo._id}
              title={todo.title}
              todo={todo}
              onEdit={() => handleEdit(todo._id, todo.title)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-[90%] sm:w-[400px] flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800">Edit Task</h2>
            <input
              type="text"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Todolist;
