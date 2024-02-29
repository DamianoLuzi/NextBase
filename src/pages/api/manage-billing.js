import {createServerSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {stripe} from '../../pricing/utils/stripe'
import {SITE_URL} from "../../core/utils/index";
import { NextResponse } from "next/server";

const handler = async (req, res) => {
  const supabaseServerClient = createServerSupabaseClient({
    req,
    res
  });
  const {
    data: {user},
  } = await supabaseServerClient.auth.getUser();

  if(!user) {
    return res.status(401).send('Unauthorized')
  }

  const {data: profile} = await supabaseServerClient
    .from('profile')
    .select('stripe_customer_id')
    .eq('user_id',user.id).single(); 

  console.log("manage-billing profile",profile)
  if(!profile.stripe_customer_id) {
    return res.status(401).send({error: 'empty stripe_customer_id'})
  }
  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: SITE_URL
  });
  return res.send({url: session.url})
}


export default handler;