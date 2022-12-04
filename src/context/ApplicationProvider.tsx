import {useState,useEffect} from 'react'
import { useAlert } from '../hooks/useAlert'

import { IUser } from '../interfaces/interfaces';
import { login } from '../services/auth';

import { AppContext } from './AppContext'
const INITIAL_STATE:IUser={
    user: localStorage.getItem('user')??"",
    isAuth: localStorage.getItem('user')?true:false,
}
export  const ApplicationProvider = ({children}:{children:React.ReactNode}) => {
    const { showAlert,isActive,showConfirmAlert,closeAlert} = useAlert();
  
    const [user, setUser] = useState<IUser>(INITIAL_STATE);
    const logOut =  () => {
      localStorage.removeItem('user');
        setUser({ 
            user: "",
            isAuth: false,
        });
    };
    const logIn = async (user: string,password:string) => {
      try {
        const resp = await login(user,password);
      if(resp.user){
        localStorage.setItem('user',resp.user.email??"");

        setUser({
            user: resp.user.email??"",
            isAuth: true,
          }, 
        );
      }else{
        showAlert({
          title: "Error",
          text: "Usuario o contraseña incorrectos",
          icon: "error",
          timer: 1500,
        });

        }
      } catch (error) {
        showAlert({
          title: "Error",
          text: "Usuario o contraseña incorrectos",
          icon: "error",
          timer: 1500,
        });
      }
      }
      
    



  
    
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
