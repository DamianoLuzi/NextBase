import Link from "next/link";
import Logo from "../core/components/Logo";
import LoginForm from "../login/components/LoginForm";
import Image from "next/image";
import login from "../../public/assets/login.png";
import { useState } from "react";
import LoginSubmitted from "../login/components/LoginSubmitted";

export default function LoginPage() {
  const [submitted, setSubmitted] = useState('');
    return (
        <div className="grid-halves h-screen">
          <div className="border-right bg-offwhite">
            <div className="column-padding">
              <div className="tablet-centered"> 
                <Link href='' className="logo-container">
                  <Logo style={{width: 150 }}/>
                  {submitted? <LoginSubmitted submitted={submitted}/> : <LoginForm setSubmitted={setSubmitted}/>}
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-navy border-right ">
            <Image src={login} alt="login" className="callout-image"/>
          </div>
        </div>
    );
}
