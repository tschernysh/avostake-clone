import s from './header.module.scss'
import logo from 'media/img/logo.svg'
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { useSelector } from 'react-redux';
import { useCallback } from 'react';

export const Header = ({ signInButtonClickHandler }) => {
  const scrollDirection = useScrollDirection()
  const { walletAddress } = useSelector(state => state.applicationReducer)


  const loginButtonContent = useCallback(() => {
    if (!walletAddress) {
      return 'Sign In'
    } else if (!!walletAddress) {
      return 'Launch App'
    }
  }, [walletAddress])

  return (
    <>
      <header data-hidden={scrollDirection === 'down'} className={s.desktop_header}>
        <a className={s.desktop_header__logo} href={'#'}><img src={logo} alt={'logo'} /></a>
        <nav className={s.desktop_header__nav}>
          <a className={s.desktop_header__nav__link} href={'#section-easy-start'}>Invest</a>
          <a className={s.desktop_header__nav__link} href={'#section-about'}>About</a>
          <a className={s.desktop_header__nav__link} href={'#section-rewards'}>Rewards Program</a>
          <button onClick={signInButtonClickHandler}>{loginButtonContent()}</button>
        </nav>
      </header>
{/*      <header data-hidden={scrollDirection === 'down'} className={s.header}>
        <a className={s.header__logo} href={'#'}><img src={logo} alt={'logo'} /></a>
        <nav className={s.header__nav}>
          <a className={s.header__nav_link} href={'#section-easy-start'}>Invest</a>
          <a className={s.header__nav_link} href={'#section-about'}>About</a>
          <a className={s.header__nav_link} href={'#section-rewards'}>Rewards Program</a>
          <button onClick={signInButtonClickHandler}>{loginButtonContent()}</button>
        </nav>
      </header>*/}
    </>
  )
}
