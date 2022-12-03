import {useState,useEffect} from 'react'
import { useAlert } from '../hooks/useAlert'
import { IUser } from '../interfaces/interfaces';

import { AppContext } from './AppContext'

export  const ApplicationProvider = ({children}:{children:React.ReactNode}) => {
    const { showAlert,isActive,showConfirmAlert,closeAlert} = useAlert();
    const [user, setUser] = useState<IUser>({
        user: "Inicial",
        isAuth: false,
    });
    const logOut =  () => {
        setUser({ 
            user: "",
            isAuth: false,
        });
    };
    const logIn = async (user: string,password:string) => {
     console.log('me logueo');
        setUser({
            user: user,
            isAuth: true,
          },
           
        );
    };

    useEffect(() => {
      console.log(user)
    }, [user])
    
  
    
  return (
    <AppContext.Provider  value={
      {
        alert:{
          showAlert,
         isActive:isActive!==null?(isActive?true:false):false,
         showConfirmAlert:showConfirmAlert,
         closeAlert:closeAlert
      },
      session:{
        user:user,
        logOut,
        logIn
       
      } 

     
    }}>
    {children}
    </AppContext.Provider>
  )
}
