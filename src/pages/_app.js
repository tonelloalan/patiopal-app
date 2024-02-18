// Wrapping the Session Provider here (_app.js) ensures session data is available throughout, since Components within here get rendered for every page of the application,

import "@/styles/globals.css";
import { AuthProvider } from "@/Providers";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
