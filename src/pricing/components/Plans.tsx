import {useState} from 'react';
import { SITE_URL } from '../../core/utils';
import { loadStripe } from '@stripe/stripe-js'; 
import Plan from '../../types/Plan';

interface Plans {
  plans: Plan[]
}

export default function Plans({plans} : Plans) {
  const [selected, setSelected] = useState('month');
  const [isRedirecting, setIsRedirecting] = useState(false);
  const plan = plans.find(plan => plan.interval === selected);  // selecting plan based on the right interval

  function togglePlan() {
    const interval = selected === 'month' ? 'year' : 'month';
    setSelected(interval); //setting selected state based on the switch input using the togglePlan function (which calls the setState hook)
  }

  async function onCheckout(){  
    setIsRedirecting(true);
    console.log("onCheckout executed")
    //request to the checkout endpoint: network request from the frontand to the backend
    console.log("site url "+ SITE_URL)
    console.log("checkout endpoint:"+`${SITE_URL}/api/checkout/${plan.id}`)
    const response = await fetch(`${SITE_URL}/api/checkout/${plan.id}`);
    if (!response.ok) {
      console.log("error checkout endpoint:"+`${SITE_URL}/api/checkout/${plan.id}`)
      console.error(`Failed to fetch: ${response.status} - ${response.statusText}`);
      return;
    }
    const data = await response.json();
    //loading stripe on the client
    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!stripePublishableKey) {
      console.error('Stripe publishable key is not defined.');
      return;
    }
    console.log(data)
    //initializing stripe in the browser
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    //creating a checkout session based on the ID retrieved in the response
    await stripe.redirectToCheckout({sessionId : data.id});
    setIsRedirecting(false);
  }
  return(
    <div className="bg-teal border-right">
      <div className="column-padding centered">
        <div className="callout-wrap">
          <div className="plan">
            <div className="plan-wrap">
              <div className="plan-content">
                <div className="plan-switch">
                  Monthly
                  <label className="switch">
                    <input onChange={togglePlan}type="checkbox"/>
                    <span className="slider"/>
                  </label>
                  Yearly
                </div>
                <h2 className="plan-name">{Plans.name}</h2>
                <div>Just {plan.price} / {plan.interval}</div>
                <div>
                  <button disabled={isRedirecting} onClick={onCheckout} className="large-button">
                    <div className="large-button-text">{isRedirecting ? "Loading..." : "Buy Now"}</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

