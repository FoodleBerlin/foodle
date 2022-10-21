import { Context, createContext, useContext, useState } from "react";

type AlertContextType = { shouldHide: (show: boolean) => void, isHidden: boolean }

const AlertContext: Context<AlertContextType> = createContext<AlertContextType>({ shouldHide: () => { }, isHidden: false });

const AlertProvider = ({ children }: any) => {
    const [isHidden, shouldHide] = useState<boolean>(true);

    const showAlert = (hide: boolean) => {
        shouldHide(hide);
    }

    return (<>
        <AlertContext.Provider value={{ isHidden: isHidden, shouldHide: showAlert }}>
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
