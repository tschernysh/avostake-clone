import applicationTypes from './types'

export const ApplicationActionCreator = {
  setWalletAddress: (walletAddress) => ({
    type: applicationTypes().SET_WALLET_ADDRESS,
    payload: walletAddress
  }),
  connectWallet:
    () => async (dispatch, store) => {
      const tronStation = await initTronstation()
      let freezeTrxEnergy

      try {
        freezeTrxEnergy = await tronStation.energy.trx2FrozenEnergy(1);
        freezeTrxEnergy = +freezeTrxEnergy.toFixed(6)
      } catch (error) {
        console.log(error)
      }
      dispatch(energyActionCreator.setFreezeTrxEnergy(freezeTrxEnergy))
    },

}
