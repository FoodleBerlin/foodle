import { Fragment, MouseEventHandler, RefObject, useCallback, useEffect, useRef, useState } from 'react';
import styles from './Create.module.scss';
import { UploaderImage } from '../Layout/wizard/Step4';
import Image from 'next/image';
import { BsXLg } from 'react-icons/bs';
import React from 'react';
interface PreviewProps {
  deleteImage: (id: number) => void;
  setImages: (files: any) => void;
  images: UploaderImage[];
}
const Preview = (props: PreviewProps) => {
  const [dragId, setDragId] = useState<number>(-1);

  const handleOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrag = (event: React.DragEvent<HTMLDivElement>) => {
    const intId = parseInt(event.currentTarget.id);
    setDragId(intId);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const dragImage = props.images.find((image: UploaderImage) => image.id === dragId);
    const dropImage = props.images.find((image: UploaderImage) => image.id == parseInt(event.currentTarget.id));
    let arr;
    if (!dragImage || !dropImage) {
      return;
    } else {
      arr = moveItem(findIndex(dragImage), findIndex(dropImage));
    }
  };
  const findIndex = (item: UploaderImage) => {
    return props.images.indexOf(item);
  };

  const moveItem = (from: number, to: number) => {
    props.setImages((prev: UploaderImage[]) => {
      const temp = [...prev];
      [temp[from], temp[to]] = [temp[to], temp[from]];
      return [...temp];
    });
  };
  const [isHovering0, setIsHovered0] = useState(false);
  const [isHovering1, setIsHovered1] = useState(false);
  const [isHovering2, setIsHovered2] = useState(false);
  const [isHovering3, setIsHovered3] = useState(false);
  const [isHovering4, setIsHovered4] = useState(false);
  const updateIdHover: (id: number, update: boolean) => void = (id: number, update: boolean) => {
    switch (id - 1) {
      case 0:
        return setIsHovered0(update);
      case 1:
        return setIsHovered1(update);
      case 2:
        return setIsHovered2(update);
      case 3:
        return setIsHovered3(update);
      case 4:
        return setIsHovered4(update);
    }
  };
  const isIdHovered = (id: number) => {
    switch (id - 1) {
      case 0:
        return isHovering0;
      case 1:
        return isHovering1;
      case 2:
        return isHovering2;
      case 3:
        return isHovering3;
      case 4:
        return isHovering4;
    }
  };

  const onMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    updateIdHover(Number(event.currentTarget.id), true);
  };
  const onMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    updateIdHover(Number(event.currentTarget.id), false);
  };
  const previewImage = (image: UploaderImage, ref: RefObject<HTMLDivElement>, index: number) => {
    const id = image.id ? image.id : -1;

    return (
      <div
        ref={ref}
        className={'gallery__item gallery__item--' + index}
        id={id.toString()}
        draggable
        key={id}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onDragOver={(e) => handleOver(e)}
        onDragStart={(e) => handleDrag(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <Image src={image.file} width={460} height={516} className="gallery__img" alt={'Image ' + index} />
        <BsXLg
          style={
            isIdHovered(id)
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

  return (
    <Fragment>
      <div className="gallery__container">
        <div className="gallery">
          {props.images.length > 0 &&
            props.images.map((image: UploaderImage, index: number) => {
              return previewImage(image, React.createRef<HTMLDivElement>(), index);
            })}
        </div>
      </div>
    </Fragment>
  );
};
export default Preview;
