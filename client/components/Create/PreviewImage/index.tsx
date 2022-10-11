import Image from 'next/image';
import React, { useState } from 'react';
import { BsXLg } from 'react-icons/bs';
import { UploaderImg } from '../wizard/Step4';
import styles from './PreviewImage.module.scss';

type PreviewImageProps = {
  style: string;
  image: UploaderImg;
  index: number;
  onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleOver: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrag: (event: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  isIdHovered: () => boolean | undefined;
  deleteImage: (id: number) => void;
  //   isHovered: (id: number) => boolean;
};
const PreviewImage = (props: PreviewImageProps) => {
  const id = props.image.id ? props.image.id : -1;

  const [isHovered, setIsHovered] = useState(false);
  const onMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
  };
  const onMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(false);
  };
  return (
    <div
      className={styles['gallery__item'] + ' ' + styles[props.style]}
      id={id.toString()}
      draggable
      key={id}
      onMouseEnter={(e) => onMouseEnter(e)}
      onMouseLeave={(e) => onMouseLeave(e)}
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
