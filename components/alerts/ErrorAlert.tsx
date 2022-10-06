import { useAlertContext } from "./AlertContext";
import styles from "./ErrorAlert.module.scss";


type ErrorAlertProps = {
    message: string;
}

const ErrorAlert = (props: ErrorAlertProps) => {
    const alertContext = useAlertContext();
    return (
        <>
            <div className={styles["errorAlert"] + " " + styles["header-tertiary"]} hidden={alertContext.isHidden}>
                {props.message}
            </div>
        </>
    );
}
export default ErrorAlert;

