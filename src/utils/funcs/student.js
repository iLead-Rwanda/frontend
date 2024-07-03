import toast from "react-hot-toast";
import { authorizedApi } from "../api";

export const addManyStudents = async (data, callback) => {
  try {
    await authorizedApi.post("/students/many", data);
    toast.success("Students added successfully!");
    if (callback) callback();
  } catch (error) {
    toast.error("Failed to create students.");
    console.error("Error adding students:", error);
  }
};

export const addSingleStudent = async (data, callback) => {
  try {
    await authorizedApi.post("/students/", data);
    toast.success("Student added successfully!");
    if (callback) callback();
  } catch (error) {
    toast.error("Failed to add student.");
    console.error("Error adding student:", error);
  }
};
