//initializing stripe in the server
import Stripe from "stripe";
export const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY,
    {apiVersion: "2023-10-16"}
    );
//export const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);