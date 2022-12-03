import React from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { IPublicRoutes } from '../interfaces/interfaces'
import { publicRoutes } from './routes'

export const PublicRouter = () => {
 
  return (
    <div>
     
        <Routes>
            {publicRoutes.map(({path,Component}:IPublicRoutes) => (
                <Route key={path} path={path}   element={<Component/>}/>
            ))}
    
            <Route path="*" element={<Navigate to="/login" />}/>
            </Routes>
     
    </div>
  )
}
