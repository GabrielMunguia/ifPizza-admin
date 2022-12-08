import React, { useState ,useEffect, useContext} from 'react'
import { AppContext } from '../context/AppContext';
import { IProduct } from '../interfaces/interfaces'
import { deleteProduct, getAllProducts } from '../services/products';
import {  NavLink, useNavigate } from "react-router-dom";

export const ListProduct = () => {
const [productos, setProductos] = useState<IProduct[]>([]);

const {alert} = useContext(AppContext);
  const { showAlert,showConfirmAlert,closeAlert}=alert;
const navigate = useNavigate();

useEffect(() => {
    cargarProductos();
}, [])

  const cargarProductos = async () => {
    const resp:any = await getAllProducts();
    if(!resp){
         await showAlert({
            title:"Vacío",
            text:"No hay productos registrados",
            icon:"info",
            timer:2000

        })
   
        navigate("/agregar-producto");

        return;
    }
 
    const data = Object.entries(resp);
    const lstProductos: IProduct[] = [];
     data.map((item: any) => {
        lstProductos.push({
            id: item[0],
            nombre: item[1]?.nombre,
            descripcion: item[1]?.descripcion,
            precio: item[1]?.precio,
            categoria: item[1]?.categoria,
            imagenURL: item[1]?.imagenURL,
            imagenNombre: item[1]?.imagenNombre,
            nombreCategoria: item[1]?.nombreCategoria,
        });
        });
     setProductos(lstProductos);
    }


const eliminarProducto =async  (e:any) => {
   try {
    const id = e.target.value;

    const seConfirma= await showConfirmAlert({
        title: "Eliminar Producto",
        text: "¿Está seguro que desea eliminar el producto?",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
        icon: "warning",

    })
    if(!seConfirma){
        return;
    }
    showAlert({
        title: "Eliminando Producto",
        text: "Espere por favor...",
        icon: "info",
        manualClose: true,
    })
     await deleteProduct(id);
        cargarProductos();
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
                    <th>Precio</th>
                    <th>Categoria</th>
                 
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    productos.map((item: IProduct) => (
                        <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>{item.precio}</td>
                            <td>{item.nombreCategoria}</td>
                            

                            <td>
                                <NavLink to={`/editar-producto/${item.id}`}  className='btn btn-primary mx-2'>Editar</NavLink>
                              
                                <button value={item.id}   onClick={eliminarProducto}  type="button" className='btn btn-danger mx-2'>Eliminar</button>
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
