import { useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

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
export type UploaderImage = {
  name: string;
  size: number;
  file: any;
  s3Id: string;
};
const ProfileButton = (props: ProfileButtonProps) => {
  const ref = useRef<HTMLImageElement>(null);
  const getSignedUrl = (imageS3Id: string) => {
    //TODO Create backend Endpoint for creating signed URLs from S3ID
    console.log('Downloaded Link from S3');
    return imageS3Id;
  };

  return !props.alreadyUploaded ? (
    <aside className={'profileButton'}>
      <label htmlFor="upload" className={'primary-btn bold'}>
        Upload
      </label>
      <input
        id="upload"
        type="file"
        // value={props.image?.file}s
        onChange={(e) => {
          const file = e?.currentTarget.files ? e?.currentTarget?.files[0] : null;
          const image = convertFiletoUploaderImg(file);
          if (image !== null) props.imageSetter(image);
        }}
      />
    </aside>
  ) : (
    <aside className={'profileButton'}>
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
