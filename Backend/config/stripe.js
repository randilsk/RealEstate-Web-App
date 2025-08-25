import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  appInfo: {
    name: "RealEstate-Web-App",
    version: "1.0.0",
    url: "https://github.com/randilsk/RealEstate-Web-App"
  }
});

export default stripe;

