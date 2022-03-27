import { UploaderImage } from '../Create/wizard/Step4';
import styles from '../../pages/account/Account.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState } from 'react';
import Image from 'next';
import { useWindowDimensions } from '../../utils/hooks';

interface ProfileButtonProps {
  imageSetter: (image: UploaderImage | null) => void;
  alreadyUploaded: boolean;
  image: UploaderImage | null | undefined;
}
const convertFiletoUploaderImg = (file: File | null) => {
  if (file === null) return null;
  else {
    return { name: file.name, size: file.size, file: file, s3Id: uuidv4() };
  }
};

const ProfileButton = (props: ProfileButtonProps) => {
  console.log('imagee' + props.image?.file);
  const [isOpen, setIsOpen] = useState(false);
  console.log('uploaded?' + props.alreadyUploaded);
  const ref = useRef<HTMLImageElement>(null);
  const halfOfImageHeight = ref?.current?.offsetHeight ? ref.current?.offsetHeight / 2 : 0;
  const halfOfImageWidth = ref?.current?.offsetWidth ? ref.current?.offsetWidth / 2 : 0;
  console.log('width' + halfOfImageHeight);

  const { height, width } = useWindowDimensions();
  const left = width ? width / 2 - halfOfImageWidth : 100;
  const top = height ? height / 2 - halfOfImageHeight : 100;

  return !props.alreadyUploaded ? (
    <aside className={styles['account__document-btns'] + ' mt-two'}>
      <label htmlFor="upload" className={'primary-btn bold'}>
        Upload
      </label>
      <input
        id="upload"
        type="file"
        onChange={(e) =>
          props.imageSetter(convertFiletoUploaderImg(e?.currentTarget.files ? e?.currentTarget?.files[0] : null))
        }
      />
    </aside>
  ) : (
    <aside className={styles['account__document-btns'] + ' mt-one'}>
      {/* <a href={URL.createObjectURL(props.image?.file)} download> */}
      <button className={'tertiary-btn bold'}>View</button>
      {/* </a> */}

      <button onClick={() => props.imageSetter(null)} className={'delete-btn bold'}>
        Delete
      </button>
      {/* {isOpen && ( */}
      <dialog
        className="dialog"
        style={
          props.image
            ? {
                position: 'fixed',
                left: '70%',
                width: '100%',
                border: 'none',
                top: '10%',
              }
            : { display: 'none' }
        }
        open
      >
        <img
          className="image"
          ref={ref}
          src={URL.createObjectURL(props.image?.file)}
          max-width={1600}
          max-height={10000}
          onClick={() => setIsOpen(!isOpen)}
          alt="no image"
        ></img>
      </dialog>
      {/* )} */}
    </aside>
  );
};

export default ProfileButton;
