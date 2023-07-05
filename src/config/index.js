const Config = () => {
  if (process.env.REACT_APP_ENV === 'production') {
    return {
      WEB3_BSC_URL: 'https://bsc-dataseed.binance.org/',
      TOKEN_CONTRACT_ADDRESS: '',
      STAKE_CONTRACT_ADDRESS: '',
      HEARTBEAT_RATE: 10,
      BASE_URL: 'https://bixter.com/?ref='
    }
  } else {
    return {
      WEB3_BSC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
      TOKEN_CONTRACT_ADDRESS: '0x1E694CA11967Aa260BF32cedc9f5C09453E968d4',
      STAKE_CONTRACT_ADDRESS: '0x0D3f49738a110dd2eD967d3B511063D4f72Db329',
      HEARTBEAT_RATE: 10,
      BASE_URL: 'https://bixter.com/?ref='
    }
  }
}

export default Config
