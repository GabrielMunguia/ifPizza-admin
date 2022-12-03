import {useContext} from 'react'
import { BrowserRouter } from 'react-router-dom'
import AdminLayout from '../components/layouts/AdminLayout';
import { AppContext } from '../context/AppContext';
import { PrivateRouter } from './PrivateRouter';
import { PublicRouter } from './PublicRouter';

export const AppRouter = () => {
    const {session}= useContext(AppContext);
    const isAuth = session.user.isAuth;
    

  return (
    <BrowserRouter>
     
   
 
      {
        isAuth?(<AdminLayout>
          <PrivateRouter />
        </AdminLayout>)
        :<PublicRouter />
      }
    </BrowserRouter>
  )
}
