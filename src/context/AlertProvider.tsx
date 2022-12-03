import React from 'react'
import { useAlert } from '../hooks/useAlert'

import { AlertContext } from './AlertContext'

export  const AlertProvider = ({children}:{children:React.ReactNode}) => {
    const { showAlert,isActive,showConfirmAlert,closeAlert} = useAlert();

    
  return (
    <AlertContext.Provider value={{
        showAlert:showAlert,
       isActive:isActive!==null?(isActive?true:false):false,
       showConfirmAlert:showConfirmAlert,
       closeAlert:closeAlert
    }}>
    {children}
    </AlertContext.Provider>
  )
}
