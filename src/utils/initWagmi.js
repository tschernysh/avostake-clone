import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { configureChains, createConfig } from 'wagmi'
import { bsc, bscTestnet } from 'wagmi/chains'
import Config from 'config'

export const initWagmi = () => {
  const chains = [bsc, bscTestnet]
  const projectId = Config().PROJECT_ID

  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, chains }),
    publicClient
  })
  const ethereumClient = new EthereumClient(wagmiConfig, chains)

  return { wagmiConfig, ethereumClient, projectId }
}
