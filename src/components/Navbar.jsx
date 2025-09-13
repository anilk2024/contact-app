import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import API from '../api/axios';
import { toast } from 'react-toastify';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false); // Profile dropdown
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await API.get('/users/profile', { withCredentials: true });
      setUser(res.data);
    } catch (err) {
      console.log(err)
      // 401 means user not logged in
      setUser(null);
    }
  };

  // Initial fetch & on location change
  useEffect(() => {
    fetchProfile();
  }, [location.pathname]);

  // Listen for login/logout events
  useEffect(() => {
    const handleLogin = () => fetchProfile();
    const handleLogout = () => setUser(null);

    window.addEventListener('login', handleLogin);
    window.addEventListener('logout', handleLogout);

    return () => {
      window.removeEventListener('login', handleLogin);
      window.removeEventListener('logout', handleLogout);
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await API.post('/auth/logout', {}, { withCredentials: true });
      setUser(null);
      toast.success('Logged out successfully!');
      window.dispatchEvent(new Event('logout'));
      navigate('/login');
    } catch (err) {
      console.log(err)
      toast.error('Logout failed');
    }
  };

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact Us', path: '/contact-us' },
  ];

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl hover:scale-105 transition-transform duration-300">
            Contact Manager
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`hover:scale-105 transition-transform duration-200 ${
                  location.pathname === link.path ? 'font-semibold underline' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/contacts"
                className={`hover:scale-105 transition-transform duration-200 ${
                  location.pathname.startsWith('/contacts') ? 'font-semibold underline' : ''
                }`}
              >
                My Contacts
              </Link>
            )}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="bg-purple-500 px-3 py-1 rounded hover:bg-purple-700 transition">
                  Login
                </Link>
                <Link to="/register" className="bg-pink-500 px-3 py-1 rounded hover:bg-pink-700 transition">
                  Register
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setOpen(!open)} className="flex items-center space-x-2 focus:outline-none">
                  <img
                    src={user.photo ? `http://localhost:5000${user.photo}` : '/default-avatar.png'}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border object-cover"
                  />
                  <span className="hidden sm:inline">{user.name}</span>
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white rounded shadow-lg z-10 animate-fadeIn">
                    <Link
                      to="/profile"
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 hover:scale-105 transition-transform duration-200"
                    >
                      Update Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:scale-105 transition-transform duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none">
                {mobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Links */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
          <div className="px-4 py-3 space-y-2">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded hover:scale-105 transition-transform duration-200 ${
                  location.pathname === link.path ? 'bg-purple-700 font-semibold' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            {user && (
              <Link
                to="/contacts"
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded hover:scale-105 transition-transform duration-200 ${
                  location.pathname.startsWith('/contacts') ? 'bg-purple-700 font-semibold' : ''
                }`}
              >
                My Contacts
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
