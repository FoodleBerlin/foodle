import Image from 'next/image';
import React, { useState } from 'react';
import { BsXLg } from 'react-icons/bs';
import { UploaderImg } from '../wizard/Step4';
import styles from './PreviewImage.module.scss';

type PreviewImageProps = {
  style: string;
  image: UploaderImg;
  index: number;
  handleOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrag: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  deleteImage: (id: number) => void;
};
const PreviewImage = (props: PreviewImageProps) => {
  const id = props.image.id ? props.image.id : -1;

  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = () => {
    setIsHovered(true);
  };
  const onMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      className={styles['gallery__item'] + ' ' + styles[props.style]}
      id={id.toString()}
      draggable
      key={id}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
      onDragOver={(e) => props.handleOver(e)}
      onDragStart={(e) => props.handleDrag(e)}
      onDrop={(e) => props.handleDrop(e)}
    >
      <Image
        src={props.image.url}
        width={460}
        height={516}
        className={styles['gallery__img']}
        alt={'Image ' + props.index}
      />
      <BsXLg
        style={
          isHovered
            ? {
                fill: 'black',
                position: 'absolute',
                strokeWidth: '1.6',
                stroke: 'black',
                margin: '2rem 3rem 0rem -4rem',
                height: '1.65rem',
                width: '1.65rem',
                cursor: 'pointer',
              }
            : { display: 'none' }
        }
        onClick={() => props.deleteImage(id ? id : -1)}
      />
    </div>
  );
};
export default PreviewImage;
