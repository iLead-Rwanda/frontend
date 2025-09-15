import { useEffect, useState } from "react";
import images from "../../utils/images";
import useGet from "../../hooks/useGet";
import { useUser } from "../../contexts/UserContext";
import { useModal } from "../../contexts/ModalContext";
import Button from "../../components/core/Button";
import AddManySponsors from "../../components/sponsors/AddManySponsors";
import ASponsor from "../../components/sponsors/ASponsor";
import Pagination from "../../components/core/Pagination";
import { deleteAllSponsors } from "../../utils/funcs/sponsors";

const Sponsors = () => {
  const { user } = useUser();
  const {
    data: sponsors,
    loading,
    error,
    refetch,
  } = useGet("/sponsors");
  const { openModal, closeModal } = useModal();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSponsors, setFilteredSponsors] = useState([]);

  useEffect(() => {
    if (sponsors) {
      const filtered = sponsors.filter((sponsor) =>
        sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sponsor.school?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSponsors(filtered);
    }
  }, [searchTerm, sponsors]);

  const handleDeleteAll = () => {
    openModal(
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-4">Delete All Sponsors</h3>
        <p className="mb-4">
          Are you sure you want to delete all sponsors? This action cannot be undone.
        </p>
        <div className="flex justify-end space-x-2">
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={async () => {
              await deleteAllSponsors(() => {
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
          Sponsors
        </h1>
        <div className="flex flex-col-reverse md:flex-row items-center gap-2">
          <input
            type="text"
            placeholder="Search sponsors..."
            className="px-4 py-1.5 rounded-2xl text-sm border-primary border outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
          {filteredSponsors && filteredSponsors.length === 0 ? (
            <div className="text-center flex flex-col items-center h-[300px] justify-center space-y-5">
              <img src={images.no_data} alt="" className="w-[300px]" />
              <p>No sponsors found.</p>
            </div>
          ) : (
            <Pagination
              itemsPerPage={12}
              totalItems={filteredSponsors?.length || 0}
              columns={{ lg: 4, md: 2, sm: 1 }}
            >
              {filteredSponsors?.map((sponsor) => (
                <ASponsor 
                  key={sponsor.id} 
                  sponsor={sponsor} 
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

export default Sponsors;
