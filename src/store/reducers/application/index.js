import applicationTypes from './types'

export const initialState = {
  walletAddress: null,
  walletRPC: null,
  defaultReferrer: null,
  bnbBalance: 0,
  tokenBalance: 0,
  isNeedToUpdate: false,
  isDepositTransaction: false,
  isWithdrawTransaction: false,
  notCorrectChain: false,
  redirectTo: null,
  depositData: {
    depositDays: 10,
    depositAmount: 500,
    bonus: 0,
  },
  toastData: null,
}

export default function applicationReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case applicationTypes().SET_WALLET_ADDRESS:
      return { ...state, walletAddress: action.payload }
    case applicationTypes().SET_WEB3:
      return { ...state, walletRPC: action.payload }
    case applicationTypes().SET_DEFAULT_REFERRER:
      return { ...state, defaultReferrer: action.payload }
    case applicationTypes().SET_BNB_BALANCE:
      return { ...state, bnbBalance: action.payload }
    case applicationTypes().SET_TOKEN_BALANCE:
      return { ...state, tokenBalance: action.payload }
    case applicationTypes().SET_DEPOSIT_DATA:
      return { ...state, depositData: { ...state.depositData, ...action.payload } }
    case applicationTypes().SET_IS_NEED_TO_UPDATE:
      return { ...state, isNeedToUpdate: action.payload }
    case applicationTypes().SET_IS_DEPOSIT_TRANSACTION:
      return { ...state, isDepositTransaction: action.payload }
    case applicationTypes().SET_IS_WITHDRAW_TRANSACTION:
      return { ...state, isWithdrawTransaction: action.payload }
    case applicationTypes().SET_NOT_CORRECT_CHAIN:
      return { ...state, notCorrectChain: action.payload }
    case applicationTypes().SET_REDIRECT_TO:
      return { ...state, redirectTo: action.payload }
    case applicationTypes().SET_TOAST_DATA:
      return { ...state, toastData: action.payload }
    default:
      return state
  }
}
