import { useState } from "react";
import images from "../../utils/images";
import useGet from "../../hooks/useGet";
import { useUser } from "../../contexts/UserContext";
import { useModal } from "../../contexts/ModalContext";
import Button from "../../components/core/Button";
import AddManyStudents from "../../components/students/AddManyStudents";

const Students = () => {
  const { user } = useUser();
  const {
    data: students,
    loading,
    error,
    refetch,
  } = useGet(user.role === "Admin" ? "/students" : "/students/my-province");
  const [searchTerm, setSearchTerm] = useState("");
  const { openModal, closeModal } = useModal();

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredStudents =
    students?.filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="px-6">
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

      {!loading && !error && filteredStudents.length === 0 && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold  text-center text-primary">
              Students
            </h1>
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
          <div className="text-center flex flex-col items-center h-[300px] justify-center space-y-5">
            <img src={images.no_data} alt="" className="w-[300px]" />
            <p>No students found.</p>
          </div>
        </>
      )}

      {!loading && !error && filteredStudents.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold mb-6 text-center text-primary">
              Students
            </h1>
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={handleSearch}
              className="p-2 mb-6 border-2 border-gray-300 rounded-2xl outline-none text-sm"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredStudents.map((student, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 flex flex-col items-center space-y-4"
              >
                <img src={images.bronze} alt="" className="w-10" />
                <p className="text-2xl text-gray-500">{student.level}</p>
                <img
                  src={
                    student.gender === "male"
                      ? "/images/male.png"
                      : "/images/female.png"
                  }
                  alt="Student"
                  className="w-20 h-20 rounded-full mx-auto mb-4"
                />
                <h2 className="font-semibold text-gray-700">{student.name}</h2>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Students;
