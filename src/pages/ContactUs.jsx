import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

export default function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent successfully!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-green-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl mb-8">
            Have questions or feedback? Reach out to us and we’ll get back to you promptly.
          </p>
        </div>
      </section>

      {/* Form & Contact Info */}
      <section className="max-w-5xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="p-2 border rounded w-full mb-4"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="p-2 border rounded w-full mb-4"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            className="p-2 border rounded w-full mb-4 h-32 resize-none"
            required
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
          >
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6 text-gray-700">
          <div className="flex items-center space-x-3">
            <HiMail size={28} className="text-green-600" />
            <span>kumartisura@gmail.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <HiPhone size={28} className="text-green-600" />
            <span>+91 892 093 8332</span>
          </div>
          <div className="flex items-center space-x-3">
            <HiLocationMarker size={28} className="text-green-600" />
            <span>B-902 New Ashok Nagar, New Delhi, India 110096</span>
          </div>
          <p className="text-gray-500">
            We aim to respond to all inquiries within 24 hours.
          </p>
        </div>
      </section>
    </div>
  );
}
