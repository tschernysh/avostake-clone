import { BrowserRouter, Routes, useLocation, useNavigate } from "react-router-dom";
import React from 'react'
import { RouterComponent } from "./routes/RouterComponent";
import { routerSchema } from "./routes/routerSchema";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationActionCreator } from "store/reducers/application/action-creator";
import { AccountActionCreator } from "store/reducers/account/action-creator";
import Config from "config";
import StakeContract from 'contracts/StakeContract.json'

import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum"
import { WagmiConfig, configureChains, createConfig } from "wagmi"
import { ConfigContext } from "applicationContext";
import { initWeb3 } from "utils/initWeb3";
import Web3 from "web3";
import { initWagmi } from "utils/initWagmi";
import { routerBook } from "routes/routerBook";


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const App = () => {

  const dispatch = useDispatch()
  const { walletAddress, isNeedToUpdate, notCorrectChain, redirectTo } = useSelector(state => state.applicationReducer)
  const [seconds, setSeconds] = useState(0)
  const [wagmiConfig, setWagmiConfig] = useState()
  const [ethereumClient, setEthereumClient] = useState()
  const [projectId, setProjectId] = useState()

  useMemo(() => {
    const { wagmiConfig, ethereumClient, projectId } = initWagmi()

    setWagmiConfig(wagmiConfig)
    setEthereumClient(ethereumClient)
    setProjectId(projectId)
  }, [])

  useEffect(() => {
    let interval
    interval = setInterval(() => {
      if (!seconds) {
        if (notCorrectChain) return
        dispatch(ApplicationActionCreator.getDefaultReferrer())
        dispatch(AccountActionCreator.getLeaderProgressData())
        dispatch(AccountActionCreator.getContractInfo())

        if (!!walletAddress) {
          dispatch(AccountActionCreator.getUserInfo())
          dispatch(ApplicationActionCreator.getAccountBNBBalance())
          dispatch(ApplicationActionCreator.getAccountTokenBalance())
        }
        setSeconds(1);
      } else if (seconds > Config().HEARTBEAT_RATE) {
        setSeconds(0)
      } else setSeconds(seconds + 1)
    }, 1000)

    return () => clearInterval(interval);
  }, [seconds])

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
    if (notCorrectChain) alert('Connect to another supported chain')
    if (!!walletAddress && !notCorrectChain) {
      setSeconds(0)
    }
  }, [walletAddress, notCorrectChain])
  useEffect(() => {
    // Function to handle wallet change event
    const handleAccountsChanged = (accounts) => {
      dispatch(ApplicationActionCreator.setWalletAddress(accounts[0]))
      dispatch(AccountActionCreator.getUserInfo())
      dispatch(ApplicationActionCreator.getAccountBNBBalance())
      dispatch(ApplicationActionCreator.getAccountTokenBalance())
      console.log('Active wallet changed:', accounts);
    };

    const handleChainChanged = (chainId) => {
      const newChainId = Number(chainId)

      if (chainId !== Config().CHAIN_ID) {
        dispatch(ApplicationActionCreator.setNotCorrectChain(false))
        return
      } else dispatch(ApplicationActionCreator.setNotCorrectChain(true))

    }


    // Check if MetaMask is available
    if (typeof window.ethereum !== 'undefined') {
      // Subscribe to wallet change events
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
    }

    // Clean up the subscription on component unmount
    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, []);



  return (
      <ErrorBoundary>
        <ConfigContext.Provider value={{ ethereumClient, projectId }}>
          <WagmiConfig config={wagmiConfig}>
            <BrowserRouter>
              <Routes>{routerSchema.map(RouterComponent)}</Routes>
            </BrowserRouter>
          </WagmiConfig >
        </ConfigContext.Provider>
      </ErrorBoundary>

  )
}
export default App;
