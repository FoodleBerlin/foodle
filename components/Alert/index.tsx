import { useAlertContext } from "./AlertContext";
import styles from "./ErrorAlert.module.scss";


type AlertProps = {
    message: string;
    type: "error" | "success" | "info";
}



const Alert = (props: AlertProps) => {
    const alertContext = useAlertContext();
    return (<div className={styles[props.type + "Alert"]} hidden={alertContext.isHidden}>{props.message}</div>)


}
export default Alert;

