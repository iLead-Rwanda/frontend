import React, { useState } from "react";
import useGet from "../hooks/useGet";

const ProvinceSchools = () => {
  const {
    data: provincesData,
    loading: provincesLoading,
    error: provincesError,
  } = useGet("/provinces");

  const {
    data: schoolsData,
    loading: schoolsLoading,
    error: schoolsError,
  } = useGet("/schools");

  const [provinces, setProvinces] = useState(provincesData || []);
  const [schools, setSchools] = useState(schoolsData || []);
  const [newProvinceName, setNewProvinceName] = useState("");
  const [newProvinceAdminName, setNewProvinceAdminName] = useState("");
  const [newProvinceAdminEmail, setNewProvinceAdminEmail] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredProvince, setHoveredProvince] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddProvince = () => {
    // Simulating adding a new province to the list
    const newProvince = {
      name: newProvinceName,
      admin: {
        name: newProvinceAdminName,
        email: newProvinceAdminEmail,
      },
    };
    setProvinces([...provinces, newProvince]);

    setNewProvinceName("");
    setNewProvinceAdminName("");
    setNewProvinceAdminEmail("");
  };

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-primary">Provinces</h1>
      {provincesLoading ? (
        <div className="text-center py-4">Loading provinces...</div>
      ) : provincesError ? (
        <div className="text-center text-red-500 py-4">
          Error loading provinces: {provincesError.message}
        </div>
      ) : provinces.length === 0 ? (
        <div className="text-center py-4">No provinces found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {provinces.map((province, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 relative shadow-md"
              onMouseEnter={() => setHoveredProvince(index)}
              onMouseLeave={() => setHoveredProvince(null)}
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">
                {province.name}
              </h2>
              <p className="text-gray-600">{province.admin.name}</p>
              <p className="text-gray-600 mb-4">{province.admin.email}</p>
              {hoveredProvince === index && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-90 flex justify-around">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded">
                    View
                  </button>
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded">
                    Update
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded">
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-primary mb-6">Schools</h2>
        <input
          type="text"
          placeholder="Search schools..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-2 border-2 border-gray-300 rounded-2xl outline-none text-sm mb-6"
        />
        {schoolsLoading ? (
          <div className="text-center py-4">Loading schools...</div>
        ) : schoolsError ? (
          <div className="text-center text-red-500 py-4">
            Error loading schools: {schoolsError.message}
          </div>
        ) : filteredSchools.length === 0 ? (
          <div className="text-center py-4">No schools found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredSchools.map((school, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 flex flex-col items-center space-y-4 shadow-md"
              >
                <h2 className="font-semibold text-gray-700">{school.name}</h2>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold text-primary mb-6">
          Add New Province
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Province Name"
            value={newProvinceName}
            onChange={(e) => setNewProvinceName(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md outline-none"
          />
          <input
            type="text"
            placeholder="Admin Name"
            value={newProvinceAdminName}
            onChange={(e) => setNewProvinceAdminName(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md outline-none"
          />
          <input
            type="email"
            placeholder="Admin Email"
            value={newProvinceAdminEmail}
            onChange={(e) => setNewProvinceAdminEmail(e.target.value)}
            className="p-2 border-2 border-gray-300 rounded-md outline-none"
          />
        </div>
        <button
          onClick={handleAddProvince}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Province
        </button>
      </div>
    </div>
  );
};

export default ProvinceSchools;
