import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import * as Pdfjs from "pdfjs-dist";
import Button from "../core/Button";
import { DownloadIcon } from "../core/icons";
import { downloadCertificateForStudent } from "../../utils/funcs/certificates";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";

Pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${Pdfjs.version}/build/pdf.worker.min.mjs`;

const Certificate = ({ id, name, type, date }) => {
  const [pdfImage, setPdfImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fillFormAndRenderPage = async () => {
      try {
        const formUrls = {
          IDO: "/iDoCertificate.pdf",
          ICHOOSE: "/iChooseCertificate.pdf",
          ILEAD: "/iLeadCertificate.pdf",
        };
        const formUrl = formUrls[type];
        if (!formUrl) {
          throw new Error("Invalid type provided");
        }

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
        dateField.setText(`On ${new Date(date).toLocaleDateString()}`);

        const font = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);
        nameField1.defaultUpdateAppearances(font);
        nameField2.defaultUpdateAppearances(font);
        dateField.defaultUpdateAppearances(font);

        const qrUrl = `${window.location.origin}/certificates/${id}`;
        const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1 });

        const page = pdfDoc.getPages()[0];
        const qrImageBytes = await fetch(qrDataUrl).then((res) =>
          res.arrayBuffer()
        );
        const qrImage = await pdfDoc.embedPng(qrImageBytes);

        const { width, height } = page.getSize();
        const qrWidth = 120;
        const qrHeight = 120;

        if (type === "IDO" || type === "ICHOOSE") {
          page.drawImage(qrImage, {
            x: 30,
            y: 30,
            width: qrWidth,
            height: qrHeight,
          });
        } else if (type === "ILEAD") {
          page.drawImage(qrImage, {
            x: (width - qrWidth) / 2,
            y: 150,
            width: qrWidth,
            height: qrHeight,
          });
        }

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

    fillFormAndRenderPage();
  }, [name, type, date, id]);

  return (
    <div className="w-full">
      {isGenerating && !pdfImage ? (
        <div className=" animate-pulse bg-gray-200  rounded-2xl  h-60 w-full"></div>
      ) : (
        <div className="relative">
          <img src={pdfImage} alt={name} className="rounded-2xl" />
          <div className="absolute bottom-0 right-0 p-2 flex gap-2">
            <Button
              variant="primary"
              loading={loading}
              onClick={() => navigate(`/certificate/${id}`)}
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
                await downloadCertificateForStudent(id, name, type, date);
                setLoading(false);
              }}
            >
              <div className="text-white">
                <DownloadIcon />
              </div>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

Certificate.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["IDO", "ICHOOSE", "ILEAD"]).isRequired,
};

export default Certificate;
