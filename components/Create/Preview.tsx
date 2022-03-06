import { Fragment, useEffect, useState } from 'react';
import styles from './Create.module.scss';
import { UploaderImage } from '../../pages/create2';
import Image from 'next/image';
interface PreviewProps {
  addToImages: (image: UploaderImage) => void;
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
  const firstImage = props.images[0];
  const otherImages = props.images.slice(1, 5);

  return (
    <Fragment>
      <div
        className={styles['preview-img preview-img__first']}
        id={firstImage.id?.toString()}
        draggable
        onDragOver={(e) => handleOver(e)}
        onDragStart={(e) => handleDrag(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <Image src={firstImage.file} alt={firstImage.name} width="600" height="400" />

        <div className={styles['preview-img__delete']}>
          <button onClick={() => props.deleteImage(firstImage.id ? firstImage.id : -1)}>X</button>
        </div>
      </div>
      {otherImages.length > 0 &&
        otherImages.map((element: UploaderImage, index: number) => {
          return (
            <div
              className={styles['preview-img']}
              key={index}
              id={element.id?.toString()}
              draggable
              onDragOver={(e) => handleOver(e)}
              onDragStart={(e) => handleDrag(e)}
              onDrop={(e) => handleDrop(e)}
            >
              <Image src={element.file} alt={element.name} width="600" height="400" />

              <div className={styles['preview-img__delete']}>
                <button onClick={() => props.deleteImage(element.id ? element.id : -1)}>X</button>
              </div>
            </div>
          );
        })}
    </Fragment>
  );
};
export default Preview;
