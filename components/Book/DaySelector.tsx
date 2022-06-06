import react from 'react';
import { useState } from 'react';

interface DaySelectorProps {
  weekday: string;
  short: string;
  shortest: string;
  handleClick: Function;
  checked: boolean;
}

const DaySelector = (props: DaySelectorProps) => {
  return (
    <>
      <input
        type="checkbox"
        id={'weekday-' + props.short}
        onClick={() => props.handleClick(props.short)}
        defaultChecked={props.checked}
        className="weekday"
      />
      <label className="bold" htmlFor={'weekday-' + props.short}>
        {props.shortest}
      </label>
    </>
  );
};

export default DaySelector;
