import Image from "next/image";
import styles from "./Alert.module.scss";
import { useAlertContext } from "./AlertContext";


type AlertProps = {
    message: string;
    type: "error" | "success" | "info";
}



const Alert = (props: AlertProps) => {
    const alertContext = useAlertContext();
    return (<div className={styles[props.type + "Alert"]} hidden={alertContext.isHidden}>{props.message}
        <div className={styles["imageWrapper"]}>
            <Image alt="Dismiss Dialog Button" src="/close-x.svg" width={20} height={20} onClick={() => alertContext.shouldHide(true)} />
        </div>
    </div >)
}
export default Alert;

