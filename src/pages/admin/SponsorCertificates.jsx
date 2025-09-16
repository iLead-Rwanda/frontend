import { useState, useEffect } from "react";
import images from "../../utils/images";
import useGet from "../../hooks/useGet";
import { useModal } from "../../contexts/ModalContext";
import Button from "../../components/core/Button";
import Pagination from "../../components/core/Pagination";
import SponsorCertificate from "../../components/certificates/SponsorCertificate";
import {
  downloadManySponsorCertificates,
  deleteSponsorCertificates,
  deleteAllSponsorCertificates,
} from "../../utils/funcs/sponsors";

const SponsorCertificates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteAllLoading, setDeleteAllLoading] = useState(false);
  const itemsPerPage = 12;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    data: response,
    loading,
    error,
    refetch,
  } = useGet("/sponsors/certificates", {
    params: {
      search: debouncedSearchTerm,
      page: currentPage,
      limit: itemsPerPage,
    }
  }, currentPage, itemsPerPage);

  const { openModal, closeModal } = useModal();

  const certificates = response?.data || [];
  const pagination = response?.pagination;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const handleDownloadAll = async () => {
    if (certificates && certificates.length > 0) {
      const certificatesData = certificates.map(cert => ({
        id: cert.id,
        name: cert.sponsor?.name,
        date: cert.generatedAt || cert.createdAt
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
          <Button variant="secondary" onClick={closeModal} disabled={deleteAllLoading}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              setDeleteAllLoading(true);
              await deleteAllSponsorCertificates(() => {
                closeModal();
                refetch();
              });
              setDeleteAllLoading(false);
            }}
            loading={deleteAllLoading}
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
            onChange={handleSearch}
          />
          <div className="flex gap-2">
            {certificates && certificates.length > 0 && (
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
          {certificates && certificates.length === 0 ? (
            <div className="text-center flex flex-col items-center h-[300px] justify-center space-y-5">
              <img src={images.no_data} alt="" className="w-[300px]" />
              <p>No certificates found.</p>
            </div>
          ) : (
            <Pagination
              itemsPerPage={itemsPerPage}
              totalItems={pagination?.total || 0}
              columns={{ lg: 4, md: 2, sm: 1 }}
            >
              {certificates?.map((certificate) => (
                <SponsorCertificate
                  key={certificate.id}
                  id={certificate.id}
                  name={certificate.sponsor?.name || "Unknown Sponsor"}
                  date={certificate.generatedAt || certificate.createdAt}
                />
              ))}
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};


export default SponsorCertificates;
