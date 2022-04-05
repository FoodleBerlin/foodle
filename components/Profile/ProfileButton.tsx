import { UploaderImage } from '../Create/wizard/Step4';
import styles from '../../pages/account/Account.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState } from 'react';
import Image from 'next';
import { useWindowDimensions } from '../../utils/hooks';
import Link from 'next/link';

interface ProfileButtonProps {
  imageSetter: (image: UploaderImage | null) => void;
  alreadyUploaded: boolean;
  image?: UploaderImage | null;
}
const convertFiletoUploaderImg = (file: File | null) => {
  if (file === null) return null;
  else {
    return { name: file.name, size: file.size, file: file, s3Id: uuidv4() };
  }
};

const ProfileButton = (props: ProfileButtonProps) => {
  const ref = useRef<HTMLImageElement>(null);
  const getSignedUrl = (imageS3Id: string) => {
    //TODO Create backend Endpoint for creating signed URLs from S3ID
    console.log('Downloaded Link from S3');
    return imageS3Id;
  };

  return !props.alreadyUploaded ? (
    <aside className={styles['account__document-btns'] + ' mt-two'}>
      <label htmlFor="upload" className={'primary-btn bold'}>
        Upload
      </label>
      <input
        id="upload"
        type="file"
        value={props.image?.file}
        onChange={(e) => {
          const file = e?.currentTarget.files ? e?.currentTarget?.files[0] : null;
          const image = convertFiletoUploaderImg(file);
          if (image !== null) props.imageSetter(image);
        }}
      />
    </aside>
  ) : (
    <aside className={styles['account__document-btns'] + ' mt-one'}>
      <a href={getSignedUrl(props?.image?.s3Id ? props.image?.s3Id : '')} download>
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className={'tertiary-btn bold'}
        >
          View
        </button>
      </a>
      <button
        onClick={() => {
          props.imageSetter(null);
        }}
        className={'delete-btn bold'}
      >
        Delete
      </button>
    </aside>
  );
};

export default ProfileButton;