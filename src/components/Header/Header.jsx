import s from './header.module.scss'
import logo from 'media/img/logo.png'
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

export const Header = ({ signInButtonClickHandler }) => {
  const scrollDirection = useScrollDirection()
  const { walletAddress } = useSelector(state => state.applicationReducer)

  const [isHeaderTransparent, setIsHeaderTransparent] = useState(true)

  const [isNavOpen, setIsNavOpen] = useState(false);

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


  const loginButtonContent = useCallback(() => {
    if (!walletAddress) {
      return 'Sign In'
    } else if (!!walletAddress) {
      return 'Launch App'
    }
  }, [walletAddress])

  const mobileNavLinkClickHandler = (event) => {
    if (event.target.tagName.toLowerCase() === 'a') {
      setIsNavOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = event => {
      window.requestAnimationFrame(() => {
        setIsHeaderTransparent(window.scrollY < 200);
      })
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);



  return (
    <>
      <header data-transparent={isHeaderTransparent} data-hidden={scrollDirection === 'down'} className={s.desktop_header}>

        <a className={s.desktop_header__logo} href={'#'}><img src={logo} alt={'logo'} /></a>
        <nav className={s.desktop_header__nav}>
          <a className={s.desktop_header__nav__link} href={'#section-easy-start'}>Invest</a>
          <a className={s.desktop_header__nav__link} href={'#section-about'}>About</a>
          <a className={s.desktop_header__nav__link} href={'#section-rewards'}>Rewards Program</a>
          <button onClick={signInButtonClickHandler}>{loginButtonContent()}</button>
        </nav>
      </header>
      <header data-hidden={scrollDirection === 'down'} className={s.mobile_header}>
        <a className={s.mobile_header__logo} href={'#'}><img src={logo} alt={'logo'} /></a>
        <button onClick={signInButtonClickHandler}>{loginButtonContent()}</button>
        <button onClick={setIsNavOpen.bind(null, !isNavOpen)} className={s.mobile_header__burger_button}>
          {isNavOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
        </button>
        <nav onClick={mobileNavLinkClickHandler} data-nav-open={isNavOpen} className={s.mobile_header__nav}>
          <a className={s.mobile_header__nav__link} href={'#section-easy-start'}>Invest</a>
          <a className={s.mobile_header__nav__link} href={'#section-about'}>About</a>
          <a className={s.mobile_header__nav__link} href={'#section-rewards'}>Rewards Program</a>
        </nav>
      </header>
    </>
  )
}
