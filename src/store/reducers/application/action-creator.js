import { store } from 'store';
import applicationTypes from './types'
import StakeContract from 'contracts/StakeContract.json'
import IERC20 from 'contracts/IERC20.json'
import Web3 from 'web3';
import Config from 'config';

export const ApplicationActionCreator = {
  setWalletAddress: (walletAddress) => ({
    type: applicationTypes().SET_WALLET_ADDRESS,
    payload: walletAddress
  }),
  setWeb3: (web3) => ({
    type: applicationTypes().SET_WEB3,
    payload: web3
  }),
  setDefaultReferrer: (walletAddress) => ({
    type: applicationTypes().SET_DEFAULT_REFERRER,
    payload: walletAddress
  }),
  setTokenBalance: (tokenBalance) => ({
    type: applicationTypes().SET_TOKEN_BALANCE,
    payload: tokenBalance
  }),
  setBNBBalance: (bnbBalance) => ({
    type: applicationTypes().SET_BNB_BALANCE,
    payload: bnbBalance
  }),
  setDepositData: (depositData) => ({
    type: applicationTypes().SET_DEPOSIT_DATA,
    payload: depositData
  }),
  getDefaultReferrer:
    () => async (dispatch, store) => {
      const web3 = new Web3(Config().WEB3_BSC_URL);

      const stakeContract = new web3.eth.Contract(StakeContract.abi, Config().STAKE_CONTRACT_ADDRESS);

      let defaultReferrer

      try {
        defaultReferrer = await stakeContract.methods.DEFAULT_REFERRER().call()
      } catch (error) {
        console.log(error)
        return
      }

      dispatch(ApplicationActionCreator.setDefaultReferrer(defaultReferrer))

    },
  getAccountBNBBalance:
    () => async (dispatch, store) => {

      const walletAddress = store().applicationReducer.walletAddress
      const web3 = new Web3(Config().WEB3_BSC_URL);

      let bnbBalance

      try {
        bnbBalance = await web3.eth.getBalance(walletAddress)
        bnbBalance = bnbBalance.toString()
        bnbBalance = web3.utils.fromWei(bnbBalance, 'ether')
      } catch (error) {
        console.log(error)
      }

    },
  getAccountTokenBalance:
    () => async (dispatch, store) => {

      const web3 = new Web3(Config().WEB3_BSC_URL);
      const walletAddress = store().applicationReducer.walletAddress

      const tokenContract = await IERC20(IERC20.abi, Config().TOKEN_CONTRACT_ADDRESS)


      let tokenBalance

      try {
        tokenBalance = await tokenContract.methods.balanceOf(walletAddress)
        tokenBalance = tokenBalance.toString()
        tokenBalance = web3.utils.fromWei(tokenBalance, 'ether')
      } catch (error) {
        console.log(error)
      }


    },
  checkMetamaskWallet:
    () => async (dispatch, store) => {
      if (typeof window.ethereum !== 'undefined') {
        // Check if MetaMask is connected
        if (window.ethereum.selectedAddress) {
          const web3 = new Web3(window.ethereum);
          dispatch(ApplicationActionCreator.setWeb3(web3))
          dispatch(ApplicationActionCreator.setWalletAddress(window.ethereum.selectedAddress))
          console.log('Wallet is connected:', window.ethereum.selectedAddress);
        } else {
          // Wallet is not connected
          console.log('Wallet is not connected');
        }
      } else {
        // MetaMask not available
        console.log('MetaMask is not installed.');
      }
    },
  connectMetamaskWallet:
    () => async (dispatch, store) => {
      if (typeof window.ethereum !== 'undefined') {
        // Create a new Web3 instance using the MetaMask provider
        const web3 = new Web3(window.ethereum);
        let currentAddress
        try {
          const accounts = await window.ethereum.send(
            "eth_requestAccounts"
          );
          currentAddress = accounts.result[0]
          console.log('Wallet connected:', currentAddress)
        } catch (error) {
          console.error('Error connecting wallet:', error);
        }

        dispatch(ApplicationActionCreator.setWeb3(web3))
        dispatch(ApplicationActionCreator.setWalletAddress(currentAddress))
      }
      else {
        // MetaMask not available, handle accordingly
        console.error('MetaMask is not installed.');
      }
    },
}
