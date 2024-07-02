import toast from "react-hot-toast";
import { authorizedApi } from "../api";

export const addManyStudents = async (data, callback) => {
  try {
    const response = await authorizedApi.post("/students/many", data);
    toast.success("Students added successfully!");
    if (callback) callback();
  } catch (error) {
    toast.error("Failed to create students.");
    console.error("Error adding students:", error);
  }
};
