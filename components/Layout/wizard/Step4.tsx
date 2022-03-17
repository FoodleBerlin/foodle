import { FormData, useWizardContext } from './Wizard';
import { useEffect, useState } from 'react';
import Uploader from '../../Create/Uploader';
import Preview from '../../Create/Preview';
import styles from '../../Create/Create.module.scss';

export interface UploaderImage {
  file?: any;
  size: number;
  name: string;
  id?: number;
  s3Id?: string;
}

export default function Step4() {
  const wizardContext = useWizardContext();
  const [idCount, setIdCount] = useState(1);
  const [images, setImages] = useState<UploaderImage[]>([]);
  const [s3Ids, setS3Ids] = useState<string[]>([]);

  useEffect(() => {
    wizardContext.setValue('images', s3Ids as FormData['images'], {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  }, [s3Ids]);

  const addToImages = (url: UploaderImage) => {
    setImages([...images, url]);
  };
  const deleteImage = (id: number) => {
    let idAmount = 1;
    if (images.length > 0) {
      // Image to Delete
      const image = images.find((image: UploaderImage) => image.id === id);
      // Delete its s3ID
      const filterS3Ids = s3Ids.filter((s3Id: string) => s3Id != image?.s3Id);
      setS3Ids(filterS3Ids);
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
    <div>
      <h1 className="header-secondary">Photo time</h1>
      <h2 className="body-text">
        Upload at least 5 photos of the kitchen.Features should be visible. If your kitchen is not verified, these
        photos will be the major selling point.
      </h2>
      {
        //TODO:Use another utility class instead of flex row or modify flex row
      }
      <div className={styles['drag-drop'] + ' flex-row'}>
        <Uploader
          addToImages={(image: UploaderImage) => addToImages(image)}
          idCount={idCount}
          setImages={(images: UploaderImage[]) => setImages(images)}
          imageAmount={images.length}
          setIdCount={(id) => setIdCount(id)}
          images={images}
          setS3Ids={(idArray: string[]) => setS3Ids(idArray)}
        />
        {images.length > 0 ? (
          <Preview
            addToImages={(image: UploaderImage) => addToImages(image)}
            setImages={(images: UploaderImage[]) => setImages(images)}
            deleteImage={(id: number) => deleteImage(id)}
            images={images}
          />
        ) : null}
      </div>
    </div>
  );
}
