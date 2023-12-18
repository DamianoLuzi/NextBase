//webhook -> necessary for getting and syncing data from stripe to supabase
//providing a server side/api route where to send data
//ngroks tunnels localhost 3000 to something to share to stripe
import getRawBody from "raw-body" 
import {stripe} from "../../pricing/utils/stripe"

export const config = {
    api: {
       bodyParser: false, 
    },
}
export default async function handler(req, res) {
    const signature  =req.headers['stripe-signature']
    const signingSecret = process.env.STRIPE_SIGNING_SECRET
    let event;
    try {
        //turning request into a buffer
        const rawBody = await getRawBody(req, {limit: '2mb'})
        event = stripe.webhooks.constructEvent(rawBody,signature,signingSecret)
    } catch(error) {
        console.log("Webhook signature verification failed "+error)
        return res.status(400).end();
    }

    try {
        console.log(event)
        switch(event.type) {
            case "customer.subscription.updated":
                updateSubscription(event)
                break;
            case "customer.subscription.deleted":
                deleteSubscription(event)
                break;
        }
        res.send({success: true});

    }catch(error) {
        console.log(error.message);
        res.send({success: false});
    }
  
}


async function updateSubscription(event) {
  const subscription = event.data.object;
  const stripe_customer_id = subscription.customer;
  const subscription_status = subscription.status;
  const price = subscription.items.data[0].price.id;

  const {data: profile } = await supabase.from('profile').select('*').eq('stripe_customer_id',stripe_customer_id);  //checking if the profile already exists in the specific column
  if(profile) {
    const updatedSubscription = {
        subscription_status,
        price
    }
    await supabase.from('profile').update(updatedSubscription).eq('stripe_customer_id', stripe_customer_id); //updating the subscription
  } else {  
    //creating profile if it does not exist yet
    //retrieveing customer using stripe retrieve
    const customer = await stripe.customers.retrieve(
        stripe_customer_id
    );
    const name = customer.name;
    const email = customer.email;
    const newProfile = {
        name,
        email,
        stripe_customer_id,
        subscription_status,
        price
    }
    console.log("new profile: "+newProfile)
    //using the auth api to authenticate the new profile
    //user gets added into built in supbase auth table
    //the profile will be created using create_profile.sql function
    await supabase.aut.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: newProfile
    });

  }
}


async function deleteSubscription(event) {
  const subscription = event.data.object;
  const stripe_customer_id = subscription.stripe_customer_id;
  const subscription_status = subscription.status;
  const deletedSubscription = {
    subscription_status,
    price: null
  };
  await supabase.from('profile').update(updatedSubscription).eq('stripe_customer_id', stripe_customer_id);

}