import toast from "react-hot-toast";
import { authorizedApi } from "../api";
import { PDFDocument, StandardFonts } from "pdf-lib";
import JSZip from "jszip";
import QRCode from "qrcode";

// Create a single sponsor
export const addSingleSponsor = async (data, callback) => {
  try {
    await authorizedApi.post("/sponsors", data);
    toast.success("Sponsor added successfully!");
    if (callback) callback();
  } catch (error) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Failed to add sponsor.");
    }
    console.error("Error adding sponsor:", error);
    if (callback) callback(); // Call callback even on error to close modal
  }
};

// Create multiple sponsors
export const addManySponsors = async (data, callback) => {
  try {
    await authorizedApi.post("/sponsors/bulk", data);
    toast.success("Sponsors added successfully!");
    if (callback) callback();
  } catch (error) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Failed to create sponsors.");
    }
    console.error("Error adding sponsors:", error);
    if (callback) callback(); // Call callback even on error to close modal
  }
};

// Update a sponsor
export const updateSponsor = async (id, data, callback) => {
  try {
    await authorizedApi.patch(`/sponsors/${id}`, data);
    toast.success("Sponsor updated successfully!");
    if (callback) callback();
  } catch (error) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Failed to update sponsor.");
    }
    console.error("Error updating sponsor:", error);
  }
};

// Delete a sponsor
export const deleteSponsor = async (id, callback) => {
  try {
    await authorizedApi.delete(`/sponsors/${id}`);
    toast.success("Sponsor deleted successfully!");
    if (callback) callback();
  } catch (error) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Failed to delete sponsor.");
    }
    console.error("Error deleting sponsor:", error);
  }
};

// Delete all sponsors
export const deleteAllSponsors = async (callback) => {
  try {
    await authorizedApi.delete("/sponsors");
    toast.success("All sponsors deleted successfully!");
    if (callback) callback();
  } catch (error) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Failed to delete all sponsors.");
    }
    console.error("Error deleting all sponsors:", error);
  }
};

// Generate certificates for sponsors
export const generateSponsorCertificates = async (sponsorIds, callback) => {
  try {
    await authorizedApi.post("/sponsors/certificates/generate", { sponsorIds });
    toast.success("Certificates generated successfully!");
    if (callback) callback();
  } catch (error) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Failed to generate certificates.");
    }
    console.error("Error generating certificates:", error);
  }
};

// Delete certificates for a specific sponsor
export const deleteSponsorCertificates = async (sponsorId, callback) => {
  try {
    await authorizedApi.delete(`/sponsors/certificates/${sponsorId}`);
    toast.success("Certificates deleted successfully!");
    if (callback) callback();
  } catch (error) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Failed to delete certificates.");
    }
    console.error("Error deleting certificates:", error);
  }
};

// Delete all sponsor certificates
export const deleteAllSponsorCertificates = async (callback) => {
  try {
    await authorizedApi.delete("/sponsors/certificates");
    toast.success("All certificates deleted successfully!");
    if (callback) callback();
  } catch (error) {
    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Failed to delete all certificates.");
    }
    console.error("Error deleting all certificates:", error);
  }
};

// Download individual sponsor certificate
export const downloadSponsorCertificate = async (
  id,
  name,
  date,
  callback
) => {
  try {
    const formUrl = "/Sponsor.pdf";
    
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
    dateField.setText(`${new Date(date).getDate()}`);

    const font = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);
    nameField1.defaultUpdateAppearances(font);
    nameField2.defaultUpdateAppearances(font);
    dateField.defaultUpdateAppearances(font);

    // QR Code
    const qrUrl = `${window.location.origin}/sponsor-certificate/${id}`;
    const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1 });
    const qrImageBytes = await fetch(qrDataUrl).then((res) =>
      res.arrayBuffer()
    );
    const qrImage = await pdfDoc.embedPng(qrImageBytes);

    const page = pdfDoc.getPages()[0];
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
    const blob = new Blob([newPdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${name}_Sponsor_Certificate.pdf`;
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

// Download multiple sponsor certificates as ZIP
export const downloadManySponsorCertificates = async (sponsors, callback) => {
  try {
    const zip = new JSZip();

    for (const sponsor of sponsors) {
      const { id, name, date } = sponsor;
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

      const font = await pdfDoc.embedFont(StandardFonts.TimesRomanBoldItalic);
      nameField1.defaultUpdateAppearances(font);
      nameField2.defaultUpdateAppearances(font);
      dateField.defaultUpdateAppearances(font);

      // QR Code
      const qrUrl = `${window.location.origin}/sponsor-certificate/${id}`;
      const qrDataUrl = await QRCode.toDataURL(qrUrl, { margin: 1 });
      const qrImageBytes = await fetch(qrDataUrl).then((res) =>
        res.arrayBuffer()
      );
      const qrImage = await pdfDoc.embedPng(qrImageBytes);

      const page = pdfDoc.getPages()[0];
      const { width, height } = page.getSize();
      const qrWidth = 50;
      const qrHeight = 50;

      page.drawImage(qrImage, {
        x: 30,
        y: 30,
        width: qrWidth,
        height: qrHeight,
      });

      form.flatten();

      const newPdfBytes = await pdfDoc.save();
      zip.file(
        `${name}_Sponsor_Certificate.pdf`,
        new Blob([newPdfBytes], { type: "application/pdf" })
      );
    }

    const content = await zip.generateAsync({ type: "blob" });
    const zipBlobUrl = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = zipBlobUrl;
    a.download = `Sponsor_Certificates.zip`;
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
