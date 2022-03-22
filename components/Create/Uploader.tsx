import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './Create.module.scss';
import { UploaderImage } from '../Layout/wizard/Step4';
import { useDropzone } from 'react-dropzone';
import { FormData, useWizardContext } from '../Layout/wizard/Wizard';
import { v4 as uuidv4 } from 'uuid';
import { Storage } from 'aws-amplify';
interface UploaderProps {
  idCount: number;
  setIdCount: (idCount: number) => void;
  imageAmount: number;
  images: UploaderImage[];
  setImages: (images: UploaderImage[]) => void;
  setNewImages: (images: UploaderImage[]) => void;
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
        props.setNewImages([...acceptedFiles]);
        props.setIdCount(idNumber);
      }
    },
  });

  const { register } = useWizardContext();
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
      <p className="body-text grey-text">{props.idCount - 1 + '/5 photos uploaded'}</p>
      <p className="body-text bold underlined">Upload from device</p>
    </div>
  );
};

export default Uploader;
