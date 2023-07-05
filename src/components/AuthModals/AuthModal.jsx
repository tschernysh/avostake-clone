import {useEffect, useState} from "react";

import s from './auth.module.scss'
import {GrClose} from "react-icons/gr";

import metamaskIcon from 'media/img/metamask-icon.png'
import walletConnectIcon from 'media/img/wallet-connect-icon.png'
import trustWalletIcon from 'media/img/trust-wallet-icon.png'

export const AuthModal = ({isModalOpen, setIsModalOpen}) => {
    const [modalStatus, setModalStatus] = useState('auth')

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'
        }
        return () => {
            document.body.style.overflow = 'auto'
        };
    }, [isModalOpen]);


    return isModalOpen ? (
        modalStatus === 'auth' ? (
            <dialog className={s.auth} open>
                <div className={s.auth__wrapper}>
                    <button className={s.auth__close} onClick={setIsModalOpen.bind(null, false)}><GrClose color={'#ffffff'}/></button>
                    <b>Connect Your Wallet</b>
                    <div className={s.auth__wrapper__auth_types}>
                        <button><img src={metamaskIcon} alt={'metamask-icon'}/>Metamask</button>
                        <button><img src={walletConnectIcon} alt={'metamask-icon'}/>Wallet Connect</button>
                    </div>
                    <button className={s.auth__help} onClick={setModalStatus.bind('help')}>How to connect a wallet ?</button>
                </div>
            </dialog>
        ) : (
            <dialog className={s.auth} open>
                <div className={s.auth__wrapper}>
                    <button className={s.auth__close} onClick={setModalStatus.bind(null, 'auth')}><GrClose color={'#ffffff'}/></button>
                    <b>Wallet Instructions</b>
                    <p>You need a BNB Chain compatible crypto wallet to start with the AvoStake platform</p>
                    <div className={s.auth__wrapper__help_types}>
                        <button><img src={metamaskIcon} alt={'metamask-icon'}/>Metamask instructions</button>
                        <button><img src={trustWalletIcon} alt={'trust-wallet-icon'}/>Trust wallet instructions</button>
                        <button disabled={true}><img src={walletConnectIcon} alt={'metamask-icon'}/>Wallet Connect instructions</button>
                    </div>

                    <p style={{marginTop: 30}}>You Can Install Here</p>
                    <div className={s.auth__wrapper__help_types}>
                        <a href={'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'} target={'_blank'}><img src={metamaskIcon} alt={'metamask-icon'}/>Install browser extension</a>
                    </div>
                </div>
            </dialog>
        )
    ) : null
}