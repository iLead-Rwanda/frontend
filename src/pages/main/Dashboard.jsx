import React from "react";
import { useUser } from "../../contexts/UserContext";
import AdminDashboard from "../admin/AdminDashboard";
import UserDashboard from "../user/UserDashboard";

const Dashboard = () => {
  const { user } = useUser();
  return user?.role === "Admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default Dashboard;
