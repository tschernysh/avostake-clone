import Web3 from "web3";
import accountTypes from "./types";
import StakeContract from 'contracts/StakeContract.json'
import Config from "config";

export const AccountActionCreator = {
  setLeaderPersonalInfo: (personalInfo) => ({
    type: accountTypes().SET_LEADER_PERSONAL_INFO,
    payload: personalInfo
  }),
  setLeaderProgressData: (progressData) => ({
    type: accountTypes().SET_LEADER_PROGRESS_DATA,
    payload: progressData
  }),
  setTotalDashboardStatistics: (totalDashboardStatistics) => ({
    type: accountTypes().SET_TOTAL_DASHBOARD_STATISTICS,
    payload: totalDashboardStatistics
  }),
  setPersonalDashboardStatistics: (personalDashboardStatistics) => ({
    type: accountTypes().SET_PERSONAL_DASHBOARD_STATISTICS,
    payload: personalDashboardStatistics
  }),
  setPersonalBonusesStatistics: (personalBonusesStatistics) => ({
    type: accountTypes().SET_PERSONAL_BONUSES_STATISTICS,
    payload: personalBonusesStatistics
  }),
  getLeaderProgressData:
    () => async (dispatch, store) => {

      const web3 = new Web3(Config().WEB3_BSC_URL);

      const stakeContract = new web3.eth.Contract(StakeContract.abi, Config().STAKE_CONTRACT_ADDRESS);

      let turnover = []

      for (let i = 0; i < 14; i++) {
        let currentTurnover

        try {
          currentTurnover = await stakeContract.methods.LEADER_BONUS_TRIGGERS(i).call()
          currentTurnover = currentTurnover.toString()
          currentTurnover = web3.utils.fromWei(currentTurnover, 'ether')
        } catch (error) {
          console.log(error)
        }
        turnover.push(currentTurnover)
      }

      let rewards = []

      for (let i = 0; i < 14; i++) {
        let currentReward

        try {
          currentReward = await stakeContract.methods.LEADER_BONUS_REWARDS(i).call()
          currentReward = currentReward.toString()
          currentReward = web3.utils.fromWei(currentReward, 'ether')
        } catch (error) {
          console.log(error)
        }
        rewards.push(currentReward)
      }

      dispatch(AccountActionCreator.setLeaderProgressData({
        rewards,
        turnover
      }))

    }
}
