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
                  handleOver={(e) => handleOver(e)}
                  handleDrag={(e) => handleDrag(e)}
                  handleDrop={(e) => handleDrop(e)}
                  key={index}
                  deleteImage={(id) => props.deleteImage(id)}
                />
              );
            })}
        </div>
      </div>
    </>
  );
};
export default Preview;
