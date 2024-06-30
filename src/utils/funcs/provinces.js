import toast from "react-hot-toast";
import { authorizedApi } from "../api";

const createProvince = async (province, callback) => {
  try {
    const response = await authorizedApi.post("/provinces", province);
    toast.success("Province created successfully!");
    if (callback) callback();
  } catch (error) {
    toast.error("Failed to create province.");
    console.error("Error creating province:", error);
  }
};

// Update function
const updateProvince = async (province, callback) => {
  try {
    const response = await authorizedApi.put(
      `/provinces/${province.id}`,
      province
    );
    toast.success("Province updated successfully!");
    if (callback) callback();
  } catch (error) {
    toast.error("Failed to update province.");
    console.error("Error updating province:", error);
  }
};

// Delete function
const deleteProvince = async (provinceId, callback) => {
  try {
    const response = await authorizedApi.delete(`/provinces/${provinceId}`);
    toast.success("Province deleted successfully!");
    if (callback) callback();
  } catch (error) {
    toast.error("Failed to delete province.");
    console.error("Error deleting province:", error);
  }
};

export { createProvince, updateProvince, deleteProvince };
