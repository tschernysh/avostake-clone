import s from './landing.module.scss'
import { MainCarousel } from "./MainCarousel";
import { LastTransactions } from "./LastTransactions";
import { EasyStart } from "./EasyStart";
import { AboutUs } from "./AboutUs";
import { BuildTeam } from "./BuildTeam";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { Contributors } from "./Contributors";
import { ConfigContext } from 'applicationContext';
import { Web3Modal } from '@web3modal/react';
import { useAccount, useConnect, useWalletClient } from 'wagmi';
import { ApplicationActionCreator } from 'store/reducers/application/action-creator';

export const Landing = () => {

  const { defaultReferrer } = useSelector(state => state.applicationReducer)
  const [searchParams, setSearchParams] = useSearchParams()
  const { ethereumClient, projectId } = useContext(ConfigContext)

  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect
  const { connector: activeConnector, address, isConnecting, isDisconnected } = useAccount()
  const { data, isError } = useWalletClient()
  const dispatch = useDispatch()


  useEffect(() => {
    console.log(address, data)
    if (!!data && !isDisconnected) {
      window.wallet = data
      dispatch(ApplicationActionCreator.connectConnectWallet())
    }
  }, [address, data])

  useEffect(() => {
    const referral = Object.fromEntries(searchParams.entries()).ref
    if (referral) {
      localStorage.setItem("refAddress", referral);
    }

  }, [searchParams])

  return (
    <main className={s.landing}>

      <Web3Modal explorerRecommendedWalletIds={[
        'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
        '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
      ]} projectId={projectId} ethereumClient={ethereumClient} />
      <MainCarousel />
      <LastTransactions />
      <EasyStart />
      <AboutUs />
      <BuildTeam />
      <Contributors />
    </main>
  )
}
