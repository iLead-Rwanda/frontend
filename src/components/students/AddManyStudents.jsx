import React, { useState } from "react";
import ExcelFileInput from "../core/ExcelFileInput";
import Button from "../core/Button";
import { addManyStudents, addSingleStudent } from "../../utils/funcs/student";

const AddStudents = ({ onClose, schoolId }) => {
  const [activeTab, setActiveTab] = useState("many");
  const [schoolName, setSchoolName] = useState("");
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [studentName, setStudentName] = useState("");
  const [studentGender, setStudentGender] = useState("");
  const [studentLevel, setStudentLevel] = useState("");

  const [schoolNameError, setSchoolNameError] = useState("");
  const [fileDataError, setFileDataError] = useState("");
  const [studentNameError, setStudentNameError] = useState("");
  const [studentGenderError, setStudentGenderError] = useState("");
  const [studentLevelError, setStudentLevelError] = useState("");

  const handleSchoolNameChange = (e) => {
    setSchoolName(e.target.value);
    setSchoolNameError("");
  };

  const handleFileSelect = (data) => {
    setFileData(data);
    setFileDataError("");
  };

  const handleStudentNameChange = (e) => {
    setStudentName(e.target.value);
    setStudentNameError("");
  };

  const handleStudentGenderChange = (e) => {
    setStudentGender(e.target.value);
    setStudentGenderError("");
  };

  const handleStudentLevelChange = (e) => {
    setStudentLevel(e.target.value);
    setStudentLevelError("");
  };

  const handleSubmitMany = async () => {
    let isValid = true;

    if (!schoolName && !schoolId) {
      setSchoolNameError("Please provide a school name.");
      isValid = false;
    }

    if (!fileData) {
      setFileDataError("Please select a file.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const formattedData = Object.values(
      Object.keys(fileData).map((sheet) => {
        return fileData[sheet].map((student) => ({
          name: `${student.firstName} ${student.surname}`,
          iLeadChapter: student.chapter.toUpperCase().trim().replace(" ", ""),
          gender:
            student.gender[0] === "F"
              ? "FEMALE"
              : student.gender[0] === "M"
              ? "MALE"
              : null,
        }));
      })
    ).flat();

    const result = {
      schoolName: schoolId ? undefined : schoolName,
      students: formattedData,
    };

    setLoading(true);
    await addManyStudents(result, onClose);
    setLoading(false);
  };

  const handleSubmitOne = async () => {
    let isValid = true;

    if (!studentName) {
      setStudentNameError("Please provide a student name.");
      isValid = false;
    }

    if (!studentGender) {
      setStudentGenderError("Please select a gender.");
      isValid = false;
    }

    if (!studentLevel) {
      setStudentLevelError("Please select a level.");
      isValid = false;
    }

    if (!schoolName && !schoolId) {
      setSchoolNameError("Please provide a school name.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const studentData = {
      name: studentName,
      gender: studentGender,
      iLeadChapter: studentLevel.toUpperCase().trim().replace(" ", ""),
      schoolName: schoolId ? undefined : schoolName,
    };

    setLoading(true);
    await addSingleStudent(studentData, onClose);
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
        <h2 className="text-xl font-bold">Add Students</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>
      <div className="mb-4">
        <div className="grid grid-cols-2">
          <button
            className={`px-4 py-2 rounded-3xl   text-sm font-semibold ${
              activeTab === "many" && "bg-primary text-white" 
            }`}
            onClick={() => setActiveTab("many")}
          >
            Add Many
          </button>
          <button
            className={`px-4 py-2 rounded-3xl  text-sm font-semibold  ${
              activeTab === "one" && "bg-primary text-white" 
            }`}
            onClick={() => setActiveTab("one")}
          >
            Add One
          </button>
        </div>
      </div>
      {activeTab === "many" ? (
        <div>
          <div className="mb-4">
            {!schoolId && (
              <>
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
                  className="w-full px-3 py-2 rounded-2xl border-primary border text-sm outline-none"
                />
                {schoolNameError && (
                  <p className="text-red-500 text-sm">{schoolNameError}</p>
                )}
              </>
            )}
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
          {fileDataError && (
            <p className="text-red-500 text-sm mt-1">{fileDataError}</p>
          )}
          <div className="mt-4 flex justify-between space-x-2">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={handleSubmitMany}
              loading={loading}
            >
              Add Students
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            {!schoolId && (
              <>
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
                  className="w-full px-3 py-2 rounded-2xl border-primary border text-sm outline-none"
                />
                {schoolNameError && (
                  <p className="text-red-500 text-sm">{schoolNameError}</p>
                )}
              </>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="studentName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Student Name:
            </label>
            <input
              type="text"
              id="studentName"
              value={studentName}
              onChange={handleStudentNameChange}
              className="w-full px-3 py-2 rounded-2xl border-primary border text-sm outline-none"
            />
            {studentNameError && (
              <p className="text-red-500 text-sm">{studentNameError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="studentGender"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Gender:
            </label>
            <select
              id="studentGender"
              value={studentGender}
              onChange={handleStudentGenderChange}
              className="w-full px-3 py-2 rounded-2xl border-primary border text-sm outline-none"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
            {studentGenderError && (
              <p className="text-red-500 text-sm">{studentGenderError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="studentLevel"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Level:
            </label>
            <select
              id="studentLevel"
              value={studentLevel}
              onChange={handleStudentLevelChange}
              className="w-full px-3 py-2 rounded-2xl border-primary border text-sm outline-none"
            >
              <option value="">Select Level</option>
              <option value="ILEAD">ILEAD</option>
              <option value="IDO">IDO</option>
              <option value="ICHOICE">ICHOICE</option>
            </select>
            {studentLevelError && (
              <p className="text-red-500 text-sm">{studentLevelError}</p>
            )}
          </div>
          <div className="mt-4 flex justify-between space-x-2">
            <Button variant="secondary" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={handleSubmitOne}
              loading={loading}
            >
              Add Student
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStudents;
