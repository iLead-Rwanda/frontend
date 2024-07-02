import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGet from "../../hooks/useGet";
import { FolderIcon, UploadIcon } from "../../components/core/icons";

const Schools = () => {
  const [search, setSearch] = useState("");
  const [filteredSchools, setFilteredSchools] = useState([]);
  const { data: schools, loading, error } = useGet("/schools/my-province");

  console.log(schools);

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
      <div className="flex items-center justify-between">
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

      <div className="grid grid-cols-3 gap-5">
        {filteredSchools?.map((school) => (
          <div
            key={school.id}
            className="bg-white  rounded-3xl border-primary border"
          >
            <div className="flex items-center justify-between">
              <div
                className="text-xs bg-primary text-white rounded-br-2xl rounded-tl-2xl  p-2 cursor-pointer"
                onClick={() =>
                  navigate(`/schools/${school.name}/${school.id}/certificates`)
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
                  navigate(`/schools/${school.name}/${school.id}/students`)
                }
              >
                <p>View Students</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schools;
