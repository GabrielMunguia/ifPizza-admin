import React from 'react'

export const FormLayout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="w-100  d-flex justify-content-center"> 
       <div className=' shadow border border-1 rounded p-5  col-xl-7 col-lg-8 col-12'>
       {children}
       </div>
        
    </div>
  )
}
