import DaySelector from '../Book/DaySelector';
import React, { useState } from 'react';
import TimeInput from '../Book/TimeInput';
export default function BookingSidebar() {
  const [bookingInformation, setBookingInformation] = useState({
    mon: { checked: false, time: { from: '', to: '' } },
    tue: { checked: false, time: { from: '', to: '' } },
    wed: { checked: false, time: { from: '', to: '' } },
    thu: { checked: false, time: { from: '', to: '' } },
    fri: { checked: false, time: { from: '', to: '' } },
    sat: { checked: false, time: { from: '', to: '' } },
    sun: { checked: false, time: { from: '', to: '' } },
  });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [frequency, setFreqency] = useState('');

  //  endDate frequency
  type Short = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  type TimeType = 'from' | 'to';

  const handleDaySelectorChange = (short: Short) => {
    setBookingInformation({
      ...bookingInformation,
      [short]: { checked: !bookingInformation[short].checked, time: { from: '', to: '' } },
    });
  };

  const handleTimeInputChange = (short: Short, timeType: TimeType, timeValue: string) => {
    setBookingInformation({
      ...bookingInformation,
      [short]: { ...bookingInformation[short], time: { ...bookingInformation[short].time, [timeType]: timeValue } },
    });
  };
  return (
    //start - weekdays containers
    <div className="weekDays__container">
      <div>
        <label className="label-text">Starting week of </label> <br />
        <input
          className="standard-form mb-two-half"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        ></input>{' '}
        <br />
        <label className="label-text">Days of week</label>
        {/* prettier-ignore */}
        <div className="mb-one"> 
          <DaySelector hanleClick={handleDaySelectorChange} checked={bookingInformation['mon'].checked} weekday={'Monday'} short={'mon'} shortest={'M'} />
          <DaySelector hanleClick={handleDaySelectorChange} checked={bookingInformation['tue'].checked} weekday={'Tuesday'} short={'tue'} shortest={'T'} />
          <DaySelector hanleClick={handleDaySelectorChange} checked={bookingInformation['wed'].checked} weekday={'Wednesday'} short={'wed'} shortest={'W'} />
          <DaySelector hanleClick={handleDaySelectorChange} checked={bookingInformation['thu'].checked} weekday={'Thursday'} short={'thu'} shortest={'T'} />
          <DaySelector hanleClick={handleDaySelectorChange} checked={bookingInformation['fri'].checked} weekday={'Friday'} short={'fri'} shortest={'F'} />
          <DaySelector hanleClick={handleDaySelectorChange} checked={bookingInformation['sat'].checked} weekday={'Saturday'} short={'sat'} shortest={'S'} />
          <DaySelector hanleClick={handleDaySelectorChange} checked={bookingInformation['sun'].checked} weekday={'Sunday'} short={'sun'} shortest={'S'} />
        </div>
      </div>
      {/* prettier-ignore  */}
      <div>
        {bookingInformation['mon'].checked && <TimeInput timeValue={bookingInformation['mon'].time} handleChange={handleTimeInputChange} shortest={'M'} short={'mon'} />}
        {bookingInformation['tue'].checked && <TimeInput timeValue={bookingInformation['tue'].time} handleChange={handleTimeInputChange} shortest={'T'} short={'tue'} />}
        {bookingInformation['wed'].checked && <TimeInput timeValue={bookingInformation['wed'].time} handleChange={handleTimeInputChange} shortest={'W'} short={'wed'} />}
        {bookingInformation['thu'].checked && <TimeInput timeValue={bookingInformation['thu'].time} handleChange={handleTimeInputChange} shortest={'T'} short={'thu'} />}
        {bookingInformation['fri'].checked && <TimeInput timeValue={bookingInformation['fri'].time} handleChange={handleTimeInputChange} shortest={'F'} short={'fri'} />}
        {bookingInformation['sat'].checked && <TimeInput timeValue={bookingInformation['sat'].time} handleChange={handleTimeInputChange} shortest={'S'} short={'sat'} />}
        {bookingInformation['sun'].checked && <TimeInput timeValue={bookingInformation['sun'].time} handleChange={handleTimeInputChange} shortest={'S'} short={'sun'} />}
      </div>
      <div>
        <select className="standard-form__selectMedium mb-two-half" onChange={(e) => setFreqency(e.target.value)}>
          {' '}
          <option value="weekly">weekly</option>
          <option value="none">none</option>
        </select>
      </div>
      <label className="label-text">Until</label> <br />
      <input
        className="standard-form mb-two-half"
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      ></input>{' '}
      <br />
      <button className="primary-btn">REQUEST TO BOOK</button>
    </div>
  );
}
