import s from './header.module.scss'

import logo from 'media/img/logo.svg'
import {useScrollDirection} from "../../hooks/useScrollDirection";

export const Header = () => {
    const scrollDirection = useScrollDirection()

    console.log(scrollDirection)

    return (
        <header data-hidden={scrollDirection === 'down'} className={s.header}>
            <a className={s.header__logo} href={'#'}><img src={logo} alt={'logo'}/></a>
            <nav className={s.header__nav}>
                <a className={s.header__nav_link} href={'#section-easy-start'}>Invest</a>
                <a className={s.header__nav_link} href={'#section-about'}>About</a>
                <a className={s.header__nav_link} href={'#section-rewards'}>Rewards Program</a>
                <button>Sign In</button>
            </nav>
        </header>
    )
}