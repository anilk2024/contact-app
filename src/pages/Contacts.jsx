import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import { toast } from "react-toastify";

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Pagination
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);

  // Delete Confirmation Modal
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/contacts", { withCredentials: true });
      setContacts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter contacts by search
  const filteredContacts = useMemo(() => {
    return contacts.filter((c) =>
      [c.name, c.email, c.mobile]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [contacts, search]);

  // Pagination
  const totalPages = Math.ceil(filteredContacts.length / pageSize);
  const paginatedContacts = filteredContacts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const goToPage = (page) => page >= 1 && page <= totalPages && setCurrentPage(page);

  // Modal Controls
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };
  const closeModal = () => {
    setDeleteId(null);
    setShowModal(false);
  };

  // Confirm Delete
  const confirmDelete = async () => {
    if (!deleteId) return;
    const oldContacts = [...contacts];
    setContacts((prev) => prev.filter((c) => c._id !== deleteId));
    closeModal();
    try {
      await API.delete(`/contacts/${deleteId}`, { withCredentials: true });
      toast.success("Contact deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Delete failed");
      setContacts(oldContacts);
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">My Contacts</h1>

      {/* Search & Add */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded-lg px-4 py-2 w-full sm:w-80 focus:ring-2 focus:ring-blue-400 outline-none transition"
        />
        <Link
          to="/contacts/create"
          className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white px-4 py-2 rounded-lg shadow text-center transition"
        >
          Add Contact
        </Link>
      </div>

      {/* Loading */}
      {loading && <p className="text-center text-gray-500">Loading contacts...</p>}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-3xl shadow-xl">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
            <tr>
              {["Photo", "Name", "Email", "Mobile", "Occupation", "Actions"].map((title) => (
                <th key={title} className="px-6 py-3 text-left text-sm font-semibold uppercase">
                  {title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {!loading && paginatedContacts.length > 0
              ? paginatedContacts.map((c) => (
                  <tr
                    key={c._id}
                    className="hover:bg-blue-50 transition transform hover:scale-[1.01]"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={c.photo ? `http://localhost:5000${c.photo}` : "/default-avatar.png"}
                        alt={c.name}
                        className="w-12 h-12 rounded-full border object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 text-gray-800 font-medium">{c.name}</td>
                    <td className="px-6 py-4 text-gray-600">{c.email}</td>
                    <td className="px-6 py-4 text-gray-600">{c.mobile}</td>
                    <td className="px-6 py-4 text-gray-600">{c.occupation || "--"}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/contacts/${c._id}`}
                          className="bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white px-3 py-1 rounded transition"
                        >
                          Details
                        </Link>
                        <Link
                          to={`/contacts/edit/${c._id}`}
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-3 py-1 rounded transition"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => openDeleteModal(c._id)}
                          className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white px-3 py-1 rounded transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : !loading && (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No contacts found.
                    </td>
                  </tr>
                )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-3 mt-6">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-white hover:bg-gray-100"
            }`}
          >
            Previous
          </button>
          <span className="px-3 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg border ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this contact? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
