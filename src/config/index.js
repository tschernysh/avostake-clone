const Config = () => {
  if (process.env.REACT_APP_ENV === 'production') {
    return {
      DEPLOY_URL_PREFIX: '',
      WEB3_BSC_URL: 'https://bsc-dataseed.binance.org/',
      TOKEN_CONTRACT_ADDRESS: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      STAKE_CONTRACT_ADDRESS: '0x9d247Da6960E2503B9eaFEb2F15ACC9FBD19c276',
      HEARTBEAT_RATE: 20,
      BASE_URL: 'https://bixter.tech/?ref=',
      PROJECT_ID: '5b88e380cb7f9736a57c4175e26f1c55',
      CHAIN_ID: 56,
      BSC_SCAN_URL: 'https://bscscan.com/tx/'
    }
  } if (process.env.REACT_APP_ENV === 'ghpages') {
    return {
      DEPLOY_URL_PREFIX: '/avostake-clone',
      WEB3_BSC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      TOKEN_CONTRACT_ADDRESS: '0x1E694CA11967Aa260BF32cedc9f5C09453E968d4',
      STAKE_CONTRACT_ADDRESS: '0x08e10ED3c9eaa72e260f5428ebe353f27291FebF',
      HEARTBEAT_RATE: 20,
      BASE_URL: 'https://bixter.tech/?ref=',
      PROJECT_ID: '5b88e380cb7f9736a57c4175e26f1c55',
      CHAIN_ID: 97,
      BSC_SCAN_URL: 'https://testnet.bscscan.com/tx/'
    }
  } else {
    return {
      DEPLOY_URL_PREFIX: '',
      WEB3_BSC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      TOKEN_CONTRACT_ADDRESS: '0x1E694CA11967Aa260BF32cedc9f5C09453E968d4',
      STAKE_CONTRACT_ADDRESS: '0x08e10ED3c9eaa72e260f5428ebe353f27291FebF',
      HEARTBEAT_RATE: 20,
      BASE_URL: 'https://bixter.tech/?ref=',
      PROJECT_ID: '5b88e380cb7f9736a57c4175e26f1c55',
      CHAIN_ID: 97,
      BSC_SCAN_URL: 'https://testnet.bscscan.com/tx/'
    }
  }
}

export default Config
