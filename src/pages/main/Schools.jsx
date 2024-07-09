import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGet from "../../hooks/useGet";
import { FolderIcon } from "../../components/core/icons";
import images from "../../utils/images";
import Pagination from "../../components/core/Pagination";

const Schools = () => {
  const [search, setSearch] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);
  const { data: schools, loading, error } = useGet("/schools/my-province");


  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    setFilteredSchools(
      schools?.filter((school) =>
        school.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [schools, search]);

  const navigate = useNavigate();

  return (
    <div className="">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-3xl font-bold text-primary">Schools</h1>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          className="p-2  border border-gray-300 rounded-2xl text-sm"
          placeholder="Search for a school..."
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      {!loading && !error && filteredSchools && (
        <>
          {filteredSchools?.length === 0 ? (
            <div className="text-center flex flex-col items-center h-[300px] justify-center space-y-5">
              <img src={images.no_data} alt="" className="w-[300px]" />
              <p>No schools yet .</p>
            </div>
          ) : (
            <Pagination
              itemsPerPage={12}
              totalItems={filteredSchools?.length}
              columns={3}
            >
              {filteredSchools?.map((school) => (
                <div
                  key={school.id}
                  className="bg-white  rounded-3xl border-primary border"
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="text-xs bg-primary text-white rounded-br-2xl rounded-tl-2xl  p-2 cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/schools/${school.name}/${school.id}/certificates`
                        )
                      }
                    >
                      <p>View Certificates</p>
                    </div>
                    <div>
                      <p>{school.students?.length}</p>
                    </div>
                  </div>
                  <div className="p-3 py-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-700 text-xs">School:</p>
                        <p className="text-xl font-bold">{school.name}</p>
                      </div>
                      <FolderIcon />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p>{school.students?.length}</p>
                    </div>
                    <div
                      className="text-xs bg-primary text-white rounded-br-2xl rounded-tl-2xl p-2 cursor-pointer"
                      onClick={() =>
                        navigate(
                          `/schools/${school.name}/${school.id}/students`
                        )
                      }
                    >
                      <p>View Students</p>
                    </div>
                  </div>
                </div>
              ))}
            </Pagination>
          )}
        </>
      )}
    </div>
  );
};

export default Schools;
