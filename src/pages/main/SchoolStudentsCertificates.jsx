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

const SchoolStudentsCertificates = () => {
  const { school, schoolId, type } = useParams();
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: studentsOrCertificates,
    loading: studentsLoading,
    error,
  } = useGet(
    `/${type === "students" ? "students" : "certificates"}/${schoolId}`
  );

  console.log(studentsOrCertificates);
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

  return (
    <div className="">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xl font-bold text-primary">
          <Link to={`/schools`}>{school}</Link> /{" "}
          <span className="text-gray-700">
            {type === "students" ? "Students" : "Certificates"}
          </span>
        </p>
        <div className="flex items-center gap-2">
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
                const certificates = filteredData.map((certificate) => ({
                  name: certificate.student.name,
                  date: certificate.generatedAt,
                  iLeadChapter: certificate.student.iLeadChapter,
                }));
                await downloadCertificatesForSchool(certificates);
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
            columns={4}
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
                  name={item.student.name}
                  type={item.student.iLeadChapter}
                  date={new Date(item.generatedAt).getDay().toString()}
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
