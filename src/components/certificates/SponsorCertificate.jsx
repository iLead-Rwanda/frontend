import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { PDFDocument, StandardFonts } from "pdf-lib";
import * as Pdfjs from "pdfjs-dist";
import Button from "../core/Button";
import { DownloadIcon } from "../core/icons";
import { downloadSponsorCertificate } from "../../utils/funcs/sponsors";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";

Pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${Pdfjs.version}/build/pdf.worker.min.mjs`;

const SponsorCertificate = ({ id, name, date, isPreview = false }) => {
  const [pdfImage, setPdfImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const generatePreview = async () => {
    if (pdfImage || isGenerating) return; // Don't regenerate if already exists or generating
    
    setIsGenerating(true);
    try {
      const formUrl = "/Sponsor.pdf";
      
      const formPdfBytes = await fetch(formUrl).then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(formPdfBytes);
      const form = pdfDoc.getForm();

      let name1 = name;
      let name2 = "";

      if (name.length > 20) {
        let index = name.slice(0, 30).lastIndexOf(" ");
        name1 = name.slice(0, index);
        name2 = name.slice(index + 1);

        if (name1.length > 20) {
          const name1Index = name1.slice(0, 20).lastIndexOf(" ");
          name2 = name1.slice(name1Index + 1) + " " + name2;
          name1 = name1.slice(0, name1Index);
        }
      }

      const nameField1 = form.getTextField("name1");
      const nameField2 = form.getTextField("name2");
      const dateField = form.getTextField("date");

      nameField1.setText(name1);
      nameField2.setText(name2);
      dateField.setText(`${new Date(date).getDate()}`);

      // Check if text contains Unicode characters
      const hasUnicode = /[^\x00-\x7F]/.test(name1 + name2);
      
      if (hasUnicode) {
        // For Unicode characters, use a font that supports Unicode
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        nameField1.defaultUpdateAppearances(font);
        nameField2.defaultUpdateAppearances(font);
        dateField.defaultUpdateAppearances(font);
      } else {
        // For ASCII characters, use the preferred font
        const font = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);
        nameField1.defaultUpdateAppearances(font);
        nameField2.defaultUpdateAppearances(font);
        dateField.defaultUpdateAppearances(font);
      }

      // QR Code
      const qrUrl = `${window.location.origin}/sponsor-certificate/${id}`;
      const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1 });

      const page = pdfDoc.getPages()[0];
      const qrImageBytes = await fetch(qrDataUrl).then((res) =>
        res.arrayBuffer()
      );
      const qrImage = await pdfDoc.embedPng(qrImageBytes);

      const { width, height } = page.getSize();
      const qrWidth = 50;
      const qrHeight = 50;

      // Position QR code for sponsor certificate
      page.drawImage(qrImage, {
        x: 30,
        y: 30,
        width: qrWidth,
        height: qrHeight,
      });

      form.flatten();

      const newPdfBytes = await pdfDoc.save();
      const pdf = await Pdfjs.getDocument({ data: newPdfBytes }).promise;
      const renderedPage = await pdf.getPage(1);
      const viewport = renderedPage.getViewport({ scale: 1.5 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      await renderedPage.render(renderContext).promise;
      setPdfImage(canvas.toDataURL());
    } catch (error) {
      console.error("Failed to fill PDF form:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShowPreview = () => {
    setShowPreview(true);
    generatePreview();
  };

  const handleHidePreview = () => {
    setShowPreview(false);
  };

  return (
    <div className="w-full">
      {!showPreview ? (
        // Show preview button when preview is not shown
        <div className="flex items-center justify-center h-60 bg-gray-100 rounded-2xl">
          <button
            onClick={handleShowPreview}
            disabled={isGenerating}
            className="px-6 py-3 bg-[#B58A5F] hover:bg-[#8B6F47] text-white font-semibold rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Generating...
              </>
            ) : (
              <>
                <Eye className="w-4 h-4" />
                Show Preview
              </>
            )}
          </button>
        </div>
      ) : (
        // Show preview when toggled
        <div className="relative">
          {isGenerating && !pdfImage ? (
            <div className="animate-pulse bg-gray-200 rounded-2xl h-60 w-full"></div>
          ) : (
            <>
              <img 
                src={pdfImage} 
                alt={name} 
                className={`rounded-2xl ${isPreview ? 'w-full h-auto' : ''}`}
              />
              {!isPreview && (
                <div className="absolute bottom-0 right-0 p-2 flex gap-2">
                  <Button
                    variant="primary"
                    loading={loading}
                    onClick={() => navigate(`/sponsor-certificate/${id}`)}
                  >
                    <div className="text-white">
                      <Eye className="w-5 h-5" />
                    </div>
                  </Button>
                  <Button
                    variant="primary"
                    loading={loading}
                    onClick={async () => {
                      setLoading(true);
                      await downloadSponsorCertificate(id, name, date);
                      setLoading(false);
                    }}
                  >
                    <div className="text-white">
                      <DownloadIcon />
                    </div>
                  </Button>
                </div>
              )}
            </>
          )}
          
          {/* Hide preview button */}
          <button
            onClick={handleHidePreview}
            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors duration-200"
            title="Hide Preview"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

SponsorCertificate.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isPreview: PropTypes.bool,
};

export default SponsorCertificate;
