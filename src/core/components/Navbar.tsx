import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { useSession, useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { SITE_URL } from "../utils";

export default function Navbar() {
  //react hooks to access supabase auth token from the cookies
  const user = useUser(); //checking for specific user's data
  const session = useSession(); //checking if user is logged in
  //console.log({ user, session })
  const supabaseClient = useSupabaseClient(); //calling supabase from the client

  const signOut = () => {
    console.log("signing out...")
    supabaseClient.auth.signOut()
  }

  async function onManageBilling() {

    const response = await fetch(`${SITE_URL}/api/manage-billing`)
    const data = await response.json()
    console.log("onManageBilling data", data)
    if (data) {
      window.location.href = data.url
    }

  }
  return (
    <div className="nav-container border-b-2 border-black">
      <Link href="/">
        <Logo />
      </Link>
      {session ? (
        <div className="nav-menu">
          <Link href="/products" className="nav-link white">
            <div>Products</div>
          </Link>
          <a onClick={onManageBilling} className="nav-link border-left white">
            <div>Billing</div>
          </a>
          <div onClick={signOut} className="nav-link black">
            <div>Sign out</div>
          </div>
        </div>
      ) : (
        <div className="nav-menu">
          <Link href="/login" className="nav-link white">Login</Link>
          <Link href="/pricing" className="nav-link black">Pricing</Link>
        </div>
      )}
    </div>
  );
}
