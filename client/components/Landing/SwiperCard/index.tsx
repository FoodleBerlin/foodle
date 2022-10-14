import React from 'react';
import styles from './SwiperCard.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Recoverable } from 'repl';
import { BooleanValueNode } from 'graphql';
import Image from 'next/image';

import { useIntl } from 'react-intl';

export type KitchenCardInfo = {
  title: string;
  description: string;
  tags: string[];
  cityRegion: string;
  distance: number;
  price: number;
};

SwiperCore.use([Navigation]);
type SwiperCardProps = {
  index: number;
  cardInfo: KitchenCardInfo;

  width: number;
};

const SwiperCard = (props: SwiperCardProps) => {
  const intl = useIntl();
  const hr = intl.formatMessage({ id: 'component.swiperCard.hr' });
  const indexIncremented = props.index + 1;
  const isMobile = props.width < 450;
  if (props !== undefined) {
    return (
      <div className={styles["card"]}>
        <Image className={styles["slide"]+ " "+ styles["card__image"]} src={'/carousel-image-' + indexIncremented + '.png'} layout={'fill'} />
        <h2 className={styles["location"]+ " primary-btn__smallest"}>
          {props.cardInfo.cityRegion + ' '}
          <img src={'/location.png'} width={15} height={15} />
          {' ' + props.cardInfo.distance} km {'  '}
          <img src={'/euro.png'} width={15} height={15} /> {' ' + props.cardInfo.price}
        </h2>
        {/* TODO: MOve flex center column into info */}
        <div className={styles["info"]}> 
          <h1 className="semi-bold-text">{props.cardInfo.title}</h1>
          {props.width > 450 ? (
            <>
              <p className="semi-bold-text">{props.cardInfo.description}</p>
              <div className={styles['info__tags']}>
                {props.cardInfo.tags.map((tag: string) => {
                  return (
                    <h2 key={tag} className={styles["card__tag"]}>
                      {tag}
                    </h2>
                  );
                })}
              </div>
            </>
          ) : (
            <div className={styles["card__tag--division"]}>
              <div className={styles['info__tags']}>
                {props.cardInfo.tags.map((tag: string) => {
                  return (
                    <h2 key={tag} className={styles["card__tag"]}>
                      {tag}
                    </h2>
                  );
                })}
              </div>
              <p className="semi-bold-text">{props.cardInfo.description}</p>
            </div>
          )}

          <div className={styles["card__bottom"]}>
            <div className={styles["card__badge"]}>
              <h3 className="body-text">
                <img src={'/location-black.png'} width={12} height={12} />
                {' ' + props.cardInfo.distance} km
              </h3>
              <h4 className="body-text">
                <img src={'/euro.png'} width={10} height={10} />
                {' ' + props.cardInfo.price}/{hr}
              </h4>
            </div>
            <button className="primary-btn__smallest">Read More</button>
          </div>
        </div>
      </div>
    );
  } else return <></>;
};
export default SwiperCard;
