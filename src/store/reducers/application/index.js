import applicationTypes from './types'

export const initialState = {
  walletAddress: null,
  web3: null,
  bnbBalance: 0,
  busdBalance: 0,
}

export default applicationReducer = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case applicationTypes().SET_WALLET_ADDRESS:
      return { ...state, walletAddress: action.payload }
    case applicationTypes().SET_WEB3:
      return { ...state, web3: action.payload }
    default:
      return state
  }
}
