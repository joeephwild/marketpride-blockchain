import "../styles/globals.css";
import { AnimatePresence } from "framer-motion";
import { MarketPrideProvider } from "../context/MarketPrideContext";
import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";

const chains = [chain.polygonMumbai, chain.polygon];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "7720f3937b28964fbc70200760fc56b6" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "MarketPride", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

function MyApp({ Component, pageProps }) {
  return (
    <>
    <MarketPrideProvider>
      <AnimatePresence mode="wait">
        <WagmiConfig client={wagmiClient} >
        <Component {...pageProps} />
        </WagmiConfig>
      </AnimatePresence>
    </MarketPrideProvider>
    <Web3Modal
        projectId="7720f3937b28964fbc70200760fc56b6"
        ethereumClient={ethereumClient}
      />
    </>
  );
}

export default MyApp;
