import { useEffect, useState } from "react";
import images from "../../utils/images";
import useGet from "../../hooks/useGet";
import { useModal } from "../../contexts/ModalContext";
import Button from "../../components/core/Button";
import Pagination from "../../components/core/Pagination";
import {
  generateSponsorCertificates,
  downloadSponsorCertificate,
  downloadManySponsorCertificates,
  deleteSponsorCertificates,
  deleteAllSponsorCertificates,
} from "../../utils/funcs/sponsors";

const SponsorCertificates = () => {
  const {
    data: certificates,
    loading,
    error,
    refetch,
  } = useGet("/sponsors/certificates");
  const { data: sponsors } = useGet("/sponsors");
  const { openModal, closeModal } = useModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCertificates, setFilteredCertificates] = useState([]);
  const [selectedCertificates, setSelectedCertificates] = useState([]);

  useEffect(() => {
    if (certificates) {
      const filtered = certificates.filter((cert) =>
        cert.sponsor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.sponsor?.school?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCertificates(filtered);
    }
  }, [searchTerm, certificates]);

  const handleGenerateCertificate = () => {
    if (!sponsors || sponsors.length === 0) {
      return;
    }

    openModal(
      <div className="p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Generate Certificates</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Sponsors:
          </label>
          <div className="max-h-60 overflow-y-auto border rounded p-2">
            {sponsors.map((sponsor) => (
              <div key={sponsor.id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`sponsor-${sponsor.id}`}
                  value={sponsor.id}
                  onChange={(e) => {
                    const sponsorId = e.target.value;
                    setSelectedCertificates(prev => 
                      e.target.checked 
                        ? [...prev, sponsorId]
                        : prev.filter(id => id !== sponsorId)
                    );
                  }}
                  className="mr-2"
                />
                <label htmlFor={`sponsor-${sponsor.id}`} className="text-sm">
                  {sponsor.name} - {sponsor.school?.name}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              if (selectedCertificates.length > 0) {
                await generateSponsorCertificates(selectedCertificates, () => {
                  closeModal();
                  refetch();
                  setSelectedCertificates([]);
                });
              }
            }}
            disabled={selectedCertificates.length === 0}
          >
            Generate Certificates
          </Button>
        </div>
      </div>
    );
  };

  const handleDownloadAll = async () => {
    if (filteredCertificates && filteredCertificates.length > 0) {
      const certificatesData = filteredCertificates.map(cert => ({
        id: cert.id,
        name: cert.sponsor?.name,
        date: cert.createdAt
      }));
      await downloadManySponsorCertificates(certificatesData);
    }
  };

  const handleDeleteAll = () => {
    openModal(
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Delete All Certificates</h3>
        <p className="mb-4">
          Are you sure you want to delete all sponsor certificates? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await deleteAllSponsorCertificates(() => {
                closeModal();
                refetch();
              });
            }}
          >
            Delete All
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-center text-primary">
          Sponsor Certificates
        </h1>
        <div className="flex flex-col-reverse md:flex-row items-center gap-2">
          <input
            type="text"
            placeholder="Search certificates..."
            className="px-4 py-1.5 rounded-2xl text-sm border-primary border outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex gap-2">
            {filteredCertificates && filteredCertificates.length > 0 && (
              <>
                <Button
                  variant="secondary"
                  onClick={handleDownloadAll}
                >
                  Download All
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDeleteAll}
                >
                  Delete All
                </Button>
              </>
            )}
            <Button
              variant="primary"
              onClick={handleGenerateCertificate}
            >
              Generate Certificates
            </Button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center">
          <p>Loading certificates...</p>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500">
          <p>Error loading certificates: {error.message}</p>
          <button
            onClick={refetch}
            className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredCertificates && filteredCertificates.length === 0 ? (
            <div className="text-center flex flex-col items-center h-[300px] justify-center space-y-5">
              <img src={images.no_data} alt="" className="w-[300px]" />
              <p>No certificates found.</p>
            </div>
          ) : (
            <Pagination
              itemsPerPage={12}
              totalItems={filteredCertificates?.length || 0}
              columns={{ lg: 4, md: 2, sm: 1 }}
            >
              {filteredCertificates?.map((certificate) => (
                <CertificateCard 
                  key={certificate.id} 
                  certificate={certificate} 
                  onUpdate={refetch}
                />
              ))}
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

const CertificateCard = ({ certificate, onUpdate }) => {
  const { openModal, closeModal } = useModal();

  const handleDownload = async () => {
    await downloadSponsorCertificate(
      certificate.id,
      certificate.sponsor?.name,
      certificate.createdAt
    );
  };

  const handleDelete = () => {
    openModal(
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Delete Certificate</h3>
        <p className="mb-4">
          Are you sure you want to delete the certificate for "{certificate.sponsor?.name}"?
        </p>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await deleteSponsorCertificates(certificate.sponsor?.id, () => {
                closeModal();
                if (onUpdate) onUpdate();
              });
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {certificate.sponsor?.name}
        </h3>
      </div>
      
      <div className="text-sm text-gray-600 mb-3">
        <p><strong>School:</strong> {certificate.sponsor?.school?.name || "N/A"}</p>
        <p><strong>Generated:</strong> {new Date(certificate.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="primary"
          size="sm"
          onClick={handleDownload}
        >
          Download
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default SponsorCertificates;
