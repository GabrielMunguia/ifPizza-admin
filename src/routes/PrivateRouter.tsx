import React from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import { IPrivateRoutes } from '../interfaces/routes'
import { privateRoutes } from './routes'

export const PrivateRouter = () => {
  return (
    <div>
    
        <Routes>
            {privateRoutes.map(({path,exact,Component}:IPrivateRoutes) => (
                <Route key={path} path={path}   element={<Component/>}/>
            ))}
    
            <Route path="*" element={<Navigate to="/inicio" replace={true}/>}/>
            </Routes>
     
    </div>
  )
}
