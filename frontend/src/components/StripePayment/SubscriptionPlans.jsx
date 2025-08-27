import React, { useEffect } from 'react';

const SubscriptionPlans = () => {
  useEffect(() => {
    // Load Stripe pricing table script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/pricing-table.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      const existingScript = document.querySelector('script[src="https://js.stripe.com/v3/pricing-table.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600">Select the perfect plan for your real estate needs</p>
        </div>

        {/* Stripe Pricing Table */}
        <div className="flex justify-center">
          <stripe-pricing-table 
            pricing-table-id="prctbl_1S0FosRrMCugJD0D6Je3EK8X"
            publishable-key="pk_test_51RzrKdRrMCugJD0DA40PQAwtRirpgO760WIBJEizJQVGvcaapr8GrYNkEZGf2FVBvSwSo0HS7N0vT2B0F01l507A00W0Ke3K1A"
          />
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">All paid plans include a 30-day money-back guarantee</p>
          <p className="text-sm text-gray-500">Need help choosing? Contact our support team</p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
