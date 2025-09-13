import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [form, setForm] = useState({
    name: '', email: '', password: '', mobile: '', address: '',
    state: '', district: '', country: '', dob: '', photo: null,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get('/users/profile', { withCredentials: true });
        setUser(res.data);
        setForm({
          name: res.data.name || '', email: res.data.email || '', password: '',
          mobile: res.data.mobile || '', address: res.data.address || '',
          state: res.data.state || '', district: res.data.district || '',
          country: res.data.country || '', dob: res.data.dob ? res.data.dob.split('T')[0] : '',
          photo: null,
        });
      } catch (err) {
        console.error(err);
        toast.error('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'photo') setForm({ ...form, photo: e.target.files[0] });
    else setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => data.append(key, form[key]));
    try {
      await API.patch('/users/profile', data, { withCredentials: true });
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-red-400 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-lg w-full p-8">
        <button onClick={() => navigate(-1)}
          className="mb-6 bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white px-4 py-2 rounded shadow transition">
          &larr; Back
        </button>

        <h2 className="text-3xl font-bold text-center text-red-600 mb-6">My Profile</h2>

        {user.photo && (
          <div className="flex justify-center mb-4">
            <img src={`http://localhost:5000${user.photo}`} alt={user.name}
              className="w-32 h-32 rounded-full border object-cover shadow-lg" />
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition" />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition" />
          <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="New Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition" />
          <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition" />
          <input name="address" value={form.address} onChange={handleChange} placeholder="Address"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition" />
          <input name="state" value={form.state} onChange={handleChange} placeholder="State"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition" />
          <input name="district" value={form.district} onChange={handleChange} placeholder="District"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition" />
          <input name="country" value={form.country} onChange={handleChange} placeholder="Country"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition" />
          <input type="date" name="dob" value={form.dob} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none transition" />
          <input type="file" name="photo" onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-red-400 outline-none transition" />

          <button type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-3 rounded-lg shadow-lg font-semibold transition">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
}
