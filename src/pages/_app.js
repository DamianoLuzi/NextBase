import AppLayout from "src/core/layouts/App";
import { useState } from "react";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import "src/styles/globals.css";

export default function App({ Component, pageProps }) {
  //create a new supabase browser client on every first render
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </SessionContextProvider>
  );
}
