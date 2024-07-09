import React, { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link, useParams } from "react-router-dom";

const UploadStudent = () => {
  const { category } = useParams();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    setFiles(files);
    files.forEach((file) => {
      setProgress((prev) => ({
        ...prev,
        [file.name]: 0,
      }));
      uploadFile(file);
    });
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setSelectedFiles(files);
    files.forEach((file) => {
      setProgress((prev) => ({
        ...prev,
        [file.name]: 0,
      }));
      uploadFile(file);
    });
  };

  const uploadFile = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload", true);
    xhr.upload.addEventListener("progress", (e) => {
      const progress = Math.round((e.loaded * 100) / e.total);
      setProgress((prev) => ({ ...prev, [file.name]: progress }));
    });

    xhr.onload = () => {
      if (xhr.status === 200) {
        setUploadedFiles((prev) => [...prev, file]);
        setProgress((prev) => ({ ...prev, [file.name]: 100 }));
      } else {
        console.error("Error uploading file:", xhr.statusText);
      }
    };

    xhr.send(formData);
  };
  return (
    <div className="w-full flex flex-col gap-10">
      <p className="text-lg font-bold">{category} Students registered</p>
      <div className="w-full flex justify-center items-center">
        <div className="w-[50%] flex flex-col justify-center items-center p-10 gap-5 bg-white rounded-md">
          <p className="text-lg font-semibold text-[#0F0F0F]">Upload</p>
          <div
            className="bg-[#F8F4EF] border-2 border-dashed border-gray-400 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="h-16 w-16 flex justify-center items-center rounded-full">
              <Icon icon="lets-icons:upload-light" style={{ fontSize: 50 }} />
            </div>
            <div className="flex gap-2">
              <p className="text-gray-600 mt-4">Drag & drop files or</p>
              <button
                className="font-bold rounded mt-4 text-[#B58A5F] hover:underline"
                onClick={() =>
                  document.querySelector('input[type="file"]').click()
                }
              >
                Browse
              </button>
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,.gif,.mp4,.pdf,.psd,.ai,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              multiple
            />
            <p className="text-gray-500 mt-2">
              Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
            </p>
          </div>
          <div className="">
            {selectedFiles.length > 0 && (
              <div className="flex flex-col gap-4">
                <p className="text-[#676767]">
                  Uploading - {selectedFiles.length}/{selectedFiles.length}{" "}
                  files
                </p>
                <ul className="flex flex-col gap-2">
                  {selectedFiles.map((file, index) => {
                    const supportedFormats = [
                      "pdf",
                      "docx",
                      "xlsx",
                      "png",
                      "jpeg",
                      "gif",
                      "mp4",
                      "pdf",
                      "psd",
                      "ai",
                      "word",
                      "ppt",
                    ];
                    const fileExtension = file.name
                      .split(".")
                      .pop()
                      .toLowerCase();
                    if (!supportedFormats.includes(fileExtension)) {
                      return (
                        <li
                          key={index}
                          className="flex justify-between items-center font-semibold border-2 border-[#E41D1D]  py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[445px]"
                        >
                          <div className="w-[90%] flex flex-col gap-1 justify-start items-start">
                            {file.name}
                            <span className="ml-2 text-[#E41D1D] text-xs font-normal">
                              This document is not supported
                            </span>
                          </div>
                          <div className="w-[10%] text-[#E41D1D] hover:text-[#B58A5F]">
                            <Icon
                              icon="carbon:close-filled"
                              className="cursor-pointer"
                              style={{ fontSize: 24 }}
                              onClick={() => {
                                const newSelectedFiles = selectedFiles.filter(
                                  (f) => f !== file
                                );
                                setSelectedFiles(newSelectedFiles);
                                delete progress[file.name];
                              }}
                            />
                          </div>
                        </li>
                      );
                    } else {
                      return (
                        <li
                          key={index}
                          className="flex justify-between items-center gap font-bold border-2 border-[#E3E3E3]  py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[445px] gap-2"
                        >
                          <div className="w-[90%] flex flex-col gap-2">
                            {file.name}
                            <div
                              className="h-1 w-full bg-gray-200 rounded-full"
                              style={{
                                overflow: "hidden",
                                position: "relative",
                              }}
                            >
                              <div
                                className="h-1 bg-[#B58A5F] rounded-full"
                                style={{
                                  width: `${progress[file.name]}%`,
                                }}
                              ></div>
                            </div>
                            {progress[file.name] === 100 && (
                              <span className="ml-2 text-[#11AF22] text-xs font-normal">
                                Uploaded
                              </span>
                            )}
                          </div>
                          <div className="w-[10%] text-[color:#E6E6E6] hover:text-[#B58A5F]">
                            <Icon
                              icon="carbon:close-filled"
                              className="cursor-pointer"
                              style={{ fontSize: 24 }}
                              onClick={() => {
                                const newSelectedFiles = selectedFiles.filter(
                                  (f) => f !== file
                                );
                                setSelectedFiles(newSelectedFiles);
                                delete progress[file.name];
                              }}
                            />
                          </div>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            )}

            {uploadedFiles.length > 0 && (
              <div className="flex flex-col gap-4">
                <p className="text-[#676767]">Uploaded files</p>
                <ul className="flex flex-col gap-2">
                  {uploadedFiles.map((file, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center font-semibold border-2 border-[#11AF22]  py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[445px]"
                    >
                      <div className="w-[90%] flex flex-col gap-1 justify-start items-start">
                        {file.name}
                        <span className="ml-2 text-[#11AF22] text-xs font-normal">
                          Uploaded
                        </span>
                      </div>
                      <div className="w-[10%] text-[#11AF22] hover:text-[#B58A5F]">
                        <Icon
                          icon="heroicons:trash"
                          className="cursor-pointer"
                          style={{ fontSize: 24 }}
                          onClick={() => {
                            const newUploadedFiles = uploadedFiles.filter(
                              (f) => f !== file
                            );
                            setUploadedFiles(newUploadedFiles);
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <Link to="/all">
            <button
              className="mt-6 bg-[#B58A5F] hover:bg-[#cea67f] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[445px]"
              // onClick={handleUploadClick}
            >
              UPLOAD FILES
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UploadStudent;
