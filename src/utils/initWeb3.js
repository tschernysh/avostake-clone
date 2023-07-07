import Config from "config";

const { default: Web3 } = require("web3");

export const initWeb3 = async (wallet) => {
  const currentNode = wallet || window.ethereum || Config().WEB3_URL
  const web3 = new Web3(currentNode);

  return web3

}


