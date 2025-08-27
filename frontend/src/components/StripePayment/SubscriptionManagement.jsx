import React, { useState, useEffect } from 'react';

const SubscriptionManagement = () => {
  const [subscription, setSubscription] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [portalLoading, setPortalLoading] = useState(false);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      // Fetch subscription details
      const subResponse = await fetch('http://localhost:3000/api/stripe/subscription', {
        credentials: 'include'
      });
      const subData = await subResponse.json();
      setSubscription(subData.subscription);

      // Fetch payment history
      const paymentsResponse = await fetch('http://localhost:3000/api/stripe/payments', {
        credentials: 'include'
      });
      const paymentsData = await paymentsResponse.json();
      setPayments(paymentsData.payments);

    } catch (error) {
      console.error('Error fetching subscription data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerPortal = async () => {
    setPortalLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/stripe/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating customer portal session:', error);
      alert('Failed to open customer portal');
    } finally {
      setPortalLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!confirm('Are you sure you want to cancel your subscription? It will remain active until the end of the current billing period.')) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/stripe/cancel-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      const data = await response.json();
      
      if (data.message) {
        alert(data.message);
        fetchSubscriptionData(); // Refresh data
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      alert('Failed to cancel subscription');
    }
  };

  const handleReactivateSubscription = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/stripe/reactivate-subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      const data = await response.json();
      
      if (data.message) {
        alert(data.message);
        fetchSubscriptionData(); // Refresh data
      }
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      alert('Failed to reactivate subscription');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount, currency = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase()
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Subscription Management</h1>

        {!subscription ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">No Active Subscription</h2>
            <p className="text-gray-600 mb-6">
              You don't have an active subscription. Subscribe to a plan to get started.
            </p>
            <a
              href="/subscription-plans"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Plans
            </a>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Current Subscription */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Current Subscription</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {subscription.planType.charAt(0).toUpperCase() + subscription.planType.slice(1)} Plan
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Status: <span className={`font-semibold ${
                      subscription.status === 'active' ? 'text-green-600' : 
                      subscription.status === 'past_due' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                    </span>
                  </p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>Amount: {formatCurrency(subscription.amount, subscription.currency)}</p>
                    <p>Current Period: {formatDate(subscription.currentPeriodStart)} - {formatDate(subscription.currentPeriodEnd)}</p>
                    {subscription.cancelAtPeriodEnd && (
                      <p className="text-yellow-600 font-semibold">
                        ⚠️ Subscription will be canceled at the end of the current period
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={handleCustomerPortal}
                    disabled={portalLoading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                  >
                    {portalLoading ? 'Loading...' : 'Manage Billing'}
                  </button>

                  {subscription.cancelAtPeriodEnd ? (
                    <button
                      onClick={handleReactivateSubscription}
                      className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Reactivate Subscription
                    </button>
                  ) : (
                    <button
                      onClick={handleCancelSubscription}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Cancel Subscription
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>
              
              {payments.length === 0 ? (
                <p className="text-gray-600">No payment history available.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {payments.map((payment) => (
                        <tr key={payment._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatDate(payment.createdAt)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(payment.amount, payment.currency)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              payment.status === 'succeeded' ? 'bg-green-100 text-green-800' :
                              payment.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {payment.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionManagement;
