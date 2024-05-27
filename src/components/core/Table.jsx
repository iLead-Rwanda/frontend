import React, { useState } from "react";

const Table = ({ data, columns, paginate = false, loading = false, filters = [] }) => {
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedFilter, setSelectedFilter] = useState(filters.length > 0 ? filters[0][0].name : "");

  const handleSort = (index) => {
    if (sortBy === index) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(index);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (filterName) => {
    setSelectedFilter(filterName);
  };

  let filteredData = data;
  if (selectedFilter) {
    const filterObj = filters.find((filterArr) =>
      filterArr.some((filter) => filter.name === selectedFilter)
    );
    if (filterObj) {
      const selectedFilterFunction = filterObj.find(
        (filter) => filter.name === selectedFilter
      )?.filterFunction;
      if (selectedFilterFunction) {
        filteredData = data.filter(selectedFilterFunction);
      }
    }
  }

  const sortedData = sortBy !== null
    ? [...filteredData].sort((a, b) => {
        const sortFunction = columns[sortBy].sortFunction;
        if (sortFunction) {
          return sortOrder === "asc" ? sortFunction(a, b) : sortFunction(b, a);
        }
        return 0;
      })
    : filteredData;

  return (
    <div className="w-full">
      <div className="flex justify-end items-center mb-3">
        {filters.length > 0 && (
          <div>
            {filters.map((filterArr, index) => (
              <div key={index}>
                <select
                  className="px-10 py-2 bg-inherit border rounded-md"
                  onChange={(e) => handleFilterChange(e.target.value)}
                >
                  {filterArr.map((filter) => (
                    <option key={filter.name} className="bg-inherit">
                      {filter.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
      <table className="w-full">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                onClick={() => column.sortable && handleSort(index)}
                className="text-left cursor-pointer"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="py-2">
                  {column.accessor(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {paginate && <div>Pagination controls go here</div>}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default Table;
