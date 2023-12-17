const benefits = [
    {
        title: "One Low Price",
        subtitle: "Save Big! Get all the benefits with a low montly subscription.",
    },
    {
        title: "No limits",
        subtitle: "Get complete access",
    },
    {
        title: "Cancel anytime",
        subtitle: "Pause or stop your subscription whenever you want",
    },
]

export default function Benefits() {
  return(
    <div className = "bg-black">
      <div className = "column-padding">
        <div className = "content-grid xl">
          {benefits.map( benefit => (
            <div key = {benefit.title} className = "spacing-base">
              <h3>
                {benefit.title}
                <br/>
              </h3>
              <div>{benefit.subtitle}</div>
            </div>
            ))}
          </div>
        </div>
      </div>
    );
}
