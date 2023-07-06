import { useCallback } from 'react';
import s from './landing.module.scss'
import { useOutletContext } from "react-router-dom";
import { useSelector } from 'react-redux';

export const Contributors = () => {
  const [signInButtonClickHandler] = useOutletContext();
  const { walletAddress } = useSelector(state => state.applicationReducer)

  const loginButtonContent = useCallback(() => {
    if (!walletAddress) {
      return 'Sign In'
    } else if (!!walletAddress) {
      return 'Launch App'
    }
  }, [walletAddress])

  return (
    <section className={s.landing__contributors}>
      <div className={s.landing__contributors__decoration}>CRYPTO</div>
      <h2>We are <span>listed on</span></h2>
      <div className={s.landing__contributors__logos}>
        <img src={'data:image/png;base64,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'} />
        <img src={'data:image/png;base64,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'} />
      </div>
      <div className={s.landing__contributors__banner}>
        <h2>Do not delay the start of <span>crypto staking</span></h2>
        <button onClick={signInButtonClickHandler}>{loginButtonContent()}</button>
      </div>
    </section>
  )
}
