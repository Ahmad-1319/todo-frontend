import React from "react";
import { FaRegEdit, FaStar, FaCheck } from "react-icons/fa";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useMode } from "../Context/modeContext";
import PropTypes from "prop-types";
import { useTodo } from "../Context/todoContext";

const TodoItem = ({ title, onEdit, todo }) => {
  const { darkMode } = useMode();
  const { updateImportant, updateCheck, deleteTodo } = useTodo();

  // Toggle completion
  const toggleCompletion = () => {
    updateCheck(todo._id, !todo.checked);
  };

  // Toggle Important
  const toggleImportant = () => {
    updateImportant(todo._id, !todo.important);
  };

  // Remove ToDo
  const removeTodo = () => {
    deleteTodo(todo._id);
  };

  return (
    <div className="w-full p-1 flex justify-center">
      <ul className="w-full bg-transparent rounded-lg flex flex-col gap-2 p-2">
        <li className="w-full">
          <div
            className={`w-full rounded-lg p-2 flex items-center justify-between shadow-md transition-all ${
              darkMode ? "bg-slate-400" : "bg-slate-100"
            } ${todo.important ? "border-2 border-red-500" : ""}`}
          >
            {/* Custom Round Checkbox */}
            <button
              className={`w-7 h-7 flex items-center justify-center rounded-full border-2 cursor-pointer transition-all duration-300 
                ${
                  todo.checked
                    ? "bg-green-500 border-green-600 text-white"
                    : "bg-transparent border-slate-800"
                }`}
              onClick={toggleCompletion}
              aria-label="Toggle task completion"
            >
              {todo.checked && <FaCheck className="text-lg" />}
            </button>

            {/* Task Title */}
            <span
              className={`text-2xl font-semibold ${
                darkMode ? "text-white" : "text-black"
              } ${todo.checked ? "line-through text-gray-500" : ""}`}
            >
              {title}
            </span>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {/* Mark as Important */}
              <button onClick={toggleImportant} aria-label="Mark as Important">
                <FaStar
                  className={`text-xl transition-all duration-300 ${
                    todo.important ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              </button>

              {/* Edit Button */}
              <button onClick={onEdit} aria-label="Edit task">
                <FaRegEdit className="text-green-600 text-xl" />
              </button>

              {/* Delete Button */}
              <button aria-label="Delete task" onClick={removeTodo}>
                <RiDeleteBin7Line className="text-red-500 text-xl" />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  todo: PropTypes.object.isRequired,
};

export default TodoItem;
