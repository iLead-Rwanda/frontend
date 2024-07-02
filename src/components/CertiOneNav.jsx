import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import jsPDF from 'jspdf';



const CertiOneNav = () => {
    const handleDownloadCertificate = () => {
        const img = document.getElementById('certificate-img');
        const imgSrc = img.src;
        const pdf = new jsPDF();
        const imgData = imgSrc;
        pdf.addImage(imgData, 'PNG', 0, 0);
        const pdfBlob = pdf.output('blob');
        const filename = 'certificate.pdf';
        const blob = new Blob([pdfBlob], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
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
          onClick={handleDownloadCertificate}
        >
          <Icon icon="mingcute:add-fill"/>
          <p>Download certificate</p>
        </button>
      </div>
    </div>
  );
};

export default CertiOneNav;