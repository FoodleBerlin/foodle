
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
        <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
          <div>{props.title}</div>
          <div>{isActive ? <Image alt={'xmark'} src={'/xmark.svg'} width={50} height={50} /> : <Image alt={'plus'} src={'/plus.svg'} width={50} height={50} />}</div>
        </div>
        {isActive && <div className="accordion-content">{props.content}</div>}
      </div>
    );
  };
  
  export default Accordion;