
import React, {useState} from 'react';
import Image from 'next/image';
import styles from './FaqAccordion.module.scss';

export type AccordinProps= { 
    title: string, 
    content: string
}


const Accordion=(props: AccordinProps) => {
    const [isActive, setIsActive] = React.useState<boolean>(false);
   
  
    return (
      <div  className="">
        <div className={styles['main__onClick']} onClick={() => setIsActive(!isActive) }>
          <div className={styles['main__onClick__title']}>{props.title}</div>
          <div className="">{isActive ? <Image  alt={'xmark'} src={'/xmark.svg'} width={15} height={15} /> : <Image alt={'plus'} src={'/plus.svg'} width={15} height={15} />}</div>
        </div>
        {isActive && <div className={styles['main__content']}>{props.content}</div>}

        <hr />

      </div>
    );
  };
  
  export default Accordion;

