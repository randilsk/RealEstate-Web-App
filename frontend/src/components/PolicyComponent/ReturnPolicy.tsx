import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Return Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
        
        <div className="space-y-8 bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
              Service Cancellation
            </h2>
            <p className="text-gray-700 mb-4">
              For our real estate services, the following cancellation policies apply:
            </p>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Property listing cancellations must be made 24 hours before the scheduled listing date
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Premium service cancellations require 7 days notice for full refund
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Virtual tour bookings can be cancelled up to 48 hours before the scheduled time
              </li>
            </ul>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
              Refund Policy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Premium Services</h3>
                <p className="text-gray-700">Full refund within 7 days of purchase if service not utilized</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Listing Fees</h3>
                <p className="text-gray-700">Non-refundable once listing is published</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Virtual Tours</h3>
                <p className="text-gray-700">50% refund for cancellations within 24-48 hours</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Consultation Services</h3>
                <p className="text-gray-700">Full refund if cancelled 24 hours before appointment</p>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">3</span>
              Exceptions
            </h2>
            <p className="text-gray-700 mb-4">
              The following circumstances may qualify for exceptions to our standard return policy:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-medium text-gray-900">Technical Issues</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <p className="font-medium text-gray-900">Service Quality</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-medium text-gray-900">Special Circumstances</p>
              </div>
            </div>
          </section>

          <section className="border-b border-gray-200 pb-6">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">4</span>
              Processing Time
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                Refunds are typically processed within 5-7 business days after approval. The refund will be issued to the original payment method used for the transaction.
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
                For any questions regarding our return policy or to request a refund, please contact us at:
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">returns@realestate.com</span>
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
              Policy Updates
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                We reserve the right to modify this return policy at any time. Any changes will be effective immediately upon posting on our website. We encourage you to review this policy periodically.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ReturnPolicy;
