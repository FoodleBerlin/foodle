
import React, {useState} from 'react';
import Image from 'next/image';

export type AccordinProps= { 
    title: string, 
    content: string
}


const Accordion=(props: AccordinProps) => {
    const [isActive, setIsActive] = React.useState<boolean>(false);
  
    return (
      <div className="accordion-item">
        <div className="flex flex-direction-row" onClick={() => setIsActive(!isActive)}>
          <div className="font-size-two mb-three">{props.title}</div>
          <div>{isActive ? <Image alt={'xmark'} src={'/xmark.svg'} width={20} height={20} /> : <Image alt={'plus'} src={'/plus.svg'} width={20} height={20} />}</div>
        </div>
        {isActive && <div className="font-size-one-half mb-three font-color-dark-grey">{props.content}</div>}
      </div>
    );
  };
  
  export default Accordion;