import Config from "config";

const { default: Web3 } = require("web3");

export const initWeb3 = async (wallet) => {
  const currentNode = wallet || window.ethereum || Config().WEB3_URL
  const web3 = new Web3(currentNode);

  if (typeof web3.currentProvider === 'undefined') {
    web3.setProvider(new Web3.providers.HttpProvider(Config().WEB3_BSC_URL));
  }

  return web3

}


