import {stripe} from "../../../pricing/utils/stripe";
import {SITE_URL} from "../../../core/utils";
export default async function handler(req, res) {
//creating a Stripe checkout session
  const {priceId} = req.query
  try {
    const session = await stripe.checkout.sessions.create({
      mode:'subscription',
      payment_method_types:['card'],
      line_items:[{price: priceId, quantity: 1}],
      success_url: `${SITE_URL}/success`,
      cancel_url: `${SITE_URL}/pricing`,
    });
    res.send({id: session.id});
  } catch(error) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
