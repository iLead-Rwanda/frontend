import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { unauthorizedApi } from "../utils/api";
import Certificate from "../components/certificates/Certificate";

const ViewOneCertificate = () => {
  const { id } = useParams();
  const [certificate, setCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const response = await unauthorizedApi.get(`/certificates/one/${id}`);
        setCertificate(response.data);
      } catch (err) {
        setError("Failed to fetch certificate.");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#B58A5F] text-white text-xl">
        Loading certificate...
      </div>
    );
  }

  if (error || !certificate) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#B58A5F] text-white text-xl">
        {error || "Certificate not found."}
      </div>
    );
  }

  const item = certificate;

  return (
    <div className="min-h-screen bg-[#B58A5F] py-12 px-4 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl font-semibold mb-6">
          This certificate is a valid certificate which{" "}
          <span className="font-bold">ILead Program Rwanda</span> gave to{" "}
          <span className="underline">{item.student.name}</span>.
        </h1>

        <div className="bg-white rounded-2xl shadow-lg p-4 mt-8">
          <Certificate
            key={item.id}
            id={id}
            name={item.student.name}
            type={item.student.iLeadChapter}
            date={item.generatedAt}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewOneCertificate;
