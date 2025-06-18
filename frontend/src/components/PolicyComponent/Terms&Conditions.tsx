import React from 'react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg text-gray-600">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
        
        <div className="space-y-8 bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
              Acceptance of Terms
            </h2>
            <p className="text-gray-700 mb-4">
              By accessing and using our real estate platform, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                You must be at least 18 years old to use our services
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                You must provide accurate and complete information
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                You are responsible for maintaining the confidentiality of your account
              </li>
            </ul>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
              User Responsibilities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Account Security</h3>
                <p className="text-gray-700">Maintain the security of your account credentials and notify us of any unauthorized access</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Property Listings</h3>
                <p className="text-gray-700">Ensure all property information is accurate and up-to-date</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Communication</h3>
                <p className="text-gray-700">Maintain professional and respectful communication with other users</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Compliance</h3>
                <p className="text-gray-700">Adhere to all applicable laws and regulations</p>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">3</span>
              Service Usage
            </h2>
            <p className="text-gray-700 mb-4">
              Our platform provides various real estate services subject to the following conditions:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <p className="font-medium text-gray-900">Property Listings</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
                <p className="font-medium text-gray-900">Communication Tools</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="font-medium text-gray-900">Document Management</p>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">4</span>
              Privacy and Data Protection
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                We are committed to protecting your privacy and handling your data in accordance with applicable data protection laws. Our Privacy Policy outlines how we collect, use, and protect your personal information.
              </p>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">5</span>
              Contact Information
            </h2>
            <div className="bg-blue-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                For any questions regarding these Terms and Conditions, please contact us at:
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">legal@realestate.com</span>
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
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">6</span>
              Terms Updates
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                We reserve the right to modify these Terms and Conditions at any time. Any changes will be effective immediately upon posting on our website. We encourage you to review these terms periodically.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
