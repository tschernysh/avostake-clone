import Web3 from "web3";
import accountTypes from "./types";
import StakeContract from 'contracts/StakeContract.json'
import Config from "config";
import accountReducer from ".";
import { ApplicationActionCreator } from "../application/action-creator";
import { initWeb3 } from "utils/initWeb3";

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
  setUserInfo: (userInfo) => ({
    type: accountTypes().SET_USER_INFO,
    payload: userInfo
  }),
  setContractInfo: (contractInfo) => ({
    type: accountTypes().SET_CONTRACT_INFO,
    payload: contractInfo
  }),
  getContractInfo:
    () => async (dispatch, store) => {
      const walletRPC = store().applicationReducer.walletRPC
      const web3 = await initWeb3(walletRPC)

      const stakeContract = new web3.eth.Contract(StakeContract.abi, Config().STAKE_CONTRACT_ADDRESS);

      let contractInfo

      try {
        contractInfo = await stakeContract.methods.contractInfo().call()

        let invested = contractInfo[0]
        invested = +web3.utils.fromWei(invested.toString(), 'ether')

        let withdrawn = contractInfo[1]
        withdrawn = +web3.utils.fromWei(withdrawn.toString(), 'ether')

        let match_bonus = contractInfo[2]
        match_bonus = +web3.utils.fromWei(match_bonus.toString(), 'ether')

        let totalLeadBonusReward = contractInfo[3]
        totalLeadBonusReward = +web3.utils.fromWei(totalLeadBonusReward.toString(), 'ether')

        let totalPlayers = contractInfo[4]
        totalPlayers = Number(totalPlayers)

        let bonuses_obj = {}
        let bonuses = contractInfo[5]
        bonuses = bonuses.map((el, index) => {
          let newValue = Number(el)
          if (!!newValue) {
            bonuses_obj[`${index}`] = newValue
          } else return el

        })

        contractInfo = {
          invested, withdrawn, match_bonus,
          totalLeadBonusReward, totalPlayers, bonuses_obj
        }
      } catch (error) {
        console.log(error)
        return
      }

      dispatch(AccountActionCreator.setContractInfo(contractInfo))

    },
  getUserInfo:
    () => async (dispatch, store) => {
      const walletRPC = store().applicationReducer.walletRPC
      const walletAddress = store().applicationReducer.walletAddress

      const web3 = await initWeb3(walletRPC)

      const stakeContract = new web3.eth.Contract(StakeContract.abi, Config().STAKE_CONTRACT_ADDRESS);

      let userInfo

      try {
        userInfo = await stakeContract.methods.userInfo(walletAddress).call()
        /*
        const [
          upline, dividents, match_bonus, leader_bonus,
          last_payout, total_invested, total_withdrawn,
          total_match_bonus, leadTurnover, leadBonusReward,
          receivedBonuses, deposits, structure, referrals,
          refTurnover] = userInfo.player
        */


        let payoutOf = await stakeContract.methods.payoutOf(walletAddress).call()
        payoutOf = +web3.utils.fromWei(payoutOf.toString(), 'ether')
        payoutOf = +payoutOf.toFixed(2)

        let upline = userInfo.player[0]
        if (upline === '0x0000000000000000000000000000000000000000') upline = null

        let dividents = userInfo.player[1]
        dividents = +web3.utils.fromWei(dividents.toString(), 'ether')

        let match_bonus = userInfo.player[2]
        match_bonus = +web3.utils.fromWei(match_bonus.toString(), 'ether')

        let leader_bonus = userInfo.player[3]
        leader_bonus = +web3.utils.fromWei(leader_bonus.toString(), 'ether')

        let last_payout = userInfo.player[4]
        last_payout = +web3.utils.fromWei(last_payout.toString(), 'ether')

        let total_invested = userInfo.player[5]
        total_invested = +web3.utils.fromWei(total_invested.toString(), 'ether')

        let total_withdrawn = userInfo.player[6]
        total_withdrawn = +web3.utils.fromWei(total_withdrawn.toString(), 'ether')

        let total_match_bonus = userInfo.player[7]
        total_match_bonus = +web3.utils.fromWei(total_match_bonus.toString(), 'ether')

        let leadTurnover = userInfo.player[8]
        leadTurnover = +web3.utils.fromWei(leadTurnover.toString(), 'ether')

        let leadBonusReward = userInfo.player[9]
        leadBonusReward = +web3.utils.fromWei(leadBonusReward.toString(), 'ether')

        let receivedBonuses = userInfo.player[10]

        let deposits = userInfo.player[11]

        deposits = deposits.map(el => {
          let tarif = el[0]
          tarif = Number(tarif)
          let amount = el[1]
          amount = +web3.utils.fromWei(amount.toString(), 'ether')
          let time = el[2]
          time = Number(time)
          return {
            tarif, amount, time
          }
        })

        let structure = userInfo.player[12]
        structure = structure.map(el => Number(el))

        let referrals = userInfo.player[13]

        let refTurnover = userInfo.player[14]
        refTurnover = refTurnover.map((el, index) => {
          if (index === 0) return +web3.utils.fromWei(el.toString(), 'ether') * 1
          else if (index === 1) return +web3.utils.fromWei(el.toString(), 'ether') * 0.3
          else if (index === 2) return +web3.utils.fromWei(el.toString(), 'ether') * 0.15
          else return +web3.utils.fromWei(el.toString(), 'ether')
        })

        userInfo = {
          payoutOf, upline, dividents, match_bonus, leader_bonus,
          last_payout, total_invested, total_withdrawn,
          total_match_bonus, leadTurnover, leadBonusReward,
          receivedBonuses, deposits, structure, referrals,
          refTurnover
        }

        console.log(userInfo)
      } catch (error) {
        console.log(error)
        return
      }

      dispatch(AccountActionCreator.setUserInfo(userInfo))

    },
  resetUserInfo:
    () => async (dispatch, store) => {
      const userInfo = {
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
      }

      dispatch(AccountActionCreator.setUserInfo(userInfo))
      dispatch(ApplicationActionCreator.setWalletAddress(null))

    },
  getLeaderProgressData:
    () => async (dispatch, store) => {
      const walletRPC = store().applicationReducer.walletRPC

      const web3 = await initWeb3(walletRPC)

      const stakeContract = new web3.eth.Contract(StakeContract.abi, Config().STAKE_CONTRACT_ADDRESS);

      let turnover = []

      for (let i = 0; i < 14; i++) {
        let currentTurnover

        try {
          currentTurnover = await stakeContract.methods.LEADER_BONUS_TRIGGERS(i).call()
          currentTurnover = currentTurnover.toString()
          currentTurnover = +web3.utils.fromWei(currentTurnover, 'ether')
        } catch (error) {
          console.log(error)
          return
        }
        turnover.push(currentTurnover)
      }

      let rewards = []

      for (let i = 0; i < 14; i++) {
        let currentReward

        try {
          currentReward = await stakeContract.methods.LEADER_BONUS_REWARDS(i).call()
          currentReward = currentReward.toString()
          currentReward = +web3.utils.fromWei(currentReward, 'ether')
        } catch (error) {
          console.log(error)
        }
        rewards.push(currentReward)
      }

      dispatch(AccountActionCreator.setLeaderProgressData({
        rewards,
        turnover
      }))
    },
}
