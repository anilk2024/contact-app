import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';

export default function ContactDetails() {
  const { id } = useParams();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchContact = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/contacts/${id}`, { withCredentials: true });
      setContact(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch contact details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading contact details...</p>;
  }

  if (!contact) {
    return <p className="text-center text-gray-500 mt-10">Contact not found.</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <Link
        to="/contacts"
        className="inline-block mb-6 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white px-5 py-2 rounded-xl shadow-lg transition transform hover:-translate-y-1"
      >
        &larr; Back
      </Link>

      {/* Contact Card */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transition-transform transform hover:scale-105 duration-300">
        {/* Photo Section */}
        <div className="flex-shrink-0 bg-gradient-to-br from-blue-400 to-indigo-500 p-8 flex items-center justify-center">
          <img
            src={contact.photo ? `http://localhost:5000${contact.photo}` : '/default-avatar.png'}
            alt={contact.name}
            className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-xl"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{contact.name}</h1>
            {contact.occupation && (
              <p className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-500 font-semibold mb-4">
                {contact.occupation}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div className="space-y-2">
                <p><strong>Email:</strong> {contact.email}</p>
                <p><strong>Mobile:</strong> {contact.mobile}</p>
                {contact.dob && <p><strong>DOB:</strong> {contact.dob}</p>}
              </div>
              <div className="space-y-2">
                {contact.address && <p><strong>Address:</strong> {contact.address}</p>}
                {contact.state && <p><strong>State:</strong> {contact.state}</p>}
                {contact.district && <p><strong>District:</strong> {contact.district}</p>}
                {contact.country && <p><strong>Country:</strong> {contact.country}</p>}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <Link
              to={`/contacts/edit/${contact._id}`}
              className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white px-5 py-2 rounded-xl shadow-lg transition transform hover:-translate-y-1"
            >
              Edit Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
