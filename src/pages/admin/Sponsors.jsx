import { useState, useEffect } from "react";
import images from "../../utils/images";
import useGet from "../../hooks/useGet";
import { useUser } from "../../contexts/UserContext";
import { useModal } from "../../contexts/ModalContext";
import Button from "../../components/core/Button";
import AddManySponsors from "../../components/sponsors/AddManySponsors";
import ASponsor from "../../components/sponsors/ASponsor";
import { deleteAllSponsors } from "../../utils/funcs/sponsors";

const Sponsors = () => {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteAllLoading, setDeleteAllLoading] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("");
  const { openModal, closeModal } = useModal();
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
  } = useGet("/sponsors", {
    params: {
      search: debouncedSearchTerm,
      page: currentPage,
      limit: itemsPerPage,
      ...(selectedProvince && { province: selectedProvince })
    }
  }, currentPage, itemsPerPage);

  const sponsors = response?.data || [];
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

  const handleDeleteAll = () => {
    openModal(
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Delete All Sponsors</h3>
        <p className="mb-4">
          Are you sure you want to delete all sponsors? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={closeModal} disabled={deleteAllLoading}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              setDeleteAllLoading(true);
              await deleteAllSponsors(() => {
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
          Sponsors
        </h1>
        <div className="flex flex-col-reverse md:flex-row items-center gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search sponsors..."
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
            {sponsors && sponsors.length > 0 && (
              <Button
                variant="danger"
                onClick={handleDeleteAll}
              >
                Delete All
              </Button>
            )}
            <Button
              variant="primary"
              onClick={() =>
                openModal(
                  <AddManySponsors
                    onClose={() => {
                      closeModal();
                      refetch();
                    }}
                  />
                )
              }
            >
              Add New Sponsors
            </Button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-center">
          <p>Loading sponsors...</p>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500">
          <p>Error loading sponsors: {error.message}</p>
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
          {sponsors && sponsors.length === 0 ? (
            <div className="text-center flex flex-col items-center h-[300px] justify-center space-y-5">
              <img src={images.no_data} alt="" className="w-[300px]" />
              <p>No sponsors found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {sponsors?.map((sponsor) => (
                  <ASponsor 
                    key={sponsor.id} 
                    sponsor={sponsor} 
                    onUpdate={refetch}
                  />
                ))}
              </div>
              
              {/* Simple pagination controls */}
              {pagination && pagination.pages > 1 && (
                <div className="flex justify-center items-center mt-6 space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  <span className="px-4 py-2 text-sm text-gray-600">
                    Page {currentPage} of {pagination.pages}
                  </span>
                  
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              )}
              
              {pagination && (
                <div className="text-center mt-2 text-sm text-gray-600">
                  Showing {sponsors.length} of {pagination.total} sponsors
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sponsors;
