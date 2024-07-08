import React, { useState } from "react";
import * as XLSX from "xlsx";
import { UploadIcon } from "./icons";

const ExcelFileInput = ({ onFileSelect }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showing, setShowing] = useState(false);
  const [studentsBySheet, setStudentsBySheet] = useState({});

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetData = {};
      workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: "",
        });

        const extractedData = extractData(jsonData);
        sheetData[sheetName] = extractedData;
      });

      setStudentsBySheet(sheetData);
      if (onFileSelect) onFileSelect(sheetData);
    };

    reader.readAsArrayBuffer(file);
  };

  const extractData = (data) => {
    console.log(data)
    return data
      .filter((row) => row.length >= 3 && typeof row[0] === "number")
      .map(([number, name, chapter, gender]) => ({
        number,
        name,
        chapter,
        gender: gender || null,
      }));
  };

  return (
    <div className="mb-4">
      <div className=" w-full py-10 flex flex-col items-center justify-center border-primary border-2 rounded-2xl px-4">
        <label htmlFor="fileUpload" className="flex flex-col items-center">
          <UploadIcon />
          <p className="text-primary font-semibold">Browse And Select Files</p>
          <p className="text-sm">Select an excel file of your students</p>
        </label>
        <div className="mt-5 w-full">
          {selectedFile && (
            <>
              <div className=" text-sm  bg-primary w-full py-1.5 text-white rounded-2xl px-4">
                <p>{selectedFile.name}</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowing(!showing)}
                    className="bg-white px-2 text-black py-0.5 rounded-md"
                  >
                    {!showing ? "Show" : "Hide"} Preview
                  </button>
                </div>
              </div>
              {showing && (
                <div className="w-full overflow-x-auto">
                  {Object.keys(studentsBySheet).length > 0 && (
                    <div className="mt-4">
                      {Object.keys(studentsBySheet).map((sheetName) => (
                        <div key={sheetName} className="mb-6">
                          <h3 className="text-sm font-medium text-gray-700 mb-2">
                            {sheetName}
                          </h3>
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Number
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Chapter
                                </th>
                                {studentsBySheet[sheetName].some(
                                  (student) => student.gender !== null
                                ) && (
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Gender
                                  </th>
                                )}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {studentsBySheet[sheetName].map(
                                (student, index) => (
                                  <tr key={index}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {student.number}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {student.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                      {student.chapter}
                                    </td>
                                    {student.gender !== null && (
                                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                        {student.gender}
                                      </td>
                                    )}
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <input
        type="file"
        id="fileUpload"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default ExcelFileInput;
