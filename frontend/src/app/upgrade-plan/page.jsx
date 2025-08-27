'use client';

import React from 'react';
import SubscriptionPlans from '../../components/StripePayment/SubscriptionPlans';
import { useRouter } from 'next/navigation';

const UpgradePlanPage = () => {
  const router = useRouter();

  const handleBackToProfile = () => {
    router.push('/profile');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToProfile}
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Profile
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Upgrade Your Plan</h1>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Subscription Plans Component */}
      <SubscriptionPlans />
    </div>
  );
};

export default UpgradePlanPage;


