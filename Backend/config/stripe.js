import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  appInfo: {
    name: "RealEstate-Web-App",
    version: "1.0.0",
    url: "https://github.com/randilsk/RealEstate-Web-App"
  }
});

 async function handler(req, res) {
  res.json({
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    basicPriceId: process.env.STRIPE_BASIC_PRICE_ID,   // free or dummy price
    proPriceId: process.env.STRIPE_PRO_PRICE_ID,       // your real Stripe Price ID
    premiumPriceId: process.env.STRIPE_PREMIUM_PRICE_ID
  });
}
export default stripe;
export { handler };


