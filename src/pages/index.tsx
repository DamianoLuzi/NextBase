import Link from "next/link";
import hero from "../../public/assets/hero.png"
import Image from "next/image";
import React from "react";


export default function HomePage() {
  return (
    <div className="grid-halves h-screen-navbar">
      <div className="bg-teal border-right">
        <div className="column-padding">
          <div className="tablet-centered">
            <div className="content-grid home-hero">
              <h1>The most epic products💥</h1>
              <p className="section-subtitle">The best products online, all in one place.</p>
              <Link href="/products" className="large-button">
                <div className="large-button-text">Explore</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-navy">
        <div className="column-padding centered">
          <div className="callout-wrap">
            <Image src={hero} placeholder="blur" className="callout-image" alt={"hero"} />
          </div>
        </div>
      </div>
    </div>

  );
}
