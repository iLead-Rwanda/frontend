import React, {useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import JSZip from "jszip";
import { saveAs } from "file-saver";

const CertiNav = () => {
    const [certificates, setCertificates] = useState([]);
  const [zip, setZip] = useState(null);
  useEffect(() => {
    const allCertificates = document.querySelectorAll('.certificate img');
    const certificatesArray = Array.from(allCertificates).map((img) => img.src);
    setCertificates(certificatesArray);
  }, []);
  const handleDownloadAllCertificates = () => {
    const zip = new JSZip();
    certificates.forEach((certificate, index) => {
      const filename = `certificate-${index + 1}.png`;
      zip.file(filename, certificate);
    });
    zip.generateAsync({ type: 'blob' }).then((blob) => {
      saveAs(blob, 'certificates.zip');
    });
  };
  return (
    <div className="flex justify-between items-center">
      <p className="text-lg font-bold">Student's report cards</p>
      <div className="flex">
        <select name="filter" id="filter" className="text-[#85878D] text-sm p-1 rounded-md focus:border-[#B58A5F] focus:border-[0.5px] focus:outline-none focus:shadow-[0_0_5px_rgba(183,138,95,0.5)]">
            <option value="">Add filter</option>
        </select>
        <div className="flex flex-col justify-between items-center gap-48">
          <div className="flex justify-center items-center gap-2">
            <div className="p-2 rounded-md cursor-pointer hover:bg-[#B58A5F] hover:text-[#fceac5]">
              <Icon icon="mingcute:search-line" />
            </div>
            <input
              type="text"
              placeholder="Search from certificates..."
              className="p-1 rounded-md"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3">
      <button
          className="bg-[#B58A5F] hover:bg-[#c5ab91] flex justify-center items-center gap-1 p-1 px-3 text-white rounded-md"
          onClick={handleDownloadAllCertificates}
        >
          <Icon icon="mingcute:add-fill"/>
          <p>Download All certificates</p>
        </button>
      </div>
    </div>
  );
};

export default CertiNav;
