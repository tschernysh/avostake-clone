const Config = () => {
  if (process.env.REACT_APP_ENV === 'production') {
    return {
      WEB3_BSC_URL: 'https://bsc-dataseed.binance.org/'
    }
  } else {
    return {
      WEB3_BSC_URL: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    }
  }
}
