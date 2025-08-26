'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Bluebar from "../components/Bluebar.jsx";
import Header from "../components/Header.jsx";

// Dynamically import heavy components
const HeroSection = dynamic(() => import("../components/HomeContent/HeroSection.jsx"), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

const HomeRecommendation = dynamic(() => import("../components/HomeContent/HomeRecommendation.jsx"), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

const HomeBuySellRent = dynamic(() => import("../components/HomeContent/HomeBuySellRent.jsx"), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

const AboutSectionHome = dynamic(() => import("../components/HomeContent/AboutSectionHome.jsx"), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

const HomeReviewSection = dynamic(() => import("../components/HomeContent/HomeReviewSection.jsx"), {
  loading: () => <div>Loading...</div>,
  ssr: true
});

export default function Home() {
  const searchParams = useSearchParams();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const subscription = searchParams.get('subscription');
    const sessionId = searchParams.get('session_id');

    if (subscription === 'success' && sessionId) {
      handleSubscriptionSuccess(sessionId);
      setShowSuccessMessage(true);
      
      // Hide success message after 5 seconds
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);

      // Clean up URL parameters (client-side only)
      if (typeof window !== 'undefined') {
        const url = new URL(window.location);
        url.searchParams.delete('subscription');
        url.searchParams.delete('session_id');
        window.history.replaceState({}, '', url);
      }

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleSubscriptionSuccess = async (sessionId: string) => {
    try {
      // Fetch session details
      const response = await fetch(`http://localhost:3000/api/stripe/checkout-session?sessionId=${sessionId}`);
      const data = await response.json();
      
      // Update user subscription to premium if payment was successful
      if (data.payment_status === 'paid' && data.customer_details?.email) {
        await updateUserSubscription(data.customer_details.email);
      }
    } catch (error) {
      console.error('Error handling subscription success:', error);
    }
  };

  const updateUserSubscription = async (email: string) => {
    try {
      const response = await fetch('http://localhost:3000/api/user/update-subscription', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          subscription: 'premium'
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Subscription updated successfully:', result);
      } else {
        console.error('Failed to update subscription status');
      }
    } catch (error) {
      console.error('Error updating subscription:', error);
    }
  };

  return (
    <>
      <div className="bg-main-bg min-h-screen">
        {showSuccessMessage && (
          <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Subscription activated successfully! Welcome to Premium!
            </div>
          </div>
        )}
        
        <Bluebar />
        <Header />
        <HeroSection />
        <HomeRecommendation />
        <HomeBuySellRent />
        <Bluebar />
        <AboutSectionHome />
        <Bluebar />
      </div>
    </>
  );
}
