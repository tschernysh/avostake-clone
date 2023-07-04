import {Carousel} from "react-responsive-carousel";

import twentyPercentImage from 'media/img/twenty-percent.png'
import growUpImage from 'media/img/grow-arrows.webp'

import s from './landing.module.scss'

import "react-responsive-carousel/lib/styles/carousel.min.css";

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
                className={isSelected ? s.landing__main_carousel__dot_selected : s.landing__main_carousel__dot}
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
    return (
        <Carousel className={s.landing__main_carousel} {...carouselOptions}>
            <div className={s.landing__main_carousel_slide}>
                <div className={s.landing__main_carousel_slide__text}>
                    <h2>
                        Get up to 20% deposit bonus and
                        <span> earn to 13.2% ROI daily </span>
                    </h2>
                    <h3>
                        We have prepared for you a bonus of 20% to your FIRST deposit, the offer may be limited in time.
                    </h3>
                    <h4>Join today and get 20% bonus on your deposit</h4>
                    <button>Sign in</button>
                </div>
                <img src={twentyPercentImage} alt={'twenty-percent-image'}/>
            </div>
            <div className={s.landing__main_carousel_slide}>
                <div className={s.landing__main_carousel_slide__text}>
                    <h2>
                        Smart investment system of investing in
                        <span> BNB From 7.5% to 13.2% daily ROI </span>
                    </h2>
                    <h3>
                        <span>Today* </span>
                        you have a chance to join us and start earning right now!
                    </h3>
                    <h4>Join today and get 20% bonus on your deposit</h4>
                    <button>Sign in</button>
                </div>
                <img src={growUpImage} alt={'grow-up-image'}/>
            </div>
        </Carousel>
    )
}