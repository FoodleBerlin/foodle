import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './Create.module.scss';
import { UploaderImage } from '../Layout/wizard/Step4';
import { useDropzone } from 'react-dropzone';
import { useWizardContext } from '../Layout/wizard/Wizard';
import { v4 as uuidv4 } from 'uuid';
import { Storage } from 'aws-amplify';
interface UploaderProps {
  addToImages: (image: UploaderImage) => void;
  idCount: number;
  setIdCount: (idCount: number) => void;
  imageAmount: number;
  images: UploaderImage[];
  setImages: (images: UploaderImage[]) => void;
}

const Uploader = (props: UploaderProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 5,
    onDrop: (acceptedFiles) => {
      if (props.images.length + acceptedFiles.length < 6) {
        let idNumber: number = props.idCount;
        acceptedFiles.map((file) => {
          Object.assign(file, {
            file: URL.createObjectURL(file),
            id: idNumber,
            s3Id: uuidv4(),
          });
          idNumber++;
        });
        const imageArray = [...props.images, ...acceptedFiles];
        props.setImages(imageArray);
        s3IdUpdate(imageArray);
        props.setIdCount(idNumber);
      }
    },
  });

  const { formState, nextStep, register, setValue, getValues } = useWizardContext();

  const [s3Ids, setS3Ids] = useState<string[]>([]);
  const s3IdUpdate = (images: UploaderImage[]) => {
    const imageArray = Array.from(images);
    imageArray.forEach((image) => {
      if (s3Ids && image.s3Id) {
        setS3Ids([...s3Ids, image.s3Id]);
      }
    });
    setValue('images', s3Ids, {
      shouldTouch: true,
      shouldDirty: true,
      shouldValidate: true,
    });
  };
  const user = {
    id: 'ID20',
  };

  return (
    <div className={styles['drag-drop__uploader']} {...getRootProps()}>
      <input
        type="file"
        id="file"
        accept="image/png, image/jpeg"
        multiple={true}
        {...register('images')}
        {...getInputProps()}
      />
      <p className="body-text">Drag to Upload</p>
      <p className="body-text">{props.idCount - 1 + '/5 photos uploaded'}</p>
      <p className="body-text">Upload from device</p>
    </div>
  );
};

export default Uploader;
