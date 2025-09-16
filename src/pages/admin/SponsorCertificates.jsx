import { useState, useEffect, useCallback } from "react";
import images from "../../utils/images";
import useGet from "../../hooks/useGet";
import { useModal } from "../../contexts/ModalContext";
import Button from "../../components/core/Button";
import Pagination from "../../components/core/Pagination";
import SponsorCertificateCard from "../../components/certificates/SponsorCertificateCard";
import { unauthorizedApi } from "../../utils/api";
import toast from "react-hot-toast";
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
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const itemsPerPage = 12;

  const provinces = [
    { value: "", label: "All Provinces" },
    { value: "CENTRAL", label: "Central" },
    { value: "NORTH", label: "North" },
    { value: "SOUTH", label: "South" },
    { value: "WEST", label: "West" },
    { value: "EAST", label: "East" }
  ];

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
      ...(selectedProvince && { province: selectedProvince })
    }
  }, currentPage, itemsPerPage);

  const { openModal, closeModal } = useModal();

  const certificates = response?.data || [];
  const pagination = response?.pagination;

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  const handleDownloadAll = async () => {
    if (!pagination) return;
    
    setDownloadLoading(true);
    try {
      const allCertificates = [];
      const totalPages = pagination.pages;
      
      // Show initial progress
      toast.loading(`Preparing download... (0/${totalPages} pages)`, { id: 'download-progress' });
      
      // Fetch all certificates in chunks
      for (let page = 1; page <= totalPages; page++) {
        const response = await unauthorizedApi.get("/sponsors/certificates", {
          params: {
            search: debouncedSearchTerm,
            page: page,
            limit: itemsPerPage,
            ...(selectedProvince && { province: selectedProvince })
          }
        });
        
        if (response.data?.data) {
          allCertificates.push(...response.data.data);
        }
        
        // Update progress
        toast.loading(`Fetching certificates... (${page}/${totalPages} pages)`, { id: 'download-progress' });
      }
      
      // Show processing message
      toast.loading(`Processing ${allCertificates.length} certificates...`, { id: 'download-progress' });
      
      const certificatesData = allCertificates.map(cert => ({
        id: cert.id,
        name: cert.sponsor?.name,
        date: cert.generatedAt || cert.createdAt
      }));
      
      await downloadManySponsorCertificates(certificatesData);
      toast.dismiss('download-progress');
      toast.success(`Successfully downloaded ${allCertificates.length} certificates!`);
    } catch (error) {
      console.error("Error downloading certificates:", error);
      toast.dismiss('download-progress');
      toast.error("Failed to download certificates");
    } finally {
      setDownloadLoading(false);
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
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search certificates..."
              className="px-4 py-1.5 rounded-2xl text-sm border-primary border outline-none"
              value={searchTerm}
              onChange={handleSearch}
            />
            <select
              value={selectedProvince}
              onChange={handleProvinceChange}
              className="px-4 py-1.5 rounded-2xl text-sm border-primary border outline-none"
            >
              {provinces.map((province) => (
                <option key={province.value} value={province.value}>
                  {province.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            {certificates && certificates.length > 0 && (
              <>
                <Button
                  variant="secondary"
                  onClick={handleDownloadAll}
                  loading={downloadLoading}
                  disabled={downloadLoading}
                >
                  {downloadLoading ? "Downloading..." : "Download All"}
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
          <SponsorCertificateCard
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
