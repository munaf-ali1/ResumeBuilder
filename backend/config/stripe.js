import Stripe from "stripe";

let stripeInstance = null;

function getStripeInstance() {
  if (!stripeInstance) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY is not defined in environment variables");
      console.error("Please check your .env file");
      throw new Error("STRIPE_SECRET_KEY is required");
    }
    
    console.log("Stripe Key Loaded:", stripeSecretKey ? "Defined" : "Undefined");
    stripeInstance = new Stripe(stripeSecretKey);
  }
  
  return stripeInstance;
}

export default getStripeInstance();
