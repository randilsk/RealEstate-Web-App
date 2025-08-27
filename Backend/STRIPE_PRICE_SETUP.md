# Stripe Price IDs Setup Guide

## Step 1: Create Stripe Products and Prices

1. **Log into your Stripe Dashboard** at https://dashboard.stripe.com/

2. **Create Products for each plan:**
   - Go to **Products** in the left sidebar
   - Click **Add product**

3. **Create Basic Plan:**
   - Name: `Basic Plan`
   - Description: `Up to 5 property listings, Basic search filters, Email support`
   - Pricing: `$9.99/month` (recurring)
   - Click **Save product**
   - Copy the **Price ID** (starts with `price_`)

4. **Create Pro Plan:**
   - Name: `Pro Plan`
   - Description: `Up to 20 property listings, Advanced search filters, Priority support, Analytics dashboard, Featured listings`
   - Pricing: `$19.99/month` (recurring)
   - Click **Save product**
   - Copy the **Price ID** (starts with `price_`)

5. **Create Premium Plan:**
   - Name: `Premium Plan`
   - Description: `Unlimited property listings, All Pro features, Premium support, Advanced analytics, Custom branding, API access`
   - Pricing: `$29.99/month` (recurring)
   - Click **Save product**
   - Copy the **Price ID** (starts with `price_`)

## Step 2: Set Up Environment Variables

1. **Create a `.env` file** in the Backend directory:
   ```bash
   cd Backend
   cp env.example .env
   ```

2. **Edit the `.env` file** and add your Stripe configuration:
   ```env
   # MongoDB Configuration
   MONGO_URL=your_mongodb_connection_string

   # JWT Configuration
   JWT_SECRET=your_jwt_secret_key

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret

   # Stripe Configuration
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

   # Stripe Price IDs (replace with your actual price IDs)
   STRIPE_BASIC_PRICE_ID=price_1ABC123DEF456GHI789JKL
   STRIPE_PRO_PRICE_ID=price_2DEF456GHI789JKL012MNO
   STRIPE_PREMIUM_PRICE_ID=price_3GHI789JKL012MNO345PQR

   # Frontend URL
   FRONTEND_URL=http://localhost:3001

   # Server Configuration
   PORT=3000
   NODE_ENV=development
   ```

## Step 3: Get Your Stripe Keys

1. **Get your Stripe Secret Key:**
   - Go to **Developers** → **API keys** in Stripe Dashboard
   - Copy the **Secret key** (starts with `sk_test_` for test mode)

2. **Get your Stripe Publishable Key:**
   - In the same API keys section
   - Copy the **Publishable key** (starts with `pk_test_` for test mode)

## Step 4: Test the Setup

1. **Restart your backend server:**
   ```bash
   cd Backend
   npm start
   ```

2. **Test the Stripe config endpoint:**
   ```bash
   curl http://localhost:3000/api/stripe/config
   ```

3. **Expected response:**
   ```json
   {
     "publishableKey": "pk_test_...",
     "basicPriceId": "price_...",
     "proPriceId": "price_...",
     "premiumPriceId": "price_..."
   }
   ```

## Troubleshooting

### Error: "Price ID not found for plan: premium"
- Make sure you've created the products and prices in Stripe Dashboard
- Verify the price IDs are correctly copied to your `.env` file
- Ensure the `.env` file is in the Backend directory
- Restart the backend server after updating the `.env` file

### Error: "Invalid API key"
- Check that your Stripe secret key is correct
- Make sure you're using test keys for development
- Verify the key starts with `sk_test_` for test mode

### Error: "Unauthorized - No token provided"
- Make sure you're logged in to the application
- Check that the authentication cookies are being sent
- Verify the frontend is running on the correct port

## Production Setup

For production, you'll need to:

1. **Switch to live mode** in Stripe Dashboard
2. **Use live API keys** (start with `sk_live_` and `pk_live_`)
3. **Create live products and prices** in Stripe Dashboard
4. **Update your `.env` file** with live keys and price IDs
5. **Set up webhook endpoints** for production

## Important Notes

- **Test Mode**: Use test card numbers for testing (e.g., `4242 4242 4242 4242`)
- **Webhooks**: Set up webhook endpoints for handling payment events
- **Security**: Never commit your `.env` file to version control
- **Environment**: Use different keys for development and production

