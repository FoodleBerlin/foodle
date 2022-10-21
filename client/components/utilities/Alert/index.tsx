import Image from "next/image";
import styles from "./Alert.module.scss";
import { useAlertContext } from "./AlertContext";


type AlertProps = {
    message: string;
    type: "error" | "success" | "info";
}



const Alert = (props: AlertProps) => {
    const alertContext = useAlertContext();
    const crossStyle = props.type !== "info" ? styles["imageWrapper--filterWhite"] : "";
    return (<div className={styles[props.type + "Alert"]} hidden={alertContext.isHidden}>{props.message}
        <div className={styles["imageWrapper"] + " " + crossStyle}>
            <Image alt="Dismiss Dialog Button" src="/close.png" width={10} height={10} onClick={() => alertContext.shouldHide(true)} />
        </div>
    </div >)
}
export default Alert;

