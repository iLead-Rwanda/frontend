import "./App.css";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/Dash";
import Notification from "./pages/Student";
import AddStudent from "./pages/AddStudent";
import RegisteredStudents from "./pages/RegisteredStudents";
import NewStudent from "./pages/NewStudent";
import Certificate from "./pages/Certificate";
import OneCertifiate from "./pages/OneCertificate";
import Analytics from "./pages/Analytics";
import Favorites from "./pages/Favorites";
import AppLayout from "./Components/layout/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students/:category" element={<Notification />} />
          <Route path="/add" element={<AddStudent />} />
          <Route path="/all" element={<RegisteredStudents />} />
          <Route path="/new" element={<NewStudent />} />
          <Route path="/certi" element={<Certificate />} />
          <Route path="/one" element={<OneCertifiate />} />
          <Route path="/ana" element={<Analytics />} />
          <Route path="/fav" element={<Favorites />} />
        </Route>
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
