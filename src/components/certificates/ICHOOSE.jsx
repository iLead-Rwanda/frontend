import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { PDFDocument, StandardFonts } from "pdf-lib";
import * as Pdfjs from "pdfjs-dist";
import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const ICHOOSE = ({ name, date }) => {
  const [pdfImage, setPdfImage] = useState(null);

  useEffect(() => {
    const fillFormAndRenderPage = async () => {
      try {
        const formUrl = "/iChooseCertificate.pdf";
        const formPdfBytes = await fetch(formUrl).then((res) =>
          res.arrayBuffer()
        );
        const pdfDoc = await PDFDocument.load(formPdfBytes);

        const form = pdfDoc.getForm();
        const nameField = form.getTextField("name");
        const dateField = form.getTextField("date");

        nameField.setText(name);
        dateField.setText(date);

        // Set font for text fields to Poppins
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        nameField.defaultUpdateAppearances(font);
        dateField.defaultUpdateAppearances(font);

        const pdfBytes = await pdfDoc.save();
        const pdf = await Pdfjs.getDocument({ data: pdfBytes }).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 1.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;

        setPdfImage(canvas.toDataURL());
      } catch (error) {
        console.error("Failed to fill PDF form:", error);
      }
    };

    fillFormAndRenderPage();
  }, [name, date]);

  return <div>{pdfImage && <img src={pdfImage} alt={name} className="rounded-2xl" />}</div>;
};

ICHOOSE.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default ICHOOSE;
