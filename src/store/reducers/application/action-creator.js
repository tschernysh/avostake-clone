import { store } from 'store';
import { Navigate } from 'react-router-dom';
import applicationTypes from './types'
import StakeContract from 'contracts/StakeContract.json'
import IERC20 from 'contracts/IERC20.json'
import Web3 from 'web3';
import Config from 'config';
import { initWeb3 } from 'utils/initWeb3';
import applicationReducer from '.';
import { routerBook } from 'routes/routerBook';

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
  setIsNeedToUpdate: (isNeedToUpdate) => ({
    type: applicationTypes().SET_IS_NEED_TO_UPDATE,
    payload: isNeedToUpdate
  }),
  setIsDepositTransaction: (isDepositTransaction) => ({
    type: applicationTypes().SET_IS_DEPOSIT_TRANSACTION,
    payload: isDepositTransaction
  }),
  setIsWithdrawTransaction: (isWithdrawTransaction) => ({
    type: applicationTypes().SET_IS_WITHDRAW_TRANSACTION,
    payload: isWithdrawTransaction
  }),
  setNotCorrectChain: (notCorrectChain) => ({
    type: applicationTypes().SET_NOT_CORRECT_CHAIN,
    payload: notCorrectChain
  }),
  setRedirectTo: (redirectTo) => ({
    type: applicationTypes().SET_REDIRECT_TO,
    payload: redirectTo
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
      const web3 = await initWeb3()

      let bnbBalance

      try {
        bnbBalance = await web3.eth.getBalance(walletAddress)
        bnbBalance = bnbBalance.toString()
        bnbBalance = +web3.utils.fromWei(bnbBalance, 'ether')
      } catch (error) {
        console.log(error)
        return
      }

      dispatch(ApplicationActionCreator.setBNBBalance(bnbBalance))

    },
  getAccountTokenBalance:
    () => async (dispatch, store) => {

      const web3 = await initWeb3()
      const walletAddress = store().applicationReducer.walletAddress

      const tokenContract = new web3.eth.Contract(IERC20.abi, Config().TOKEN_CONTRACT_ADDRESS)


      let tokenBalance

      try {
        tokenBalance = await tokenContract.methods.balanceOf(walletAddress).call()
        tokenBalance = tokenBalance.toString()
        tokenBalance = +web3.utils.fromWei(tokenBalance, 'ether')
      } catch (error) {
        console.log(error)
        return
      }

      dispatch(ApplicationActionCreator.setTokenBalance(tokenBalance))

    },
  checkMetamaskWallet:
    () => async (dispatch, store) => {
      const web3 = new Web3(window.ethereum)
      if (typeof window.ethereum !== 'undefined') {
        // Check if MetaMask is connected

        async function getConnectedChainId() {
          try {
            // Request the current chain ID from MetaMask
            const chainId = await web3.eth.getChainId();

            const newChainId = Number(chainId)

            return newChainId;
          } catch (error) {
            console.error('Error retrieving chain ID:', error);
            return null;
          }
        }

        const chainId = await getConnectedChainId()
        if (chainId !== Config().CHAIN_ID) {
          dispatch(ApplicationActionCreator.setNotCorrectChain(true))
          return
        }

        const connectedAccounts = await web3.eth.getAccounts()
        if (!!connectedAccounts.length) {
          const web3 = new Web3(window.ethereum);
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

        async function getConnectedChainId() {
          try {
            // Request the current chain ID from MetaMask
            const chainId = await web3.eth.getChainId();

            const newChainId = Number(chainId)

            return newChainId;
          } catch (error) {
            console.error('Error retrieving chain ID:', error);
            return null;
          }
        }

        const chainId = await getConnectedChainId()
        if (chainId !== Config().CHAIN_ID) {
          dispatch(ApplicationActionCreator.setNotCorrectChain(true))
          return
        }
        let currentAddress
        try {
          const accounts = await window.ethereum.send(
            "eth_requestAccounts"
          );
          currentAddress = accounts.result[0]
          console.log('Wallet connected:', currentAddress)
          dispatch(ApplicationActionCreator.setWalletAddress(currentAddress))
          dispatch(ApplicationActionCreator.setRedirectTo(routerBook.dashboard))
        } catch (error) {
          console.error('Error connecting wallet:', error);
        }

      }
      else {
        // MetaMask not available, handle accordingly
        console.error('MetaMask is not installed.');
      }
    },
  disconnectMetamaskWallet:
    () => async (dispatch, store) => {
      dispatch(ApplicationActionCreator.setRedirectTo(routerBook.main))
    },
  withdraw:
    () => async (dispatch, store) => {
      const web3 = await initWeb3()
      const walletAddress = store().applicationReducer.walletAddress
      dispatch(ApplicationActionCreator.setIsWithdrawTransaction(true))
      const stakeContract = new web3.eth.Contract(StakeContract.abi, Config().STAKE_CONTRACT_ADDRESS);

      let withdraw

      try {
        withdraw = await stakeContract.methods.withdraw().send({ from: walletAddress })
      } catch (error) {
        console.log(error)
        dispatch(ApplicationActionCreator.setIsWithdrawTransaction(false))
        return
      }

      dispatch(ApplicationActionCreator.setIsNeedToUpdate(true))
      dispatch(ApplicationActionCreator.setIsWithdrawTransaction(false))

    },
  depositToken:
    (amount, time) => async (dispatch, store) => {
      const web3 = await initWeb3()
      const walletAddress = store().applicationReducer.walletAddress
      const defaultReferrer = store().applicationReducer.referralAddress
      const upline = store().accountReducer.userInfo.upline

      dispatch(ApplicationActionCreator.setIsDepositTransaction(true))

      const tokenContract = new web3.eth.Contract(IERC20.abi, Config().TOKEN_CONTRACT_ADDRESS)
      const stakeContract = new web3.eth.Contract(StakeContract.abi, Config().STAKE_CONTRACT_ADDRESS);

      let currentReferral
      const localReferral = localStorage.getItem("refAddress");

      if (upline) currentReferral = upline
      else if (localReferral) currentReferral = localReferral
      else currentReferral = defaultReferrer

      const amountToSend = web3.utils.toWei(amount, 'ether')

      let approveToken

      try {
        approveToken = await tokenContract.methods.approve(
          Config().STAKE_CONTRACT_ADDRESS,
          amountToSend
        ).send({ from: walletAddress })
      } catch (error) {
        dispatch(ApplicationActionCreator.setIsDepositTransaction(false))
        console.log(error)
        return
      }

      let depositTxn

      try {
        depositTxn = await stakeContract.methods.deposit(
          time,
          currentReferral,
          amountToSend
        ).send({ from: walletAddress })
      } catch (error) {
        dispatch(ApplicationActionCreator.setIsDepositTransaction(false))
        console.log(error)
        return
      }

      dispatch(ApplicationActionCreator.setIsDepositTransaction(false))
      dispatch(ApplicationActionCreator.setIsNeedToUpdate(true))
    }
}
