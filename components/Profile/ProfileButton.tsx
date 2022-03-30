import { UploaderImage } from '../Create/wizard/Step4';
import styles from '../../pages/account/Account.module.scss';
import { v4 as uuidv4 } from 'uuid';
import { useRef, useState } from 'react';
import Image from 'next';
import { useWindowDimensions } from '../../utils/hooks';

interface ProfileButtonProps {
  imageSetter: (image: UploaderImage) => void;
  alreadyUploaded: boolean;
  image?: UploaderImage;
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
  const ref = useRef<HTMLImageElement>(null);
  const halfOfImageHeight = ref?.current?.offsetHeight ? ref.current?.offsetHeight / 2 : 0;
  const halfOfImageWidth = ref?.current?.offsetWidth ? ref.current?.offsetWidth / 2 : 0;

  const { height, width } = useWindowDimensions();
  const left = width ? width / 2 - halfOfImageWidth : 100;
  const top = height ? height / 2 - halfOfImageHeight : 100;
  const [previous, setPreviousImage] = useState<UploaderImage>();

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
          const image = convertFiletoUploaderImg(e?.currentTarget.files ? e?.currentTarget?.files[0] : null);
          if (image !== null) props.imageSetter(image);
        }}
      />
    </aside>
  ) : (
    <aside className={styles['account__document-btns'] + ' mt-one'}>
      <a href={URL.createObjectURL(props.image?.file)} download>
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
          //@ts-ignore
          props.imageSetter(null);
        }}
        className={'delete-btn bold'}
      >
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
