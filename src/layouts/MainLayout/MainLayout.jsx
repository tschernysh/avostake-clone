import { Outlet } from 'react-router-dom'

import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { useCallback, useEffect, useState } from "react";
import { AuthModal } from "../../components/AuthModals/AuthModal";
import { useSelector } from 'react-redux';

export const MainLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { walletAddress } = useSelector(state => state.applicationReducer)

  const signInButtonClickHandler = useCallback(() => {
    if (!walletAddress) {
      setIsModalOpen(true)
    } else {
      return
      // redirect to dashboard
    }
  }, [walletAddress])

  return (
    <>
      <Header signInButtonClickHandler={signInButtonClickHandler} />
      <AuthModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Outlet context={[signInButtonClickHandler, setIsModalOpen]} />
      <Footer />
    </>
  )
}
