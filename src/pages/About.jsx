import React from 'react';
import { HiUsers, HiCheckCircle, HiShieldCheck } from 'react-icons/hi';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-purple-600 text-white py-20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Contact Manager</h1>
          <p className="text-lg md:text-xl mb-8">
            Contact Manager is designed to help you efficiently manage your personal and professional contacts.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Contact Manager?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
            <HiUsers size={48} className="mx-auto mb-4 text-purple-600" />
            <h3 className="text-xl font-semibold mb-2">Manage Contacts</h3>
            <p className="text-gray-600">
              Keep all your contacts organized in one place and access their details instantly.
            </p>
          </div>

          <div className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
            <HiCheckCircle size={48} className="mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold mb-2">Easy to Use</h3>
            <p className="text-gray-600">
              Simple and intuitive interface to quickly add, edit, or view your contacts anytime.
            </p>
          </div>

          <div className="bg-white rounded shadow p-6 text-center hover:shadow-lg transition">
            <HiShieldCheck size={48} className="mx-auto mb-4 text-blue-600" />
            <h3 className="text-xl font-semibold mb-2">Secure & Reliable</h3>
            <p className="text-gray-600">
              User authentication ensures your contact data remains safe and private.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-purple-50 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Start Managing Your Contacts Today</h2>
          <p className="text-gray-700 mb-8">
            Sign up and experience a better way to organize your contacts efficiently.
          </p>
        </div>
      </section>
    </div>
  );
}
