import { Outlet, useNavigate } from 'react-router-dom'
import { ApplicationNavigation } from "../../components/ApplicationNavigation/ApplicationNavigation";
import s from './application-layout.module.scss'
import { ApplicationStatistics } from "../../components/ApplicationStatistics/ApplicationStatistics";
import { ApplicationHeader } from "../../components/ApplicationHeader/ApplicationHeader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationActionCreator } from "../../store/reducers/application/action-creator";
import { routerBook } from 'routes/routerBook';
import { useAccount } from 'wagmi';
import { AccountActionCreator } from 'store/reducers/account/action-creator';

export const ApplicationLayout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const { redirectTo, walletAddress } = useSelector(state => state.applicationReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { isDisconnected } = useAccount()

  useEffect(() => {
    if (!!redirectTo) {
      const path = redirectTo
      dispatch(ApplicationActionCreator.setRedirectTo(null))
      navigate(path)
    }
  }, [redirectTo])

  useEffect(() => {
    if (isDisconnected) {
      dispatch(AccountActionCreator.resetUserInfo())
    }
  }, [isDisconnected])

  useEffect(() => {
    if (!walletAddress) {
      navigate(routerBook.main)
    }
  }, [walletAddress])

  useEffect(() => {
    if (isNavOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isNavOpen]);

  return (
    <main className={s.app}>
      <ApplicationNavigation isNavOpen={isNavOpen} />
      <section className={s.app__body}>
        <ApplicationHeader setIsNavOpen={setIsNavOpen} isNavOpen={isNavOpen} />
        <div className={s.app__body__content_wrapper}>
          <div className={s.app__body__content_wrapper__content}>
            <Outlet />
          </div>
          <ApplicationStatistics />
        </div>
      </section>
    </main>
  )
}
