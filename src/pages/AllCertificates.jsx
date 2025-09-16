import React, { useState, useEffect, useCallback } from "react";
import { unauthorizedApi } from "../utils/api";
import { downloadSponsorCertificate } from "../utils/funcs/sponsors";
import SponsorCertificate from "../components/certificates/SponsorCertificate";
import { Search, Download, Calendar, User, MapPin } from "lucide-react";
import toast from "react-hot-toast";

const AllCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState(null);
  const itemsPerPage = 12;

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch certificates with API-based filtering
  const fetchCertificates = useCallback(async () => {
    try {
      setLoading(true);
      const response = await unauthorizedApi.get("/sponsors/certificates", {
        params: {
          search: debouncedSearchTerm,
          page: currentPage,
          limit: itemsPerPage,
        }
      });
      
      setCertificates(response.data.data || []);
      setPagination(response.data.pagination);
    } catch (err) {
      setError("Failed to fetch certificates.");
      console.error("Error fetching certificates:", err);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearchTerm, currentPage, itemsPerPage]);

  // Handle search input
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Download individual certificate
  const handleDownload = async (certificate) => {
    try {
      await downloadSponsorCertificate(
        certificate.id,
        certificate.sponsor?.name,
        certificate.generatedAt || certificate.createdAt
      );
    } catch (err) {
      toast.error("Failed to download certificate.");
      console.error("Error downloading certificate:", err);
    }
  };

  // Fetch certificates when dependencies change
  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#B58A5F] flex items-center justify-center">
        <div className="text-white text-xl">Loading certificates...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#B58A5F] flex items-center justify-center">
        <div className="text-white text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#B58A5F] py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All Sponsor Certificates
          </h1>
          <p className="text-white/80 text-lg md:text-xl">
            Search and download sponsor certificates from ILead Program Rwanda
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by sponsor name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-4 text-lg rounded-2xl border-0 focus:ring-4 focus:ring-white/20 focus:outline-none bg-white/10 backdrop-blur-sm text-white placeholder-white/60"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-white/80 text-lg">
            {pagination?.total || 0} certificate{(pagination?.total || 0) !== 1 ? 's' : ''} found
            {searchTerm && ` for "${searchTerm}"`}
            {pagination && ` (Page ${currentPage} of ${pagination.pages})`}
          </p>
        </div>

        {/* Certificates Grid */}
        {certificates.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-white/60 text-xl">
              {searchTerm ? "No certificates found matching your search." : "No certificates available."}
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {certificates.map((certificate) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  onDownload={handleDownload}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors duration-200"
                  >
                    Previous
                  </button>
                  
                  <div className="flex space-x-1">
                    {Array.from({ length: Math.min(5, pagination.pages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(pagination.pages - 4, currentPage - 2)) + i;
                      if (pageNum > pagination.pages) return null;
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-2 rounded-xl text-sm transition-colors duration-200 ${
                            currentPage === pageNum
                              ? 'bg-white text-[#B58A5F] font-semibold'
                              : 'bg-white/20 hover:bg-white/30 text-white'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pagination.pages}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition-colors duration-200"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Certificate Card Component
const CertificateCard = ({ certificate, onDownload }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Certificate Preview */}
      <div className="p-4 bg-gradient-to-br from-[#B58A5F] to-[#8B6F47]">
        <div className="bg-white rounded-xl p-2">
          <SponsorCertificate
            id={certificate.id}
            name={certificate.sponsor?.name || "Unknown Sponsor"}
            date={certificate.generatedAt || certificate.createdAt}
            isPreview={true}
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        <div className="flex items-center mb-3">
          <User className="w-5 h-5 text-[#B58A5F] mr-2" />
          <h3 className="font-semibold text-gray-800 truncate">
            {certificate.sponsor?.name || "Unknown Sponsor"}
          </h3>
        </div>

        {/* Province */}
        {certificate.sponsor?.province && (
          <div className="flex items-center mb-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span className="capitalize">{certificate.sponsor.province.toLowerCase()}</span>
          </div>
        )}

        <div className="flex items-center mb-4 text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>
            {new Date(certificate.generatedAt || certificate.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Download Button */}
        <button
          onClick={() => onDownload(certificate)}
          className="w-full bg-[#B58A5F] hover:bg-[#8B6F47] text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center group"
        >
          <Download className="w-5 h-5 mr-2 group-hover:animate-bounce" />
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default AllCertificates;
