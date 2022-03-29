import react from 'react';
import { useState } from 'react';

interface DaySelectorProps{
    weekday: string;
    short: string;
    shortest: string;
    hanleClick: Function; 
    checked:boolean;
}


const DaySelector = (props:DaySelectorProps) => {

  return (
    <>
      <input
   
        type="checkbox"
        id={'weekday-' + props.short}
        className=' weekday'
        onClick={()=>props.hanleClick(props.short)}
        defaultChecked={props.checked}
      />
      <label className="bold" htmlFor={'weekday-' + props.short}>
        {props.shortest}
      </label>
    </>
  );
};

export default DaySelector;
