import React, { useState } from "react";
import ExcelFileInput from "../core/ExcelFileInput";
import Button from "../core/Button";
import { addManyStudents } from "../../utils/funcs/student";

const AddManyStudents = ({ onClose }) => {
  const [schoolName, setSchoolName] = useState("");
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSchoolNameChange = (e) => {
    setSchoolName(e.target.value);
  };

  const handleFileSelect = (data) => {
    console.log(data);
    setFileData(data);
  };

  const handleSubmit = async () => {
    if (!schoolName || !fileData) {
      alert("Please provide a school name and select a file.");
      return;
    }

    const formattedData = Object.values(
      Object.keys(fileData).map((sheet) => {
        return fileData[sheet].map((student) => ({
          name: `${student.firstName} ${student.surname}`,
          iLeadChapter: student.chapter.toUpperCase().trim().replace(" ", ""),
          gender:
            student.gender === "F"
              ? "FEMALE"
              : student.gender === "M"
              ? "MALE"
              : null,
        }));
      })
    ).flat();

    const result = {
      schoolName,
      students: formattedData,
    };
    console.log(result);
    setLoading(true);
    await addManyStudents(result, onClose);
    setLoading(false);
  };

  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/students-template.xlsx";
    link.download = "student_template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add Many Students</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>
      <div className="mb-4">
        <label
          htmlFor="schoolName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          School Name:
        </label>
        <input
          type="text"
          id="schoolName"
          value={schoolName}
          onChange={handleSchoolNameChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-2xl shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Here is the format of the file for students to upload:
        </p>
        <Button
          variant="secondary"
          type="button"
          onClick={handleDownloadTemplate}
        >
          Download Template
        </Button>
      </div>
      <ExcelFileInput onFileSelect={handleFileSelect} />
      <div className="mt-4 flex justify-between space-x-2">
        <Button variant="secondary" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          type="button"
          onClick={handleSubmit}
          loading={loading}
        >
          Add Students
        </Button>
      </div>
    </div>
  );
};

export default AddManyStudents;
