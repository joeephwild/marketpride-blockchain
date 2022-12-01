import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { AnimatePresence } from "framer-motion";
import { MarketPrideProvider } from "../context/MarketPrideContext";

const { chains, provider } = configureChains(
  [chain.polygonMumbai, chain.polygon, chain.mainnet],
  [
    alchemyProvider({
      apiKey:
        "https://polygon-mumbai.g.alchemy.com/v2/L3gPc9I3BG4i7oHU7yHQ7nsdlQuTYoQh",
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "MarketPride Commerce",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

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
