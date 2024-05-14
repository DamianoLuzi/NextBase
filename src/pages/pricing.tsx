import { stripe } from "../pricing/utils/stripe";
import Benefits from "../pricing/components/Benefits"
import Plans from "../pricing/components/Plans"
import Plan from "../types/Plan";

interface Plans {
  plans: Plan[]
}

export default function PricingPage({ plans }: Plans) {
  console.log(plans)
  return (
    <div className="grid-halves h-screen-navbar">
      <Plans plans={plans} />
      <Benefits />
    </div>
  );
}

export async function getStaticProps() {
  //stripe api call to retrieve prices
  const { data: prices } = await stripe.prices.list({ limit: 2 })
  const plans = []
  for (const price of prices) {
    //retreving the product plan name by its ID
    //console.log(price.product)
    const product = await stripe.products.retrieve(price.product.toString());  //added toString()
    plans.push({
      name: product.name,
      id: price.id,
      price: price.unit_amount / 100,
      interval: price.recurring.interval
    });
  }
  return {
    props: {
      plans
    }
  }
}


