
import React, {useState, useRef} from 'react';
import Image from 'next/image';

export type AccordinProps= { 
    title: string, 
    content: string
}


const Accordion=(props: AccordinProps) => {
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const [setHeight, setHeightState]= React.useState("0px");
    const [setRotate, setRotateState]= React.useState<string>("accordion_icon");

    const content= useRef(null);

    function toggleAccordion(){
      setIsActive(isActive===false? true: false);
      setHeightState(isActive===true? "0px": "100px");
      setRotateState(isActive===true? "accordion-icon": "rotate");
    }
  
    return (
      <div className="accordion-item">
        <div className="flex flex-direction-row flex-space-between cursor-pointer" onClick={toggleAccordion}>
          <div className="font-size-one-half mb-three mt-one ">{props.title}</div>
          <div className="ml-two position-relative onehalf-from-top"><Image className={`${setRotate}`} alt={'plus'} src={'/plus.svg'} width={15} height={15} /></div>
        </div>
        {isActive && <div className="font-size-one-half mb-three font-color-dark-grey" style={{maxHeight:`${setHeight}`}}>{props.content}</div>}
     
          <hr className="color-light-purple mb-two"/>

      </div>
    );
  };
  
  export default Accordion;

  // const Accordion=(props: AccordinProps) => {
  //   const [isActive, setIsActive] = React.useState<boolean>(false);
  //   const [setHeight, setHeightState]= React.useState("0px");
  //   const [setRotate, setRotateState]= React.useState<string>("accordion_icon");

  //   const content= useRef(null);

  //   function toggleAccordion(){
  //     setIsActive(isActive===false? true: false);
  //     setHeightState(isActive===true? "0px": "100px");
  //     setRotateState(isActive===true? "accordion_icon": "accordion_icon rotate");
  //   }
  
  //   return (
  //     <div className="accordion-item">
  //       <div className="flex flex-direction-row flex-space-between cursor-pointer" onClick={toggleAccordion}>
  //         <div className="font-size-one-half mb-three mt-one ">{props.title}</div>
  //         <div className="ml-two position-relative onehalf-from-top">{isActive ? <Image alt={'xmark'} src={'/xmark.svg'} width={15} height={15} /> : <Image alt={'plus'} src={'/plus.svg'} width={15} height={15} />}</div>
  //       </div>
  //       {isActive && <div className="font-size-one-half mb-three font-color-dark-grey" style={{maxHeight:`${setHeight}`}}>{props.content}</div>}
     
  //         <hr className="color-light-purple mb-two"/>

  //     </div>
  //   );
  // };
  
  // export default Accordion;