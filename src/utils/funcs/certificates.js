import toast from "react-hot-toast";
import { authorizedApi } from "../api";

export const generateSchoolCertificates = async (schoolId, callback) => {
  try {
    await authorizedApi.post(`/certificates/school/${schoolId}`);
    toast.success("Certificates generated succesfully!");
    if (callback) callback();
  } catch (error) {
    toast.error("Failed to generate certificates.");
    console.error(error);
  }
};

export const generateStudentCertificates = async (studentId, callback) => {
  try {
    await authorizedApi.post(`/certificates/${studentId}`);
    toast.success("Certificate generated succesfully!");
    if (callback) callback();
  } catch (error) {
    toast.error("Failed to generate certificate.");
    console.error(error);
  }
};
