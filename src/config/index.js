const Config = () => {
  if (process.env.REACT_APP_ENV === 'production') {
    return {
      DEPLOY_URL_PREFIX: '',
      WEB3_BSC_URL: 'https://bsc-dataseed.binance.org/',
      TOKEN_CONTRACT_ADDRESS: '',
      STAKE_CONTRACT_ADDRESS: '',
      HEARTBEAT_RATE: 20,
      BASE_URL: 'https://bixter.com/?ref=',
      PROJECT_ID: '5b88e380cb7f9736a57c4175e26f1c55',
      CHAIN_ID: 56,
    }
  } if (process.env.REACT_APP_ENV === 'ghpages') {
    return {
      DEPLOY_URL_PREFIX: '/avostake-clone',
      WEB3_BSC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      TOKEN_CONTRACT_ADDRESS: '0x1E694CA11967Aa260BF32cedc9f5C09453E968d4',
      STAKE_CONTRACT_ADDRESS: '0x4746623b37aF81C710e0E4B33dc46ED5A703CEda',
      HEARTBEAT_RATE: 20,
      BASE_URL: 'https://bixter.com/?ref=',
      PROJECT_ID: '5b88e380cb7f9736a57c4175e26f1c55',
      CHAIN_ID: 97,
    }
  } else {
    return {
      DEPLOY_URL_PREFIX: '',
      WEB3_BSC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      TOKEN_CONTRACT_ADDRESS: '0x1E694CA11967Aa260BF32cedc9f5C09453E968d4',
      STAKE_CONTRACT_ADDRESS: '0x0D3f49738a110dd2eD967d3B511063D4f72Db329',
      HEARTBEAT_RATE: 20,
      BASE_URL: 'https://bixter.com/?ref=',
      PROJECT_ID: '5b88e380cb7f9736a57c4175e26f1c55',
      CHAIN_ID: 97,
    }
  }
}

export default Config
