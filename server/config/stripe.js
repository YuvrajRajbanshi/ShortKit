import Stripe from "stripe"; // 👈 Capital S because it's a class

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default stripe;
