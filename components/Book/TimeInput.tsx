interface TimeInputProps {
  handleChange: Function;
  shortest: string;
  short: string;
  timeValue: { from: string; to: string };
}

const TimeInput = (props: TimeInputProps) => {
  return (
    <span className={'timeinput__wrapper' + ' mb-one'}>
      <input type="checkbox" checked id={'time-' + props.short} className="weekday" onChange={() => {}} />{' '}
      {/* empty "onChange" to suppress "missing onChange"-warning */}
      <label className="bold" htmlFor={'time-' + props.short}>
        {props.shortest}
      </label>
      <input
        onChange={(e) => props.handleChange(props.short, 'from', e.target.value)}
        className="standard-form__inputTime"
        type="time"
        value={props.timeValue.from}
      />
      <label className="small-text bold ml-one"> to</label>
      <input
        onChange={(e) => props.handleChange(props.short, 'to', e.target.value)}
        className="standard-form__inputTime"
        type="time"
        value={props.timeValue.from}
      />
    </span>
  );
};
export default TimeInput;
