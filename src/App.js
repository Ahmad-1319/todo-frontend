import {  BrowserRouter as Router,Route,  Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
// import TodoList from './components/TodoList';
// import SignUp from './components/SignUp';
// import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import Todolist from './components/Todolist';
import SignUp from './components/SignUp';
import Login from './components/login';
import { ModeProvider } from './Context/modeContext';
import { TodoProvider } from './Context/todoContext';
import ProtectedRoute from './ProtectedRoute';
function App() {

  return (
<>
<ModeProvider>
  <TodoProvider>

<Router>
  <Navbar/>
  <ToastContainer
/>

   
  <Routes>
  <Route path="/login" element={<Login/>}/>
  <Route path="/signup" element={<SignUp/>}/>
  <Route element={<ProtectedRoute/>}>
    <Route path="/" element={<Todolist/>}/>
    </Route>

   
</Routes>
</Router>
</TodoProvider>
</ModeProvider>
</>

)}

export default App;
