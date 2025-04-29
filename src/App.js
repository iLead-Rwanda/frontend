import "./App.css";
import Login from "./pages/auth/Login";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
import AuthLayout from "./components/layout/AuthLayout";
import UserProvider from "./contexts/UserContext";
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/main/Dashboard";
import Students from "./pages/main/Students";
import ProvinceSchools from "./pages/ProvinceSchools";
import ModalProvider from "./contexts/ModalContext";
import Schools from "./pages/main/Schools";
import SchoolStudentsCertificates from "./pages/main/SchoolStudentsCertificates";
import Certificates from "./pages/main/Certificates";
import ViewOneCertificate from "./pages/ViewOneCertificate";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ModalProvider>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="/" element={<Dashboard />} />
              {/* <Route path="/students/:category" element={<Notification />} />
              <Route path="/add" element={<AddStudent />} /> */}
              <Route path="/province-schools" element={<ProvinceSchools />} />
              <Route path="/students" element={<Students />} />
              <Route path="/schools" element={<Schools />} />
              <Route
                path="/schools/:school/:schoolId/:type"
                element={<SchoolStudentsCertificates />}
              />
              {/* <Route path="/new" element={<NewStudent />} /> */}
              <Route path="/certificates" element={<Certificates />} />
              {/* <Route path="/one" element={<OneCertifiate />} />
              <Route path="/ana" element={<Analytics />} />
              <Route path="/fav" element={<Favorites />} /> */}
            </Route>
            <Route path="/certificate/:id" element={<ViewOneCertificate />} />
            {/* <Route path="/register" element={<Register />} /> */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="/auth/login" element={<Login />} />
            </Route>
          </Routes>
          <Toaster />
        </ModalProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
