import { useEffect, useState } from "react";
import images from "../../utils/images";
import useGet from "../../hooks/useGet";
import { useUser } from "../../contexts/UserContext";
import { useModal } from "../../contexts/ModalContext";
import Button from "../../components/core/Button";
import AddManyStudents from "../../components/students/AddManyStudents";
import AStudent from "../../components/students/AStudent";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../components/core/Pagination";

const Students = () => {
  const { user } = useUser();
  const {
    data: students,
    loading,
    error,
    refetch,
  } = useGet(user.role === "Admin" ? "/students" : "/students/my-province");
  const { openModal, closeModal } = useModal();
  const [params] = useSearchParams();
  const [filter, setFilter] = useState(
    params.get("chapter") ? params.get("chapter") : "ALL"
  );
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filtering = () => {
      setFilteredData(
        students?.filter((student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          filter === "ALL"
            ? student.iLeadChapter
            : student.iLeadChapter === filter
        )
      );
    };
    filtering();
  }, [searchTerm, filter, students]);

  const filteredStudents =
    students?.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="px-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold  text-center text-primary">
          Students
        </h1>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder={`Search students`}
            className="px-4 py-1.5 rounded-2xl  text-sm border-primary border outline-none "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button
            variant="primary"
            onClick={() =>
              openModal(
                <AddManyStudents
                  onClose={() => {
                    closeModal();
                    refetch();
                  }}
                />
              )
            }
          >
            Add New Students
          </Button>
        </div>
      </div>
      {loading && (
        <div className="text-center">
          <p>Loading students...</p>
        </div>
      )}

      {error && (
        <div className="text-center text-red-500">
          <p>Error loading students: {error.message}</p>
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
          <div className="flex items-center justify-end gap-2">
            <p className="text-xs text-gray-700">Filter By Chapter</p>
            <select
              className="px-2 py-1.5 rounded-2xl border-primary border text-sm"
              onChange={(e) => {
                setFilter(e.target.value);
              }}
              value={filter}
            >
              <option value="ALL">All</option>
              <option value="ICHOOSE">I CHOOSE</option>
              <option value="ILEAD">I LEAD</option>
              <option value="IDO">I DO</option>
            </select>
          </div>
          {filteredData && filteredData?.length === 0 ? (
            <div className="text-center flex flex-col items-center h-[300px] justify-center space-y-5">
              <img src={images.no_data} alt="" className="w-[300px]" />
              <p>No students found.</p>
            </div>
          ) : (
            <Pagination
              itemsPerPage={12}
              totalItems={filteredData?.length}
              columns={4}
            >
              {filteredData?.map((item) => (
                <AStudent key={item.id} student={item} />
              ))}
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default Students;
