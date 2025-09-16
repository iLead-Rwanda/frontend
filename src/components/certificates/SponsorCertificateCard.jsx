import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../core/Button";
import { downloadSponsorCertificate } from "../../utils/funcs/sponsors";

const SponsorCertificateCard = ({ id, name, date }) => {
  const navigate = useNavigate();

  const handleView = () => {
    navigate(`/sponsor-certificate/${id}`);
  };

  const handleDownload = async () => {
    try {
      await downloadSponsorCertificate(id, name, date);
    } catch (error) {
      console.error("Error downloading certificate:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="text-center">
        {/* Certificate Icon */}
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Sponsor Name */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
          {name || "Unknown Sponsor"}
        </h3>

        {/* Certificate Date */}
        <p className="text-sm text-gray-600 mb-4">
          Generated: {new Date(date).toLocaleDateString()}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-center">
          <Button
            variant="primary"
            size="sm"
            onClick={handleView}
            className="flex-1"
          >
            View
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownload}
            className="flex-1"
          >
            Download
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SponsorCertificateCard;
