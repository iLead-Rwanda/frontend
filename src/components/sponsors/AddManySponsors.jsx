import React, { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import ExcelFileInput from "../core/ExcelFileInput";
import Button from "../core/Button";
import { addManySponsors, addSingleSponsor } from "../../utils/funcs/sponsors";
import useGet from "../../hooks/useGet";

const AddSponsors = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("many");
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sponsorName, setSponsorName] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState("");

  // Get schools for dropdown
  const { data: schools } = useGet("/schools");

  const [fileDataError, setFileDataError] = useState("");
  const [sponsorNameError, setSponsorNameError] = useState("");
  const [schoolError, setSchoolError] = useState("");

  const handleFileSelect = (data) => {
    setFileData(data);
    setFileDataError("");
  };

  const handleSponsorNameChange = (e) => {
    setSponsorName(e.target.value);
    setSponsorNameError("");
  };

  const handleSchoolChange = (e) => {
    setSelectedSchoolId(e.target.value);
    setSchoolError("");
  };

  const handleSubmitMany = async () => {
    let isValid = true;

    if (!fileData) {
      setFileDataError("Please select a file.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const formattedSponsors = Object.values(
      Object.keys(fileData).map((sheet) => {
        return fileData[sheet].map((sponsor) => ({
          name: sponsor.name,
          schoolId: sponsor.schoolId || sponsor.school_id || sponsor.SchoolId,
        }));
      })
    ).flat();

    const result = {
      sponsors: formattedSponsors,
    };

    setLoading(true);
    await addManySponsors(result, onClose);
    setLoading(false);
  };

  const handleSubmitOne = async () => {
    let isValid = true;

    if (!sponsorName) {
      setSponsorNameError("Please provide a sponsor name.");
      isValid = false;
    }

    if (!selectedSchoolId) {
      setSchoolError("Please select a school.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const sponsorData = {
      name: sponsorName,
      schoolId: selectedSchoolId,
    };

    setLoading(true);
    await addSingleSponsor(sponsorData, onClose);
    setLoading(false);
  };

  const handleDownloadTemplate = () => {
    const templateData = [
      ["Number", "Name", "SchoolId"],
      [1, "Sample Sponsor 1", "school-id-here"],
      [2, "Sample Sponsor 2", "school-id-here"],
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(templateData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sponsors");

    // Generate buffer
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    
    // Create blob and download
    const data = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "sponsors_template.xlsx";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Add Sponsors</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          &times;
        </button>
      </div>
      <div className="mb-4">
        <div className="grid grid-cols-2">
          <button
            className={`px-4 py-2 rounded-3xl text-sm font-semibold ${
              activeTab === "many" && "bg-primary text-white"
            }`}
            onClick={() => setActiveTab("many")}
          >
            Add Many
          </button>
          <button
            className={`px-4 py-2 rounded-3xl text-sm font-semibold ${
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
            <p className="text-sm font-medium text-gray-700 mb-2">
              Here is the format of the file for sponsors to upload:
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
              Add Sponsors
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <label
              htmlFor="sponsorName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Sponsor Name:
            </label>
            <input
              type="text"
              id="sponsorName"
              value={sponsorName}
              onChange={handleSponsorNameChange}
              className="w-full px-3 py-2 rounded-2xl border-primary border text-sm outline-none"
            />
            {sponsorNameError && (
              <p className="text-red-500 text-sm">{sponsorNameError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="school"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              School:
            </label>
            <select
              id="school"
              value={selectedSchoolId}
              onChange={handleSchoolChange}
              className="w-full px-3 py-2 rounded-2xl border-primary border text-sm outline-none"
            >
              <option value="">Select School</option>
              {schools?.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
            {schoolError && (
              <p className="text-red-500 text-sm">{schoolError}</p>
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
              Add Sponsor
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSponsors;
