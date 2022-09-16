
import Image from 'next/image';
import React from 'react';
import styles from './FaqAccordion.module.scss';

export type FaqAccordinProps = {
  title: string,
  content: string
}


const FaqAccordion = (props: FaqAccordinProps) => {
  const [isActive, setIsActive] = React.useState<boolean>(false);


  return (
    <div>
      <div className={styles['question']} onClick={() => setIsActive(!isActive)}>
        <div className={styles['question__title']}>{props.title}</div>
        <div className="">{isActive ? <Image alt={'xmark'} src={'/xmark.svg'} width={15} height={15} /> : <Image alt={'plus'} src={'/plus.svg'} width={15} height={15} />}</div>
      </div>
      {isActive && <div className={styles['question__content']}>{props.content}</div>}

      <hr />

    </div>
  );
};

export default FaqAccordion;

