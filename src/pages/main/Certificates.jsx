import React, { useEffect, useState } from "react";
import useGet from "../../hooks/useGet";
import Certificate from "../../components/certificates/Certificate";
import Button from "../../components/core/Button";
import { downloadManyCertificates } from "../../utils/funcs/certificates";
import Pagination from "../../components/core/Pagination";
import images from "../../utils/images";
import { useSearchParams } from "react-router-dom";

const Certificates = () => {
  const [loading, setLoading] = useState(false);
  const [params] = useSearchParams();
  const [filter, setFilter] = useState(
    params.get("chapter") ? params.get("chapter") : "ALL"
  );
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: certificates,
    loading: certificatesLoading,
    error,
  } = useGet(`/certificates/my-province`);

  useEffect(() => {
    const filtering = () => {
      setFilteredData(
        certificates?.filter((item) =>
          item.student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          filter === "ALL"
            ? item.student.iLeadChapter
            : item.student.iLeadChapter === filter
        )
      );
    };
    filtering();
  }, [searchTerm, filter, certificates]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="">
      <div className="flex flex-col md:flex-row items-center justify-between mb-2">
        <p className="text-xl font-bold text-primary">All Certificates</p>
        <div className="flex flex-col-reverse md:flex-row  items-center gap-2">
          <input
            type="text"
            placeholder={`Search Certificates`}
            className="px-4 py-1.5 rounded-2xl  text-sm border-primary border outline-none "
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <Button
            variant="primary"
            className={"text-xs"}
            loading={loading}
            disabled={
              !certificates ||
              !filteredData ||
              filteredData.length === 0 ||
              certificates.length === 0
            }
            onClick={async () => {
              setLoading(true);
              const certificates = filteredData.map((certificate) => ({
                id:certificate.id,
                name: certificate.student.name,
                date: new Date().getDay().toString(),
                iLeadChapter: certificate.student.iLeadChapter,
              }));
              await downloadManyCertificates(certificates);
              setLoading(false);
            }}
          >
            Download All Certificates{" "}
          </Button>
        </div>
      </div>
      {certificatesLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

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
              <p>No certificates found.</p>
            </div>
          ) : (
            <Pagination
              itemsPerPage={12}
              totalItems={filteredData?.length}
              columns={{ lg: 4, md: 2, sm: 1 }}
            >
              {filteredData?.map((item) => (
                <Certificate
                  key={item.id}
                  id={item.id}
                  name={item.student.name}
                  type={item.student.iLeadChapter}
                  date={item.generatedAt}
                />
              ))}
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default Certificates;
