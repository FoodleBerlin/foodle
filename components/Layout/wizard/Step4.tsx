import { FormData, useWizardContext } from './Wizard';
import React, { useEffect, useState } from 'react';
import Uploader from '../../Create/Uploader';
import Preview from '../../Create/Preview';
import styles from '../../Create/Create.module.scss';

export interface UploaderImage {
  file?: any;
  id?: number;
  s3Id?: string;
  size: number;
  name: string;
}

export default function Step4() {
  const wizardContext = useWizardContext();
  const [idCount, setIdCount] = useState(1);
  const [images, setImages] = useState<UploaderImage[]>(wizardContext.getValues().images);

  useEffect(() => {
    wizardContext.setValue('images', images as FormData['images'], {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [images]);

  const deleteImage = (id: number) => {
    let idAmount = 1;
    if (images.length > 0) {
      // Image to Delete
      const image = images.find((image: UploaderImage) => image.id === id);
      // Delete its Drag and Drop ID
      const filterImages = images.filter((image: UploaderImage) => image.id != id);
      //Reset Ids
      filterImages.forEach((image) => {
        image.id = idAmount;
        idAmount++;
      });
      setImages(filterImages);
    }
    setIdCount(idCount - 1);
  };

  return (
    <div className={styles['main']}>
      <h1 className="header-secondary mb-two">Photo time</h1>
      <h2 className="body-text subtle-text mb-two">
        Upload at least 5 photos of the kitchen.Features should be visible. If your kitchen is not verified, these
        photos will be the major selling point.
      </h2>
      {
        //TODO:Use another utility class instead of flex row or modify flex row
      }
      <div className={styles['drag-drop']}>
        <Uploader
          idCount={idCount}
          setImages={(images: UploaderImage[]) => setImages(images)}
          imageAmount={images.length}
          setIdCount={(id) => setIdCount(id)}
          images={images}
        />
        {images.length > 0 ? (
          <Preview
            setImages={(images: UploaderImage[]) => setImages(images)}
            deleteImage={(id: number) => deleteImage(id)}
            images={images}
          />
        ) : null}
      </div>
    </div>
  );
}
