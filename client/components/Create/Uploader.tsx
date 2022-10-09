import React from 'react';
import styles from './Create.module.scss';
import { UploaderImg } from './wizard/Step4';
import { useDropzone } from 'react-dropzone';
import { useWizardContext } from './wizard/Wizard';
import { v4 as uuidv4 } from 'uuid';
import { uploadResource } from '../../pages/api/uploadImage';
import { getResourceUrl } from '../../pages/api/getImage';
interface UploaderProps {
  idCount: number;
  setIdCount: (idCount: number) => void;
  imageAmount: number;
  images: UploaderImg[];
  setImages: (images: UploaderImg[]) => void;
}

const Uploader = (props: UploaderProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 5,
    onDrop: async (acceptedFiles) => {
      if (props.images.length + acceptedFiles.length < 6) {
        let uuidFileArray: File[] = [];
        acceptedFiles.forEach((file: File) => {
          Object.defineProperty(file, 'name', {
            writable: true,
            value: uuidv4(),
          });
          uuidFileArray.push(file);
        });
        await updateImageArray(uuidFileArray);
      }
    },
  });

  const updateImageArray = async (files: File[]) => {
    const imageArray: UploaderImg[] = [];
    let idNumber: number = props.idCount;
    let count = 0;
    files.forEach(async (file: File) => {
      await uploadResource(file, encodeURIComponent(file.name));
      const newImage: UploaderImg = {
        fileName: file.name,
        url: await getResourceUrl(file),
        id: idNumber,
      };
      imageArray.push(newImage);
      count++;
      idNumber++;
      if (count === files.length) {
        props.setImages([...props.images, ...imageArray]);
        props.setIdCount(idNumber);
      }
    });
  };
  const { register } = useWizardContext();

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
