import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';

export default function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', email: '', mobile: '', address: '', state: '', district: '',
    country: '', dob: '', occupation: '', qualification: '', photo: null,
  });
  const [existingPhoto, setExistingPhoto] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await API.get(`/contacts/${id}`, { withCredentials: true });
        const c = res.data;
        setForm({
          name: c.name || '', email: c.email || '', mobile: c.mobile || '',
          address: c.address || '', state: c.state || '', district: c.district || '',
          country: c.country || '', dob: c.dob ? c.dob.split('T')[0] : '',
          occupation: c.occupation || '', qualification: c.qualification || '', photo: null,
        });
        setExistingPhoto(c.photo || null);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch contact details');
      }
    };
    fetchContact();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.name === 'photo') setForm({ ...form, photo: e.target.files[0] });
    else setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => form[key] && data.append(key, form[key]));

    try {
      await API.patch(`/contacts/${id}`, data, { withCredentials: true });
      toast.success('Contact updated successfully!');
      navigate('/contacts');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-4xl w-full p-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-2 rounded shadow transition"
        >
          &larr; Back
        </button>

        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">Edit Contact</h2>

        {existingPhoto && (
          <div className="flex justify-center mb-4">
            <img
              src={`http://localhost:5000${existingPhoto}`}
              alt={form.name}
              className="w-32 h-32 rounded-full border object-cover shadow-lg"
            />
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition"/>
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition"/>
          <input type="text" name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition"/>
          <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition"/>
          <input type="text" name="state" placeholder="State" value={form.state} onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition"/>
          <input type="text" name="district" placeholder="District" value={form.district} onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition"/>
          <input type="text" name="country" placeholder="Country" value={form.country} onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition"/>
          <input type="date" name="dob" value={form.dob} onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition"/>
          <input type="text" name="occupation" placeholder="Occupation" value={form.occupation} onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition"/>
          <input type="text" name="qualification" placeholder="Qualification" value={form.qualification} onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition"/>

          <div className="md:col-span-2">
            <label className="block mb-2 font-medium text-gray-700">Upload Photo</label>
            <input type="file" name="photo" onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-400 outline-none transition"/>
          </div>

          <button type="submit"
            className="md:col-span-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 rounded-lg shadow-lg font-semibold transition">
            Update Contact
          </button>
        </form>
      </div>
    </div>
  );
}
