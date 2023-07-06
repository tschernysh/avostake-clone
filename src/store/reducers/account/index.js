import accountTypes from "./types";

export const initialState = {
  totalDashboardStatistics: {
    totalInvested: 0,
    participants: 0,
    refReward: 0,
  },
  personalDashboardStatistics: {
    totalInvested: 0,
    totalWithdrawal: 0,
    refReward: 0,
    leaderBonuses: 0
  },
  personalBonusesStatistics: {
    refReward: 0,
    leaderBonuses: 0,
    structureMembers: 0,
    structureTurnover: 0
  },
  contractInfo: {
    invested: 0,
    withdrawn: 0,
    match_bonus: 0,
    totalLeadBonusReward: 0,
    totalPlayers: 0,
    bonuses_obj: {}
  },
  userInfo: {
    payoutOf: 0,
    upline: null,
    dividents: 0,
    match_bonus: 0,
    leader_bonus: 0,
    last_payout: 0,
    total_invested: 0,
    total_withdrawn: 0,
    total_match_bonus: 0,
    leadTurnover: 0,
    leadBonusReward: 0,
    receivedBonuses: [],
    deposits: [],
    structure: [],
    referrals: 0,
    refTurnover: []
  },
  leaderPersonalInfo: {
    personalLevel: 0,
    totalTurnover: 0,
  },
  leaderProgressData: {
    rewards: [],
    turnover: []
  }
}

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case accountTypes().SET_TOTAL_DASHBOARD_STATISTICS:
      return { ...state, totalDashboardStatistics: action.payload }
    case accountTypes().SET_PERSONAL_DASHBOARD_STATISTICS:
      return { ...state, personalDashboardStatistics: action.payload }
    case accountTypes().SET_PERSONAL_BONUSES_STATISTICS:
      return { ...state, personalBonusesStatistics: action.payload }
    case accountTypes().SET_LEADER_PERSONAL_INFO:
      return { ...state, leaderPersonalInfo: action.payload }
    case accountTypes().SET_LEADER_PROGRESS_DATA:
      return { ...state, leaderProgressData: action.payload }
    case accountTypes().SET_USER_INFO:
      return { ...state, userInfo: action.payload }
    case accountTypes().SET_CONTRACT_INFO:
      return { ...state, contractInfo: action.payload }
    default:
      return state
  }
}
