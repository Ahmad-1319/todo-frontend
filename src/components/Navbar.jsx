import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { FiSun, FiMoon, FiFilter } from "react-icons/fi";

import {  FaClipboardList } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";
import { useMode } from "../Context/modeContext";
import { toast } from "react-toastify";
import { useTodo } from "../Context/todoContext";

const Navbar = () => {
  const { darkMode, toggleMode } = useMode();
  const {setFilter} = useTodo()
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);


  if (darkMode) {
    document.body.style.backgroundColor = "#1a202c";
    document.body.style.color = "#fff";
  } else {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
  }

  const handleLogOut = () => {
    
    localStorage.clear();
    navigate("/login");
    toast.success("Logged Out Successfully");
  };
const handleFilter = (filter) => {
  setFilter(filter);
  setShowFilter(false); // Close the filter dropdown after selecting an option
}
  return (
    <nav
      className={`p-4 shadow-md ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-2">
          <FaClipboardList className="text-3xl text-blue-500" />
          <span className="text-2xl font-bold">ToDoList</span>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 relative">
          {/* Filter Icon */}
          <button
            className={`text-xl relative ${localStorage.getItem("token") ? "block" : "hidden"} `}
            onClick={() => setShowFilter(!showFilter)}
          >
            <FiFilter />
          </button>

          {/* Filter Dropdown */}
          {showFilter && (
            <div
              className={`absolute top-10 right-0 w-40 ${darkMode?"bg-slate-700 text-white":"bg-slate-100 text-slate-700"} shadow-lg rounded-md p-2 transition-all duration-300 `}
            >
              <button className={`block w-full text-left p-2 ${darkMode?"hover:bg-slate-300 text-slate-100" :"hover:bg-slate-200 text-slate-700"}rounded-md`} onClick={() =>{ handleFilter("All")} }> 
                All
              </button>
              <button className={`block w-full text-left p-2 ${darkMode?"hover:bg-slate-300 text-slate-100" :"hover:bg-slate-200 text-slate-700"}rounded-md`}onClick={() =>{ handleFilter("Completed")} }>
                Completed
              </button>
              <button className={`block w-full text-left p-2 ${darkMode?"hover:bg-slate-300 text-slate-100" :"hover:bg-slate-200 text-slate-700"}rounded-md`} onClick={() =>{ handleFilter("Important")} }>
                Important
              </button>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <button onClick={toggleMode} className="text-xl">
            {darkMode ? (
              <FiSun className="text-yellow-300" />
            ) : (
              <FiMoon className="text-blue-500" />
            )}
          </button>

          {/* Logout */}
          <button className={`text-xl ${localStorage.getItem("token") ? "block" : "hidden"}`}>
            <TbLogout onClick={handleLogOut} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
