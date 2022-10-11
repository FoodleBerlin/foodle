import React, { useState } from 'react';
import PreviewImage from '../PreviewImage';
import { UploaderImg } from '../wizard/Step4';
import styles from './Preview.module.scss';
interface PreviewProps {
  deleteImage: (id: number) => void;
  setImages: (files: any) => void;
  images: UploaderImg[];
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

    const dragImage = props.images.find((image: UploaderImg) => image.id === dragId);
    const dropImage = props.images.find((image: UploaderImg) => image.id == parseInt(event.currentTarget.id));
    let arr;
    if (!dragImage || !dropImage) {
      return;
    } else {
      arr = moveItem(findIndex(dragImage), findIndex(dropImage));
    }
  };
  const findIndex = (item: UploaderImg) => {
    return props.images.indexOf(item);
  };

  const moveItem = (from: number, to: number) => {
    props.setImages((prev: UploaderImg[]) => {
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

  return (
    <>
      <div className={styles['gallery__container']}>
        <div className={styles['gallery']}>
          {props.images.length > 0 &&
            props.images.map((image: UploaderImg, index: number) => {
              return (
                <PreviewImage
                  style={'gallery__item--' + index}
                  image={image}
                  index={index}
                  onMouseEnter={onMouseEnter}
                  onMouseLeave={onMouseLeave}
                  handleOver={(e) => handleOver(e)}
                  handleDrag={(e) => handleDrag(e)}
                  handleDrop={(e) => handleDrop(e)}
                  isIdHovered={() => isIdHovered(index)}
                  key={index}
                  deleteImage={(id) => props.deleteImage(id)}
                />
              );
              //   previewImage(image, React.createRef<HTMLDivElement>(), index)
            })}
        </div>
      </div>
    </>
  );
};
export default Preview;
