import React, { useState ,useEffect, useContext} from 'react'
import { AppContext } from '../context/AppContext';
import { ICategory } from '../interfaces/interfaces'
import { deleteProduct, getAllProducts } from '../services/products';
import {  NavLink, useNavigate } from "react-router-dom";
import { deleteCategory, getAllCategory } from '../services/category';

export const ListCategorys = () => {
const [categorias, setcategorias] = useState<ICategory[]>([]);

const {alert} = useContext(AppContext);
  const { showAlert,showConfirmAlert,closeAlert}=alert;
const navigate = useNavigate();

useEffect(() => {
    cargarcategorias();
}, [])

  const cargarcategorias = async () => {
    const resp:any = await getAllCategory();
    if(!resp){
         await showAlert({
            title:"Vacío",
            text:"No hay categorias registrados",
            icon:"info",
            timer:2000

        })
   
        navigate("/agregar-categoria");

        return;
    }
 
    const data = Object.entries(resp);
    const lstCategorias: ICategory[] = [];
     data.map((item: any) => {
        lstCategorias.push({
            id: item[0],
            nombre: item[1]?.nombre,
            descripcion: item[1]?.descripcion,
            imagenURL: item[1]?.imagenURL,
            imagenNombre: item[1]?.imagenNombre,
         
        });
        });
     setcategorias(lstCategorias);
    }


const eliminarCategoria =async  (e:any) => {
   try {
    const id = e.target.value;

    const seConfirma= await showConfirmAlert({
        title: "Eliminar Categoria",
        text: "¿Está seguro que desea eliminar la categoria?",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
        icon: "warning",

    })
    if(!seConfirma){
        return;
    }
    showAlert({
        title: "Eliminando categoria",
        text: "Espere por favor...",
        icon: "info",
        manualClose: true,
    })
     await deleteCategory(id);
        cargarcategorias();
        closeAlert();

   } catch (error) {
    
   }

   
}
    





  return (
    <div className="d-flex justify-content-center py-3">
        <div className='col-10 table-responsive'>
        <table className='table table-bordered shadow'>
            <thead className='bg-dark text-white'>
                <tr>
                    <th>Nombre</th>
                   
                    <th>Descripcion</th>
                 
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    categorias.map((item: ICategory) => (
                        <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>{item.descripcion}</td>
                            

                            <td>
                                <NavLink to={`/editar-categoria/${item.id}`}  className='btn btn-primary mx-2'>Editar</NavLink>
                              
                                <button value={item.id}   onClick={eliminarCategoria}  type="button" className='btn btn-danger mx-2'>Eliminar</button>
                            </td>
                        </tr>
                    ))

                }
               
                
            </tbody>


        </table>
        </div>
    </div>
  )
}
