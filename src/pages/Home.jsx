import React from 'react';
import { Link } from 'react-router-dom';
import { HiUserAdd, HiClipboardList, HiPhotograph } from 'react-icons/hi';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Manage Your Contacts Effortlessly
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Keep all your personal and professional contacts organized in one place. Add, edit, and view details with ease.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/contacts"
              className="bg-white text-blue-600 px-6 py-3 rounded shadow font-semibold hover:bg-gray-100 transition"
            >
              View Contacts
            </Link>
            <Link
              to="/contacts/create"
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded shadow font-semibold transition"
            >
              Add Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
            <HiUserAdd size={48} className="mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">Add Contacts</h3>
            <p className="text-gray-600">
              Quickly add new contacts with full details, including phone, email, address, and profile photo.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
            <HiClipboardList size={48} className="mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold mb-2">Organize & Edit</h3>
            <p className="text-gray-600">
              Edit existing contacts, keep them organized, and never lose track of important information.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
            <HiPhotograph size={48} className="mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold mb-2">Profile Photos</h3>
            <p className="text-gray-600">
              Add profile photos for each contact to easily identify them and personalize your contact list.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Get Started Today!</h2>
          <p className="text-gray-700 mb-8">
            Sign up now and start managing your contacts efficiently. Stay organized and never miss an important connection.
          </p>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded shadow font-semibold hover:bg-blue-700 transition"
          >
            Register Now
          </Link>
        </div>
      </section>
    </div>
  );
}
