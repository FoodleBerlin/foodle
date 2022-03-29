import styles from '../Create/wizard/Wizard.module.scss';
interface TimeInputProps {
  handleChange: Function;
  shortest: string;
  short: string;
  timeValue: { from: string; to: string };
}

const TimeInput = (props: TimeInputProps) => {
  return (
    <>
      <span className="weekdays__timeInputWrapper mb-one">
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
        <label className="small-text bold"> to</label>
        <input
          onChange={(e) => props.handleChange(props.short, 'to', e.target.value)}
          className="standard-form__inputTime"
          type="time"
          value={props.timeValue.from}
        />
      </span>
    </>
  );
};
export default TimeInput;
