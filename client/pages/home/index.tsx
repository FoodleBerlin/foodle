import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { TextPlugin } from 'gsap/dist/TextPlugin';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import posthog from 'posthog-js';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import Carousel from '../../components/Landing/Carousel';
import LandingInfo from '../../components/Landing/LandingInfo';
import StoryCarousel from '../../components/Landing/StoryCarousel';
import BurgerMenu from '../../components/Layout/BurgerMenu';
import Footer from '../../components/Layout/Footer';
import Modal from '../../components/Layout/Modal';
import Navbar from '../../components/Layout/Navbar/Navbar';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { kitchenCards } from '../../utils/kitchenCards';
import styles from './Home.module.scss';

const Home: NextPage = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const intl = useIntl();

  const title = intl.formatMessage({ id: 'page.home.hero.title' });
  const click = intl.formatMessage({ id: 'page.home.carousel.click' });
  const description = intl.formatMessage({ id: 'page.home.hero.description' });
  const easyAdjectives = intl.formatMessage({ id: 'page.home.hero.easyAdjectives' });
  const submitLabel = intl.formatMessage({ id: 'page.home.hero.submit.label' });
  const food = intl.formatMessage({ id: 'page.home.food' });
  const dreams = intl.formatMessage({ id: 'page.home.dreams' });
  const carouselTitle = intl.formatMessage({ id: 'page.home.carousel.title' });
  const signupLabel = intl.formatMessage({ id: 'page.home.signup.label' });
  const signup = intl.formatMessage({ id: 'page.home.signup' });

  const { height, width } = useWindowDimensions();

  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);
  const dreamsScroll = useRef(null);
  const easyRef = useRef(null);

  const getTextTransformTimeline = (textList: string[]) => {
    var textAnimTl = gsap.timeline({ repeat: -1 });
    textList.forEach((text) => {
      textAnimTl.add(gsap.to(easyRef.current, { duration: 1, text: { value: text, delimiter: '' } }));
      textAnimTl.add(gsap.to(easyRef.current, { duration: 1, text: { value: '', delimiter: ' ' } }), '+=2');
    });
    return textAnimTl;
  };

  const getSlideUpAnim = (ref: React.MutableRefObject<null>) => {
    return gsap.to(ref.current, {
      y: -100,
      duration: 5,
      scrollTrigger: {
        trigger: ref.current,

        start: 'bottom 800px',
        end: 'bottom 80px',
        scrub: 0.5,
      },
    });
  };

  const getFadeInAnim = (ref: React.MutableRefObject<null>) => {
    return gsap.fromTo(
      ref.current,
      { autoAlpha: 0 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: ref.current,

          start: '-200px center',
          end: '200px center',
          scrub: 0.5,
          markers: false,
        },
      }
    );
  };
  const signupRef = useRef(null);

  useEffect(() => {
    const dreamScrollAnim = getFadeInAnim(dreamsScroll);
    const signupAnim = getSlideUpAnim(signupRef);
    const textAnimTl = getTextTransformTimeline(easyAdjectives.split(' '));
    return () => {
      textAnimTl.kill();
      signupAnim.kill();
      dreamScrollAnim.kill();
    };
  }, [easyAdjectives, width]);

  const handleOnBuy = () => {
    posthog.capture('my event', { property: 'value' });
  };

  return (
    <div>
      <Head>
        <title>Foodle</title>
        <meta
          name="description"
          content="Foodle is a licensed kitchen rental service where food businesses (like restaurants, bakeries, ice cream shops, etc.) rent out their kitchens to cooks, bakers or other food producers.
          Foodle ist eine .
          "
        />
        <link rel="icon" href="/foodle_logo.svg" />
        <link rel="alternate" href="http://localhost:3000" hrefLang="de" />
        <link rel="alternate" href="http://localhost:3000/en" hrefLang="en" />
      </Head>
      <Navbar />
      <div className={styles['sidebar']}>
        <BurgerMenu />
      </div>
      <div className={styles['hero']}>
        <div className={styles['hero__left']}>
          <div className={styles['hero__left--inner']}>
            <h1 className={'header-primary'}>
              {title}
              <span className={styles['rainbow']} ref={easyRef}></span>.
            </h1>

            <h3 className={'body-text-secondary'}>{description}</h3>
            <div className={styles["promotion-badge"]}>
              <h1 className=" header-primary">€20</h1>
              <h3 className="white-text">{submitLabel}</h3>
            </div>
            <div>
              <button onClick={() => setOpenModal(true)} className="primary-btn bold-medium">
                Sign Up With Google
              </button>
              <Modal onClose={() => setOpenModal(false)} show={openModal} />
            </div>
          </div>
        </div>
        <div className={styles['hero__right']}>
          <div className={styles['hero__right']}>
            <Image alt={'Hero Image'} src={'/hero.png'} width={500} height={550} />
          </div>
        </div>
      </div>
      <h2 className={styles['random-text'] + ' header-secondary'} ref={dreamsScroll}>
        {food}
        <span className={styles['rainbow-multi']}> {dreams} </span>
      </h2>
      <div className={styles['carousel']}>
        <h2 className={styles['carousel__header'] + ' header-secondary centered'}>{carouselTitle}</h2>
        <h3 className={styles['carousel__instructions'] + ' subtitle-text centered'}>{click}</h3>
        <div className={styles['carousel__container']}>
          {width! < 480 ? <StoryCarousel cardInfo={kitchenCards} width={width!} /> : <Carousel width={width!} />}
        </div>
      </div>
      <LandingInfo width={width!} />
      <div ref={signupRef} className={styles['landing-info__lower']}>
        <div>
          <h2 className="subtitle-text semi-bold-text">{signupLabel}</h2>
          <Link href={'/'}>
            <a className="primary-btn">{signup}</a>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
// Leave here for new landing page

// const { locales } = useRouter();
// const [email, setEmail] = useState('');
// const [state, setState] = useState('idle');
// const submitPlaceholder = intl.formatMessage({ id: 'page.home.hero.submit.placeholder' });
// const submit = intl.formatMessage({ id: 'page.home.hero.submit' });
// const signupError = intl.formatMessage({ id: 'page.home.signup.error' });
// const signupSuccess = intl.formatMessage({ id: 'page.home.signup.success' });
// const subscribe = async (e: any) => {
//   setState('Loading');

//   try {
//     const response = await axios.post('/api/subscribe', { email });
//     console.log(response);
//     setState('Success');
//     setEmail('');
//   } catch (e: any) {
//     console.log(e.response.data.error.message);
//     setState('Error');
//   }
// };

/* <form onSubmit={subscribe}>
              <div>
                <input
                  className="standard-form__inputMedium"
                  required
                  id="email-input"
                  name="email"
                  type="email"
                  placeholder={submitPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  disabled={state === 'Loading'}
                  type="submit"
                  className="primary-btn bold-medium"
                  onClick={handleOnBuy} //subscribe
                >
                  {submit}
                </button>
              </div>
              {state === 'Success' || 'Error' ? (
                <h2
                  className={
                    'smallest-text ' + (state === 'Success' ? 'success-msg' : state === 'Error' ? 'error-msg' : '')
                  }
                >
                  {state === 'Success' ? signupSuccess : state === 'Error' ? signupError : ''}
                </h2>
              ) : (
                <></>
              )}
            </form> */
