//webhook -> necessary for getting and syncing data from stripe to supabase
//providing a server side/api route where to send data
//stripe sends information from the subscription event to the webhook endpoint
//from there we can send the data to the db
//ngroks tunnels the localhost 3000 server to something that allows sharing data to stripe
import getRawBody from "raw-body" 
import {stripe} from "../../pricing/utils/stripe"
import {supabase} from "../../../supabase/index"

export const config = {
    api: {
       bodyParser: false, 
    },
}
export default async function handler(req, res) {
    const signature = req.headers['stripe-signature']
    const signingSecret = process.env.STRIPE_SIGNING_SECRET
    let event;
    try {
        //turning request into a buffer so that stripe can construct a webhook event 
        const rawBody = await getRawBody(req /*, {limit: '2mb'}*/)
        //event = rawBody
        event = stripe.webhooks.constructEvent(rawBody,signature,signingSecret)
        console.log("raw body "+rawBody)
    } catch(error) {
        console.log("Webhook signature verification failed "+error)
        return res.status(400).end();
    }

    try {
        console.log("event"+ event)
        switch(event.type) {
            case "customer.subscription.updated":
                await updateSubscription(event)
                break;
            case "customer.subscription.deleted":
                await deleteSubscription(event)
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
  console.log("update subcription",subscription)
  const stripe_customer_id = subscription.customer;   //change to subscription.customer.id or subscription.stripe_customer_id ??
  //const stripe_customer_id = subscription.customer.id
  //const subscription_status = subscription.status;
  const price = subscription.items.data[0].price.id;
  console.log("stripe customer id",subscription.customer)
  const {data: profile } = await supabase
    .from('profile')
    .select('*')
    .eq('stripe_customer_id',stripe_customer_id)
    .single();  //checking if the profile already exists in the specific column

  if(profile) {
    const updatedSubscription = {
        subscription_status,
        price
    }
    await supabase
        .from('profile')
        .update(updatedSubscription)
        .eq('stripe_customer_id', stripe_customer_id); //updating the subscription selecting the right row
  } else {  
    //creating profile if it does not exist yet
    //but the subscription event does not contain any info about user's name or email
    //but stripe created a customer->retrieving customer using stripe retrieve
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
    console.log("new profile: "+
        newProfile.email+" "+
        newProfile.name+" "+
        newProfile.price+" "+
        newProfile.subscription_status)
    //using the auth api to authenticate the new profile
    //user gets added into built in supbase auth table
    //the profile will be created using create_profile.sql function
    try {
        //instead of insert -> supabase.auth api
        await supabase.auth.admin.createUser({
            email,
            email_confirm: true,
            user_metadata: newProfile
        });
        console.log("new profile added",newProfile)
    }catch(error) {
        console.log("Supabase User Creation Error "+error.message)
    }

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
  await supabase.from('profile').update(deletedSubscription).eq('stripe_customer_id', stripe_customer_id);

}