import React, { useState } from "react";
import PropTypes from "prop-types";
import images from "../../utils/images";
import Button from "../core/Button";

const AStudent = ({ student, generateCertificate }) => {
  const [loading, setLoading] = useState(false);

  const handleGenerateCertificate = async () => {
    setLoading(true);
    await generateCertificate();
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col items-center space-y-4">
      <img src={images.bronze} alt="Bronze Medal" className="w-10" />
      <p className="text-2xl text-gray-500">{student.level}</p>
      <img
        src={
          student.gender === "male" ? "/images/male.png" : "/images/female.png"
        }
        alt="Student"
        className="w-20 h-20 rounded-full mx-auto mb-4"
      />
      <p className="font-semibold text-gray-700 text-center">{student.name}</p>
      <p className="text-gray-500 text-center text-sm">
        {student.iLeadChapter}
      </p>
      {generateCertificate && (
        <Button
          variant="secondary"
          loading={loading}
          onClick={handleGenerateCertificate}
          className={"text-xs"}
        >
          Generate Certificate
        </Button>
      )}
    </div>
  );
};

// Prop types validation
AStudent.propTypes = {
  student: PropTypes.shape({
    level: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    iLeadChapter: PropTypes.string.isRequired,
  }).isRequired,
  generateCertificate: PropTypes.func, // Optional function prop for generating certificate
};

export default AStudent;
