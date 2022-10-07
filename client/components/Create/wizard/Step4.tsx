import { FormData, touchDirtyValidate, useWizardContext } from './Wizard';
import React, { useEffect, useState } from 'react';
import Uploader from '../Uploader';
import Preview from '../Preview';
import styles from '../../Create/Create.module.scss';
import { deleteResource } from '../../../pages/api/deleteImage';

export type UploaderImg = {
  fileName: string;
  id: number;
  url: string;
};

export default function Step4() {
  const wizardContext = useWizardContext();
  const [idCount, setIdCount] = useState(1);
  const [images, setImages] = useState<UploaderImg[]>(wizardContext.getValues().images);

  useEffect(() => {
    wizardContext.setValue('images', images as FormData['images'], touchDirtyValidate);
  }, [images]);

  const deleteImage = (id: number) => {
    let idAmount = 1;

    if (images!.length > 0) {
      // Image to Delete
      const image = images!.find((image: UploaderImg) => image.id === id);
      // Delete its Drag and Drop ID
      const filterImages = images!.filter((image: UploaderImg) => image.id != id);
      //Reset Ids
      deleteResource(image!.fileName);
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
          setImages={(images: UploaderImg[]) => setImages(images)}
          imageAmount={images ? images.length : 0}
          setIdCount={(id) => setIdCount(id)}
          images={images ? images : []}
        />
        {images && images.length > 0 ? (
          <Preview
            setImages={(images: UploaderImg[]) => setImages(images)}
            deleteImage={(id: number) => deleteImage(id)}
            images={images}
          />
        ) : null}
      </div>
    </div>
  );
}
