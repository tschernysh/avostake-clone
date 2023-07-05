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
  connectWallet:
    () => async (dispatch, store) => {

    },
}
