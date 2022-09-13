
import React, {useState} from 'react';
import Image from 'next/image';

export type AccordinProps= { 
    title: string, 
    content: string
}


const Accordion=(props: AccordinProps) => {
    const [isActive, setIsActive] = React.useState<boolean>(false);
   
  
    return (
      <div  className="accordion-item">
        <div className="flex flex-direction-row flex-space-between cursor-pointer" onClick={() => setIsActive(!isActive)}>
          <div className="font-size-one-half mb-three mt-one">{props.title}</div>
          <div className="ml-two position-relative onehalf-from-top">{isActive ? <Image alt={'xmark'} src={'/xmark.svg'} width={15} height={15} /> : <Image alt={'plus'} src={'/plus.svg'} width={15} height={15} />}</div>
        </div>
        {isActive && <div style={{maxWidth: 'fit-content'}} className="font-size-one-half mb-three font-color-dark-grey">{props.content}</div>}

          <hr className="color-light-purple mb-two"/>

      </div>
    );
  };
  
  export default Accordion;

