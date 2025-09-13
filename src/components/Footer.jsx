import React from 'react';
import { Link } from 'react-router-dom';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white animate-gradientBG">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Contact Manager</h2>
          <p className="text-gray-100">
            Organize all your contacts in one place. Add, edit, and manage easily.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="hover:scale-105 transition-transform">Home</Link></li>
            <li><Link to="/about" className="hover:scale-105 transition-transform">About</Link></li>
            <li><Link to="/contact-us" className="hover:scale-105 transition-transform">Contact Us</Link></li>
            <li><Link to="/contacts" className="hover:scale-105 transition-transform">My Contacts</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact Info</h3>
          <div className="flex items-center space-x-2 mb-2"><HiMail /> <span>kumartisura@gmail.com</span></div>
          <div className="flex items-center space-x-2 mb-2"><HiPhone /> <span>+91 892 093 8332</span></div>
          <div className="flex items-center space-x-2"><HiLocationMarker /> <span>B-902 New Ashok Nagar, New Delhi, India 110096</span></div>
        </div>
      </div>

      <div className="text-center py-4 text-gray-100">
        &copy; {new Date().getFullYear()} Contact Manager. All rights reserved.
      </div>
    </footer>
  );
}
