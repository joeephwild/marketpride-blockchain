import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { MarketPrideProvider } from "../context/MarketPrideContext";


function MyApp({ Component, pageProps }) {
  return (
    <MarketPrideProvider>
      <AnimatePresence mode="wait">
            <Component {...pageProps} />
      </AnimatePresence>
    </MarketPrideProvider>
  );
}

export default MyApp;
