import React from "react";
import { useParams } from "react-router-dom";
import useGet from "../../hooks/useGet";
import AStudent from "../../components/students/AStudent";

const SchoolStudentsCertificates = () => {
  const { schoolId, type } = useParams();
  const { data: students, loading, error } = useGet(`/students/${schoolId}`);

  const filteredStudents = students;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">
        {type === "students" ? "Students" : "Certificates"}
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredStudents?.map((student) => (
          <AStudent key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
};

export default SchoolStudentsCertificates;
