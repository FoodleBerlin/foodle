import { Fragment, MouseEventHandler, useEffect, useState } from 'react';
import styles from './Create.module.scss';
import { UploaderImage } from '../Layout/wizard/Step4';
import Image from 'next/image';
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
  const firstImage = props.images[0];
  const otherImages = props.images.slice(1, 5);
  const [isHovering, setIsHovered] = useState([false, false, false, false, false]);
  const updateIdHover = (id: string, update: boolean) => {
    const temp = Array.from(isHovering);
    temp[parseInt(id) - 1] = update;
    setIsHovered([...temp]);
  };

  const onMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    updateIdHover(event.currentTarget.id, true);
  };
  const onMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    updateIdHover(event.currentTarget.id, false);
  };

  const previewImage = (image: UploaderImage, first: boolean) => {
    const id = image.id ? image.id : -1;

    return (
      <div
        className={first ? styles['preview-img preview-img__first'] : styles['preview-img']}
        id={id.toString()}
        draggable
        key={id}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onDragOver={(e) => handleOver(e)}
        onDragStart={(e) => handleDrag(e)}
        onDrop={(e) => handleDrop(e)}
      >
        <Image src={image.file} alt={image.name} width="600" height="400" />
        {isHovering[id - 1] ? (
          <div className={styles['preview-img__delete']}>
            <button onClick={() => props.deleteImage(id ? id : -1)}>X</button>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  };

  return (
    <Fragment>
      {props.images.length > 0 && previewImage(firstImage, true)}
      {otherImages.length > 0 &&
        otherImages.map((image: UploaderImage, index: number) => {
          return previewImage(image, false);
        })}
    </Fragment>
  );
};
export default Preview;
