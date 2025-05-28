import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import useGet from "../../hooks/useGet";
import AStudent from "../../components/students/AStudent";
import ICHOOSE from "../../components/certificates/Certificate";
import Button from "../../components/core/Button";
import {
  downloadCertificatesForSchool,
  generateSchoolCertificates,
  generateStudentCertificates,
} from "../../utils/funcs/certificates";
import Pagination from "../../components/core/Pagination";
import { useModal } from "../../contexts/ModalContext";
import AddManyStudents from "../../components/students/AddManyStudents";

const SchoolStudentsCertificates = () => {
  const { school, schoolId, type } = useParams();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: studentsOrCertificates,
    loading: studentsLoading,
    error,
    refetch,
  } = useGet(
    `/${type === "students" ? "students" : "certificates"}/${
      type == "students" ? "" : "school/"
    }${schoolId}`
  );

  const filteredData =
    studentsOrCertificates &&
    studentsOrCertificates.filter((item) =>
      type === "students"
        ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
        : item.student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const { openModal, closeModal } = useModal();

  return (
    <div className="">
      <div className="flex flex-col md:flex-row items-center justify-between mb-2">
        <p className="text-xl font-bold text-primary">
          <Link to={`/schools`}>{school}</Link> /{" "}
          <span className="text-gray-700">
            {type === "students" ? "Students" : "Certificates"}
          </span>
        </p>
        <div className="flex flex-col-reverse md:flex-row  items-center gap-2">
          <input
            type="text"
            placeholder={`Search ${
              type === "students" ? "Students" : "Certificates"
            }`}
            className="px-4 py-1.5 rounded-2xl  text-sm border-primary border outline-none "
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {type === "students" ? (
            <>
              <Button
                variant="secondary"
                className={"text-xs"}
                loading={loading}
                onClick={async () => {
                  openModal(
                    <AddManyStudents
                      schoolId={schoolId}
                      onClose={() => {
                        closeModal();
                        refetch();
                      }}
                    />
                  );
                }}
              >
                Add student
              </Button>
              <Button
                variant="primary"
                className={"text-xs"}
                loading={loading}
                onClick={async () => {
                  setLoading(true);
                  await generateSchoolCertificates(schoolId);
                  setLoading(false);
                }}
              >
                Generate All Certificates{" "}
              </Button>
            </>
          ) : (
            <Button
              variant="primary"
              className={"text-xs"}
              loading={loading}
              disabled={
                !studentsOrCertificates ||
                !filteredData ||
                filteredData.length === 0 ||
                studentsOrCertificates.length === 0
              }
              onClick={async () => {
                setLoading(true);
                const certificates = filteredData.map((certificate) => ({
                  id: certificate.id,
                  name: certificate.student.name,
                  date: certificate.generatedAt,
                  iLeadChapter: certificate.student.iLeadChapter,
                }));
                await downloadCertificatesForSchool(certificates, school);
                setLoading(false);
              }}
            >
              Download All Certificates{" "}
            </Button>
          )}
        </div>
      </div>

      {studentsLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      {!loading && !error && (
        <>
          {filteredData && filteredData?.length === 0 && (
            <p className="text-gray-500">
              No {type} found matching your search.
            </p>
          )}
          <Pagination
            itemsPerPage={12}
            totalItems={filteredData?.length}
            columns={{ lg: 4, md: 2, sm: 1 }}
          >
            {filteredData?.map((item) =>
              type === "students" ? (
                <AStudent
                  key={item.id}
                  student={item}
                  generateCertificate={async () =>
                    await generateStudentCertificates(item.id)
                  }
                />
              ) : (
                <ICHOOSE
                  key={item.id}
                  id={item.id}
                  name={item.student.name}
                  type={item.student.iLeadChapter}
                  date={item.generatedAt}
                />
              )
            )}
          </Pagination>
        </>
      )}
    </div>
  );
};

export default SchoolStudentsCertificates;
