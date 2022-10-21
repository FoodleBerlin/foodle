import { Context, createContext, useContext, useState } from "react";

type AlertContextType = { shouldHide: (show: boolean) => void, isHidden: boolean, cMessage: string | null, setMessage: (message: string | null) => void }

const AlertContext: Context<AlertContextType> = createContext<AlertContextType>({ shouldHide: () => { }, isHidden: false, cMessage: null, setMessage: () => { } });

const AlertProvider = ({ children }: any) => {
    const [isHidden, shouldHide] = useState<boolean>(true);
    const [message, setMessage] = useState<string | null>(null)
    const showAlert = (hide: boolean) => {
        shouldHide(hide);
    }
    const updateMessage = (message: string | null) => {
        setMessage(message);
    }

    return (<>
        <AlertContext.Provider value={{ isHidden: isHidden, shouldHide: showAlert, cMessage: message, setMessage: updateMessage }}>
            {children}
        </AlertContext.Provider>
    </>)
}

export default AlertProvider;

export function useAlertContext() {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('Component not wrapped by provider');
    }
    return context;
}
