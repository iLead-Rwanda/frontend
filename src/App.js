import "./App.css";
import Login from "./pages/auth/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Notification from "./pages/Student";
import AddStudent from "./pages/AddStudent";
import RegisteredStudents from "./pages/RegisteredStudents";
import NewStudent from "./pages/NewStudent";
import Certificate from "./pages/main/Certificate";
import OneCertifiate from "./pages/OneCertificate";
import Analytics from "./pages/Analytics";
import Favorites from "./pages/Favorites";
import AppLayout from "./components/layout/AppLayout";
import AuthLayout from "./components/layout/AuthLayout";
import UserProvider from "./contexts/UserContext";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/main/Dashboard";
import Students from "./pages/main/Students";
import ProvinceSchools from "./pages/ProvinceSchools";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students/:category" element={<Notification />} />
            <Route path="/add" element={<AddStudent />} />
            <Route path="/province-schools" element={<ProvinceSchools />} />
            <Route path="/students" element={<Students />} />
            <Route path="/new" element={<NewStudent />} />
            <Route path="/certificates" element={<Certificate />} />
            <Route path="/one" element={<OneCertifiate />} />
            <Route path="/ana" element={<Analytics />} />
            <Route path="/fav" element={<Favorites />} />
          </Route>
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} />
          </Route>
        </Routes>
        <Toaster />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
