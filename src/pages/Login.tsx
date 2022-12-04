import {useContext} from 'react'
import Style from '../assets/css/pages/login.module.css'
import { FormLayout } from '../components/layouts/FormLayout'
import{Button,TextField} from '@mui/material'
import { AppContext } from '../context/AppContext'
import { useForm } from '../hooks/useForm'
export const Login = () => {
  const {values,handleInputChange}=useForm({
    username:'',
    password:''
});
    const {session}=useContext(AppContext);
    const {logIn}=session;
    const handleLogin = (e:any) => {
      e.preventDefault();
        logIn(values.username,values.password);
    }
  return (
    <div className={Style.container}>
        <div className="d-flex justify-content-center align-items-centers col-12">
        <FormLayout>
            <form className="d-flex flex-column align-items-center" onSubmit={handleLogin}>
            <div className="d-flex justify-content-center">
                <h1 className="text-center">Iniciar Sesión</h1>
            </div>

            <div>
              <img className={Style.logo} src="img/logo.png"/>
            </div>
            
                <TextField
                    id="outlined-basic"
                    label="Usuario"
                    variant="outlined"
                    value={values.username}
                    onChange={handleInputChange}
                    name="username"
                  
                    margin="normal"
                    className="col-12 col-lg-6 col-xl-4"
                />

                <TextField
                    id="outlined-basic"
                    label="Contraseña"
                    variant="outlined"
                    type="password"
                    margin="normal"
                    value={values.password}
                    onChange={handleInputChange}
                    name="password"
                    className="col-12 col-lg-6 col-xl-4"
                />

         

            <div className='d-flex justify-content-center'>
            <Button variant="contained" color="primary" className="mt-5" type="submit">
                Iniciar Sesión
            </Button>
            </div>
            </form>

           </FormLayout>

        </div>

    </div>
  )
}
