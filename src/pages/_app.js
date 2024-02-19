// Wrapping the Session Provider here (_app.js) ensures session data is available throughout, since Components within here get rendered for every page of the application,

import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
// import { AuthProvider } from "@/Providers";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
