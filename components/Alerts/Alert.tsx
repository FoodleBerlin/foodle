import { useAlertContext } from "./AlertContext";
import styles from "./ErrorAlert.module.scss";
export enum DialogType {
    Error,
    Info,
    Success
}

type ErrorAlertProps = {
    message: string;
    type: DialogType;

}

function dialogTypeToScssName(dialogType: DialogType): string {

    switch (dialogType) {
        case 0:
            return "error";
        case 1:
            return "info";
        case 2:
            return "success";

        default:
            return "error";
    }

}

const ErrorAlert = (props: ErrorAlertProps) => {
    const alertContext = useAlertContext();
    return (<div className={styles[dialogTypeToScssName(props.type) + "Alert"]} hidden={alertContext.isHidden}>{props.message}</div>)


}
export default ErrorAlert;

