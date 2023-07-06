import { BrowserRouter, Routes } from "react-router-dom";

import { RouterComponent } from "./routes/RouterComponent";
import { routerSchema } from "./routes/routerSchema";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationActionCreator } from "store/reducers/application/action-creator";
import { AccountActionCreator } from "store/reducers/account/action-creator";
import Config from "config";
import StakeContract from 'contracts/StakeContract.json'

import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum"
import { WagmiConfig, configureChains, createConfig } from "wagmi"
import { bsc, bscTestnet } from 'wagmi/chains'
import { ConfigContext } from "applicationContext";
import { initWeb3 } from "utils/initWeb3";
import Web3 from "web3";

const App = () => {

  const dispatch = useDispatch()
  const { walletAddress, isNeedToUpdate } = useSelector(state => state.applicationReducer)

  useEffect(() => {
    if (isNeedToUpdate) {
      dispatch(AccountActionCreator.getContractInfo())
      if (!!walletAddress) {
        dispatch(AccountActionCreator.getUserInfo())
        dispatch(ApplicationActionCreator.getAccountBNBBalance())
        dispatch(ApplicationActionCreator.getAccountTokenBalance())
      }
      dispatch(ApplicationActionCreator.setIsNeedToUpdate(false))
    }
  }, [isNeedToUpdate])

  useEffect(() => {
    dispatch(ApplicationActionCreator.getDefaultReferrer())
    dispatch(AccountActionCreator.getLeaderProgressData())
    dispatch(AccountActionCreator.getContractInfo())
    dispatch(ApplicationActionCreator.checkMetamaskWallet())
  }, [])

  useEffect(() => {
    if (!!walletAddress) {
      dispatch(AccountActionCreator.getUserInfo())
      dispatch(ApplicationActionCreator.getAccountBNBBalance())
      dispatch(ApplicationActionCreator.getAccountTokenBalance())
    }
  }, [walletAddress])

  useEffect(() => {
    // Function to handle wallet change event
    const handleAccountsChanged = (accounts) => {
      dispatch(ApplicationActionCreator.setWalletAddress(accounts[0]))
      dispatch(AccountActionCreator.getUserInfo())
      dispatch(ApplicationActionCreator.getAccountBNBBalance())
      dispatch(ApplicationActionCreator.getAccountTokenBalance())
      console.log('Active wallet changed:', accounts);
    };

    // Check if MetaMask is available
    if (typeof window.ethereum !== 'undefined') {
      // Subscribe to wallet change events
      window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    // Clean up the subscription on component unmount
    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const chains = [bsc, bscTestnet]
  const projectId = Config().PROJECT_ID

  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)


  return (
    <ConfigContext.Provider value={{ ethereumClient, projectId }}>
      <WagmiConfig config={wagmiConfig}>
        <BrowserRouter>
          <Routes>{routerSchema.map(RouterComponent)}</Routes>
        </BrowserRouter>
      </WagmiConfig >
    </ConfigContext.Provider>
  )
}
export default App;
