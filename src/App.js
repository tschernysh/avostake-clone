import { BrowserRouter, Routes } from "react-router-dom";

import { RouterComponent } from "./routes/RouterComponent";
import { routerSchema } from "./routes/routerSchema";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationActionCreator } from "store/reducers/application/action-creator";
import { AccountActionCreator } from "store/reducers/account/action-creator";

const App = () => {

  const dispatch = useDispatch()
  const { walletAddress } = useSelector(state => state.applicationReducer)

  useEffect(() => {
    dispatch(ApplicationActionCreator.getDefaultReferrer())
    dispatch(AccountActionCreator.getLeaderProgressData())
    dispatch(AccountActionCreator.getContractInfo())
    dispatch(ApplicationActionCreator.checkMetamaskWallet())
  }, [])

  useEffect(() => {
    if (!!walletAddress) {
      dispatch(AccountActionCreator.getUserInfo())
    }
  }, [walletAddress])

  useEffect(() => {
    // Function to handle wallet change event
    const handleAccountsChanged = (accounts) => {
      dispatch(ApplicationActionCreator.setWalletAddress(accounts[0]))
      dispatch(AccountActionCreator.getUserInfo())
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

  return (
    <BrowserRouter>
      <Routes>{routerSchema.map(RouterComponent)}</Routes>
    </BrowserRouter>
  )
}
export default App;
