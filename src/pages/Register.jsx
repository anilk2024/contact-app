import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import API from '../api/axios';
import { toast } from 'react-toastify';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', mobile: '',
    address: '', state: '', district: '', country: '', dob: '', photo: null
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    if (e.target.name === 'photo') setForm({ ...form, photo: e.target.files[0] });
    else setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => form[key] && data.append(key, form[key]));

    try {
      await API.post('/auth/register', data, { withCredentials: true });
      toast.success('Registration successful! Please log in.');
      navigate('/contacts');
    } catch (err) {      
      setErrors(err.response?.data?.errors || [{ msg: err.response?.data?.message }]);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-teal-400 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Register</h2>

        {/* Error Messages */}
        {errors.map((err, i) => <p key={i} className="text-red-500">{err.msg}</p>)}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"/>
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"/>
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"/>
          <input name="mobile" placeholder="Mobile" value={form.mobile} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"/>
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"/>
          <input name="state" placeholder="State" value={form.state} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"/>
          <input name="district" placeholder="District" value={form.district} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"/>
          <input name="country" placeholder="Country" value={form.country} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"/>
          <input type="date" name="dob" value={form.dob} onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"/>
          <input type="file" name="photo" onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none transition"/>

          <button type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white py-3 rounded-lg shadow-lg font-semibold transition">
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-gray-700">
          Already have an account? <span className="text-blue-600 font-medium"><Link to="/login">Login</Link></span>
        </p>
      </div>
    </div>
  );
}
