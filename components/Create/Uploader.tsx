import React, { ChangeEvent, useRef, useState } from 'react';
import styles from './Create.module.scss';
import { UploaderImage } from '../../pages/create2';
import { useDropzone } from 'react-dropzone';

interface UploaderProps {
  addToImages: (image: UploaderImage) => void;
  idCount: number;
  setIdCount: (idCount: number) => void;
}

const Uploader = (props: UploaderProps) => {
  const user = {
    id: 'user1',
  };
  const [imageValidationError, setImageValidationError] = useState('');

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      imagesSelectedHandler;
      // @ts-ignore
      readAndAddImages(acceptedFiles);
    },
  });

  const imagesSelectedHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (checkMimeType(e)) {
      if (e.target.files === null || e.target.files === undefined) {
      } else {
        readAndAddImages(e.target.files);
      }
    }
  };
  const readAndAddImages = (files: FileList) => {
    const fileArray = Array.from(files);
    fileArray.forEach((file: any, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = {
          file: reader.result,
          size: file.size,
          name: file.name,
          id: props.idCount,
        };
        props.setIdCount(props.idCount + 1);
        setImageValidationError('null');
        props.addToImages(result);
      };
      reader.readAsDataURL(file);
    });
  };

  const checkMimeType = (event: any) => {
    const { files } = event.target;
    let err = '';
    const types = ['image/png', 'image/jpeg', 'image/jpg'];
    for (let x = 0; x < files.length; x += 1) {
      if (types.every((type) => files[x].type !== type)) {
        err += `${files[x].type} is not a supported format\n`;
      }
    }

    if (err !== '') {
      event.target.value = null;
      setImageValidationError(err);
      return false;
    }
    return true;
  };

  return (
    //TODO:Use another utility class instead of flex column or modify flex column
    <div className={styles['drag-drop__uploader'] + ' flex-column'} {...getRootProps()}>
      <input
        type="file"
        name="file"
        id="file"
        onChange={imagesSelectedHandler}
        accept="image/png, image/jpeg"
        multiple
        {...getInputProps()}
      />
      <p className="body-text">Drag to Upload</p>
      <p className="body-text">{props.idCount - 1 + '/5 photos uploaded'}</p>
      <p className="body-text">Upload from device</p>
      {imageValidationError !== 'null' ? (
        <span className={styles['drag-drop__error-msg']}>{imageValidationError}</span>
      ) : null}
    </div>
  );
};

export default Uploader;
