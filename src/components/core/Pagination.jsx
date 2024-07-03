import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const Pagination = ({ totalItems, itemsPerPage, columns, children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Handle click on page number
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle next and previous buttons
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  // Paginate children items
  const paginatedItems = React.Children.toArray(children).slice(
    startIndex,
    endIndex
  );

  useEffect(() => {
    // Reset to the first page when totalItems changes
    setCurrentPage(1);
  }, [totalItems]);

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Adjust this value to show more or fewer pages

    // Calculate the start and end page numbers
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex flex-col items-center mt-4">
      <div className={`grid grid-cols-${columns} gap-6`}>{paginatedItems}</div>
      <div className="flex mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 mr-2 bg-gray-200 rounded-md"
        >
          Previous
        </button>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageClick(page)}
            className={`px-3 py-1 mx-1 rounded-md ${
              currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 ml-2 bg-gray-200 rounded-md"
        >
          Next
        </button>
      </div>
      <div className="mt-2">
        Showing items {startIndex + 1} to {endIndex} of {totalItems}
      </div>
    </div>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  columns: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default Pagination;
