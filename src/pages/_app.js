import AppLayout from "src/core/layouts/App";
import "src/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <AppLayout>
      <Component {...pageProps}/>
    </AppLayout>
  );
}
