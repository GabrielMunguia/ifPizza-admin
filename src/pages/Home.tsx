import React, { useContext } from 'react'
import firebase from 'firebase/app'
import { AlertContext } from '../context/AlertContext'

const obtenerTodosLosUsuariosFirebase = async () => {
 


}
export const Home = () => {
  const {showAlert}=useContext(AlertContext);
 
  const showCustomAlert = () => {
    console.log('x')
    showAlert(
      {
        title: 'Error',
        text: 'Error al obtener los usuarios',
        icon: 'info',
        
      },
    
    );
    
  }

  return (
    <div>  
        <h1 onClick={showCustomAlert}>Home</h1>
      
    </div>
  )
}
