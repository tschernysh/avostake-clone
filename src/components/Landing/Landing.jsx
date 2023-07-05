import s from './landing.module.scss'
import { MainCarousel } from "./MainCarousel";
import { LastTransactions } from "./LastTransactions";
import { EasyStart } from "./EasyStart";
import { AboutUs } from "./AboutUs";
import { BuildTeam } from "./BuildTeam";
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

export const Landing = () => {

  const { defaultReferrer } = useSelector(state => state.applicationReducer)
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const referral = Object.fromEntries(searchParams.entries()).ref
    if (referral) {
      localStorage.setItem("refAddress", referral);
    }

  }, [searchParams])

  return (
    <main className={s.landing}>
      <MainCarousel />
      <LastTransactions />
      <EasyStart />
      <AboutUs />
      <BuildTeam />
    </main>
  )
}
