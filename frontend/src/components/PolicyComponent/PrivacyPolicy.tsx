import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
        
        <div className="space-y-8 bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
              Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              We collect information that you provide directly to us, including but not limited to:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Name and contact information
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Property preferences
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Account credentials
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Communication preferences
              </li>
            </ul>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
              How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">
              We use the collected information to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Service Provision</h3>
                <p className="text-gray-700">Provide and maintain our services</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Property Inquiries</h3>
                <p className="text-gray-700">Process your property inquiries</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Property Listings</h3>
                <p className="text-gray-700">Send you relevant property listings</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Service Improvement</h3>
                <p className="text-gray-700">Improve our services</p>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">3</span>
              Information Sharing
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell or rent your personal information to third parties. We may share your information with:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <p className="font-medium text-gray-900">Service Providers</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="font-medium text-gray-900">Real Estate Agents</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="font-medium text-gray-900">Legal Authorities</p>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">4</span>
              Data Security
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">5</span>
              Your Rights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Access your personal information',
                'Correct inaccurate information',
                'Request deletion of your information',
                'Opt-out of marketing communications'
              ].map((right, index) => (
                <div key={index} className="flex items-center bg-gray-50 p-4 rounded-lg">
                  <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{right}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">6</span>
              Contact Us
            </h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">privacy@realestate.com</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">(555) 123-4567</span>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">7</span>
              Updates to This Policy
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
