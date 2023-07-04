import { store } from 'store';
import applicationTypes from './types'
import StakeContract from 'contracts/StakeContract.json'
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
  connectWallet:
    () => async (dispatch, store) => {

    },
}
