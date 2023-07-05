const { default: Web3 } = require("web3");

export const initWeb3 = async () => {
  const web3 = new Web3(window.ethereum);

  const connectedAccounts = await web3.eth.getAccounts()

  const currentAccount = window.ethereum.selectedAddress

  web3.eth.defaultAccount = currentAccount

  return web3

}


