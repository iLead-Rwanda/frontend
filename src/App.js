import "./App.css";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dash";
import Notification from "./Pages/Student";
import AddStudent from "./Pages/AddStudent";
import RegisteredStudents from "./Pages/RegisteredStudents";
import Certificates from "./Pages/Certificates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dash" element={<Dashboard />} />
        <Route path="/students" element={<Notification />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/all" element={<RegisteredStudents />} />
        <Route path="/certificates" element={<Certificates />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
