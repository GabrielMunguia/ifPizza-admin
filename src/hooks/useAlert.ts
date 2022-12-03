import { IAlert } from './../interfaces/interfaces';
import { useState ,useEffect} from "react";
import Swal from 'sweetalert2';



export const useAlert = () => {

    const [isActive, setIsActive] = useState(false);


    const showAlert =async  ({title,icon="info",text,timer,manualClose}:IAlert) => {
        const options:IAlert={
            title ,
            text,
            icon,

           
            showCancelButton: false,
            showConfirmButton: false,

        }
       
        if(timer!==undefined &&manualClose===undefined){
            options.timer=timer
        }
        if(manualClose!==undefined&&manualClose===true){
        
            options.allowOutsideClick= true;
        }

        
       
        setIsActive(true);
      
        await  Swal.fire(options).then((result) => {
        })
        setIsActive(false);
    }

    const closeAlert = () => {
        Swal.close();
        setIsActive(false);

    }
    
    const showConfirmAlert =async  ({title,icon="question",text,timer,
    
}:IAlert) => {
        const options:IAlert={
            title ,
            text,
            icon,
            showConfirmButton:true,
            showCancelButton: true,
            confirmButtonColor: '#DC3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText:"Aceptar",    
            cancelButtonText:"Cancelar",

            timer
        }
        setIsActive(true);
        //@ts-ignore
        let isConfirm = await  Swal.fire(options).then((result) => {
            if (result.isConfirmed) {
                return true;
            } else {
                return false;
            }
        });

  
    
      return isConfirm
  
  

    }


  

   

    return {showAlert,isActive,showConfirmAlert,closeAlert};
}


