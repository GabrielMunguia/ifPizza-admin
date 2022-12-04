import Style from '../assets/css/pages/home.module.css'
import { FormLayout } from '../components/layouts/FormLayout'
export const Home = () => {

 
  

  return (
    <div className={Style.container}>  
    <FormLayout>
      <h1 className='text-center'>Bienvenido</h1>
     <div className='d-flex justify-content-center mt-5 mb-5'>
     <img className={Style.logo} src="/img/logo.png"/>
     </div>
    </FormLayout>
      
      

      
    </div>
  )
}
