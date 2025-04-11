import { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";

// Create Context
const TodoContext = createContext();

// Provider Component
export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All");
  const getTodos = async () => {
    let res = await fetch("https://my-backend-production-17a5.up.railway.app/api/todo/get-todo", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
  
    let data = await res.json();
  
     // Debugging
  
    // Ensure data is always an array
    setTodos(data.allTodos);
  };
  const updateImportant = async (id, important)=> {
    try {
      let res = await fetch(`https://my-backend-production-17a5.up.railway.app/api/todo/update-important-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ important })
      });
      let data = await res.json()
      if(data.status){
        console.log("Important Updated" , data)
        getTodos()
      }
    } catch (error) {
      console.log(error.message)
    }
  };

  // Add Todo
  const addTodo = async (title, checked) => {
    let res = await fetch("https://my-backend-production-17a5.up.railway.app/api/todo/add-todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, checked }),
    });

    let data = await res.json();
    if (data.status) {
      toast.success(data.message);
      getTodos();
    }
  };

  // Get Todos

  

  // Update Todo (Toggle Completion or Edit)
  const updateTodo = async (id, title) => {
    let res = await fetch(`https://my-backend-production-17a5.up.railway.app/api/todo/update-todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title }),
    });

    let data = await res.json();
    if (data.status) {
      toast.success(data.Msg)
      getTodos();
    }
  };


  const updateCheck = async (id,checked)=>{
    try {
      let res = await fetch(`https://my-backend-production-17a5.up.railway.app/api/todo/update-checked-status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ checked })
      });
      let data = await res.json()
      if(data.status){
        console.log("Checked Updated" , data)
        getTodos()
      }
    } catch (error) {
      console.log(error.message)
    }

  }

  // Delete Todo
  const deleteTodo = async (id) => {
    let res = await fetch(`https://my-backend-production-17a5.up.railway.app/api/todo/delete-todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    let data = await res.json();
    if (data.status) {
      toast.success(data.Msg);
      getTodos();
    }


  };


  return (
    <TodoContext.Provider value={{ todos, addTodo, getTodos, deleteTodo, updateTodo, updateCheck, updateImportant, filter, setFilter }}>
      {children}
    </TodoContext.Provider>
  );
};

// Custom Hook for Using Context
export const useTodo = () => useContext(TodoContext);

