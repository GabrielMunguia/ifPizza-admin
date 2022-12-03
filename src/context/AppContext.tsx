import { createContext } from "react";
import { IAlertContext, IAppContext, IUser } from "../interfaces/interfaces";



export const AppContext = createContext<IAppContext>({
   
    session:{
        user:{
            user: "",
            isAuth: false,
        }
        ,
        logOut: () => {},
        logIn: (user: string,password:string) => {},
        
       
        
    },
     alert:{
         //@ts-ignore
        showAlert: ()=>{},
        isActive: false,
        
     }
});