import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'

import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { useCallback, useEffect, useState } from "react";
import { AuthModal } from "../../components/AuthModals/AuthModal";
import { useDispatch, useSelector } from 'react-redux';
import { routerBook } from 'routes/routerBook';
import { ApplicationActionCreator } from 'store/reducers/application/action-creator';

export const MainLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { walletAddress, redirectTo } = useSelector(state => state.applicationReducer)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signInButtonClickHandler = useCallback(() => {
    if (!walletAddress) {
      setIsModalOpen(true)
    } else {
      navigate(routerBook.dashboard)
      return
    }
  }, [walletAddress])

  useEffect(() => {
    if (!!redirectTo) {
      const path = redirectTo
      dispatch(ApplicationActionCreator.setRedirectTo(null))
      navigate(path)
    }
  }, [redirectTo])

  return (
    <>
      <Header signInButtonClickHandler={signInButtonClickHandler} />
      <AuthModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Outlet context={[signInButtonClickHandler, setIsModalOpen]} />
      <Footer />
    </>
  )
}
