import { createContext } from "react";
import { IAlertContext } from "../interfaces/interfaces";

const voidFunction:(() => void)= () => {};
export const AlertContext = createContext<IAlertContext>({
    //@ts-ignore
    showAlert: ()=>{},
    isActive: false,
});