import toast from "react-hot-toast";
import { authorizedApi } from "../api";
import { PDFDocument, StandardFonts } from "pdf-lib";
import JSZip from "jszip";

const formUrls = {
  IDO: "/iDoCertificate.pdf",
  ICHOOSE: "/iChooseCertificate.pdf",
  ILEAD: "/iLeadCertificate.pdf",
};

export const generateSchoolCertificates = async (schoolId, callback) => {
  try {
    await authorizedApi.post(`/certificates/school/${schoolId}`);
    toast.success("Certificates generated successfully!");
    if (callback) callback();
  } catch (error) {
    toast.error("Failed to generate certificates.");
    console.error(error);
  }
};

export const generateStudentCertificates = async (studentId, callback) => {
  try {
    await authorizedApi.post(`/certificates/${studentId}`);
    toast.success("Certificate generated successfully!");
    if (callback) callback();
  } catch (error) {
    if (
      error.response.data.message ||
      error.response.data.error ||
      error.response.data.msg
    ) {
      toast.error(
        error.response.data.message ||
          error.response.data.error ||
          error.response.data.msg
      );
    } else {
      toast.error("Failed to generate certificate.");
    }
    console.error(error);
  }
};

export const downloadCertificateForStudent = async (
  name,
  date,
  level,
  callback
) => {
  try {
    const formUrls = {
      IDO: "/iDoCertificate.pdf",
      ICHOOSE: "/iChooseCertificate.pdf",
      ILEAD: "/iLeadCertificate.pdf",
    };

    const formUrl = formUrls[level];
    if (!formUrl) {
      throw new Error("Invalid level provided");
    }

    const formPdfBytes = await fetch(formUrl).then((res) => res.arrayBuffer());
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
    dateField.setText(date);
    const font = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);
    nameField1.defaultUpdateAppearances(font);
    nameField2.defaultUpdateAppearances(font);
    dateField.defaultUpdateAppearances(font);
    form.flatten();
    const newPdfBytes = await pdfDoc.save();
    const blob = new Blob([newPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}_${level}_Certificate.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    if (callback) callback();
  } catch (error) {
    toast.error("Failed to download certificate.");
    console.error(error);
  }
};

export const downloadCertificatesForSchool = async (
  students,
  school,
  callback
) => {
  try {
    const zip = new JSZip();
    const pdfBlobs = {
      IDO: [],
      ICHOOSE: [],
      ILEAD: [],
    };

    for (const student of students) {
      const { name, date, iLeadChapter } = student;
      const formUrls = {
        IDO: "/iDoCertificate.pdf",
        ICHOOSE: "/iChooseCertificate.pdf",
        ILEAD: "/iLeadCertificate.pdf",
      };
      const formUrl = formUrls[iLeadChapter];
      if (!formUrl) {
        throw new Error("Invalid level provided");
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
      dateField.setText(date);
      const font = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);
      nameField1.defaultUpdateAppearances(font);
      nameField2.defaultUpdateAppearances(font);
      dateField.defaultUpdateAppearances(font);
      form.flatten();
      const newPdfBytes = await pdfDoc.save();
      pdfBlobs[iLeadChapter].push({
        name: `${name}_${iLeadChapter}_Certificate.pdf`,
        blob: new Blob([newPdfBytes], { type: "application/pdf" }),
      });
    }

    for (const level in pdfBlobs) {
      if (pdfBlobs[level].length > 0) {
        const folder = zip.folder(level);
        pdfBlobs[level].forEach((pdf) => {
          folder.file(pdf.name, pdf.blob);
        });
      }
    }
    const content = await zip.generateAsync({ type: "blob" });
    const zipBlobUrl = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = zipBlobUrl;
    a.download = `${school}_Certificates.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(zipBlobUrl);
    if (callback) callback();
  } catch (error) {
    toast.error("Failed to download certificates.");
    console.error(error);
  }
};

export const downloadManyCertificates = async (students, callback) => {
  try {
    const zip = new JSZip();
    const pdfBlobs = {
      IDO: [],
      ICHOOSE: [],
      ILEAD: [],
    };

    for (const student of students) {
      const { name, date, iLeadChapter } = student;
      const formUrls = {
        IDO: "/iDoCertificate.pdf",
        ICHOOSE: "/iChooseCertificate.pdf",
        ILEAD: "/iLeadCertificate.pdf",
      };
      const formUrl = formUrls[iLeadChapter];
      if (!formUrl) {
        throw new Error("Invalid level provided");
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
      dateField.setText(date);
      const font = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);
      nameField1.defaultUpdateAppearances(font);
      nameField2.defaultUpdateAppearances(font);
      dateField.defaultUpdateAppearances(font);
      form.flatten();
      const newPdfBytes = await pdfDoc.save();
      pdfBlobs[iLeadChapter].push({
        name: `${name}_${iLeadChapter}_Certificate.pdf`,
        blob: new Blob([newPdfBytes], { type: "application/pdf" }),
      });
    }

    for (const level in pdfBlobs) {
      if (pdfBlobs[level].length > 0) {
        const folder = zip.folder(level);
        pdfBlobs[level].forEach((pdf) => {
          folder.file(pdf.name, pdf.blob);
        });
      }
    }

    const content = await zip.generateAsync({ type: "blob" });
    const zipBlobUrl = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = zipBlobUrl;
    a.download = `Certificates.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(zipBlobUrl);

    if (callback) callback();
  } catch (error) {
    toast.error("Failed to download certificates.");
    console.error(error);
  }
};
