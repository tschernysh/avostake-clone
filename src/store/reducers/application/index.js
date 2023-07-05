import applicationTypes from './types'

export const initialState = {
  walletAddress: null,
  web3: null,
  defaultReferrer: '',
  bnbBalance: 0,
  tokenBalance: 0,
}

export default function applicationReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case applicationTypes().SET_WALLET_ADDRESS:
      return { ...state, walletAddress: action.payload }
    case applicationTypes().SET_WEB3:
      return { ...state, web3: action.payload }
    case applicationTypes().SET_DEFAULT_REFERRER:
      return { ...state, defaultReferrer: action.payload }
    case applicationTypes().SET_BNB_BALANCE:
      return { ...state, bnbBalance: action.payload }
    case applicationTypes().SET_TOKEN_BALANCE:
      return { ...state, tokenBalance: action.payload }
    default:
      return state
  }
}
