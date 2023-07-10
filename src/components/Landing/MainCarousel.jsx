import { Carousel } from "react-responsive-carousel";

import tenPercentImage from 'media/img/ten-percent.png'
import growUpImage from 'media/img/grow-arrows.webp'

import s from './landing.module.scss'

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useSelector } from "react-redux";
import { useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { routerBook } from "routes/routerBook";

const carouselOptions = {
  autoPlay: false,
  showArrows: false,
  swipeable: true,
  emulateTouch: true,
  infiniteLoop: true,
  showThumbs: false,
  showStatus: false,
  renderIndicator: (onClickHandler, isSelected, index, label) => {
    return (
      <li
        className={isSelected ? s.landing__main__carousel__dot_selected : s.landing__main__carousel__dot}
        onClick={onClickHandler}
        onKeyDown={onClickHandler}
        value={index}
        key={index}
        role="button"
        tabIndex={0}
        aria-label={`${label} ${index + 1}`}
      >
      </li>
    );
  }
}


export const MainCarousel = () => {

  const { walletAddress } = useSelector(state => state.applicationReducer)
  const navigate = useNavigate()
  const [signInButtonClickHandler] = useOutletContext();

  const loginButtonContent = useCallback(() => {
    if (!walletAddress) {
      return 'Sign In'
    } else if (!!walletAddress) {
      return 'Launch App'
    }
  }, [walletAddress])

  const handleLoginButton = () => {
    if (!!walletAddress) {
      navigate(routerBook.dashboard)
    } else {
      signInButtonClickHandler()
    }
  }

  return (
    <section className={s.landing__main}>
      <Carousel className={s.landing__main__carousel} {...carouselOptions}>
        <div className={s.landing__main__carousel__slide}>
          <div className={s.landing__main__carousel__slide__text}>
            <h2>
              Get up to 10% deposit bonus and
              <span> earn to 12% ROI daily </span>
            </h2>
            <h3>
              We have prepared for you a bonus of 10% to your FIRST deposit, the offer may be limited in
              time.
            </h3>
            <h4>Join today and get 10% bonus on your deposit</h4>
            <button onClick={handleLoginButton}>{loginButtonContent()}</button>
          </div>
          <img src={tenPercentImage} alt={'twenty-percent-image'} />
        </div>
        <div className={s.landing__main__carousel__slide}>
          <div className={s.landing__main__carousel__slide__text}>
            <h2>
              Smart investment system of investing in
              <span> BUSD From 7.1% to 12% daily ROI </span>
            </h2>
            <h3>
              <span>Today* </span>
              you have a chance to join us and start earning right now!
            </h3>
            <h4>Join today and get 10% bonus on your deposit</h4>
            <button onClick={handleLoginButton}>{loginButtonContent()}</button>
          </div>
          <img src={growUpImage} alt={'grow-up-image'} />
        </div>
      </Carousel>
    </section>
  )
}
