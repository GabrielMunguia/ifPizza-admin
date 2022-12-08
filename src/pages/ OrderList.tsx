import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { IOrden, IOrdenProducto } from "../interfaces/interfaces";
import { getAllOrders,updateStatusOrder } from "../services/orders";
import { useNavigate } from "react-router-dom";
import { ref, push } from "firebase/database";
import { db } from "../Firebase/firebase";
import Swal from 'sweetalert2'
import { ModalProductos } from "../helpers/ModalProductos";
export const OrderList = () => {
  const [ordenes, setOrdenes] = useState<IOrden[]>([]);
  let timer: any = null;
  const { alert } = useContext(AppContext);
  const { showAlert, showConfirmAlert, closeAlert } = alert;
  const navigate = useNavigate();

  useEffect(() => {
    timer = setInterval(async () => {
      await cargarPedidos();
    }, 500);
    return () => {
      clearInterval(timer);
    };

  }, []);

  const cargarPedidos = async () => {
    const resp: any = await getAllOrders();

    if (!resp) {
      await showAlert({
        title: "Vacío",
        text: "No hay categorias registrados",
        icon: "info",
        timer: 2000,
      });

      return;
    }

    const data = Object.values(resp);

    let lstOrdenes: IOrden[] = [];
    data.map((item: any) => {
      item = Object.entries(item);
      item.forEach((pedido: any) => {
        lstOrdenes.push({
          id: pedido[0],
          direccion: pedido[1]?.direccion,
          id_usuario: pedido[1]?.id_usuario,
          instrucciones: pedido[1]?.instrucciones,
          total: pedido[1]?.total,
          productos: pedido[1]?.productos,
          estatus: pedido[1]?.estatus,
        });
      });
    });
    //obtener primero los pedidos pendientes
    let pendientes = lstOrdenes.filter((item) => item.estatus == "pendiente");
    //obtener los pedidos en camino
    let enCamino = lstOrdenes.filter((item) => item.estatus == "en-camino");
    //obtener los pedidos completados
    let completados = lstOrdenes.filter((item) => item.estatus == "completado");
    lstOrdenes = [...pendientes, ...enCamino, ...completados];

    
 

    setOrdenes(lstOrdenes);
  };

  const cambiarEstado = async (e: any) => {
    try {
      const id = e.target.value;
      const id_usuario = e.target.getAttribute("id-usuario");
      //mostrar un Swall con 3 opciones de estatus , pendiente, en camino, entregado
      const { value: Estado } = await Swal.fire({
        title:'Cambiar estado',
        input: 'select',
        inputOptions: {
        
            'pendiente': 'Pendiente',
            'en-camino': 'En camino',
            'completado': 'completado'
        
          
        },
        inputPlaceholder: 'Selecciona un estado',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if (value) {
              resolve(null)
            } else {
              resolve('Debes seleccionar un estado')
            }
            
          })
        }
      })
      if(!Estado){
        return;
      }

     const seActualizo = await updateStatusOrder(id_usuario,id,Estado);
      if(seActualizo){
        await showAlert({
          title: "Actualizado",
          text: "Se actualizo el estado de la orden",
          icon: "success",
          timer: 2000,
        });
        
      }else{
        await showAlert({
          title: "Error",
          text: "No se pudo actualizar el estado de la orden",
          icon: "error",
          timer: 2000,
        });
      }

     
      
      


      
      
    } catch (error) {}
  };

  const mostrarProductos = (e:any) => {
    const idPedido= e.target.value;

    const productos:IOrdenProducto[]=[];
    ordenes.forEach((item:IOrden)=>{
      if(item.id==idPedido){
        productos.push(...item.productos);
        return false;
      }
    });

    
    ModalProductos(productos);


  }

  return (
    <div className="d-flex justify-content-center py-3">
       <div className='col-10 table-responsive'>
        <table className="table table-bordered shadow">
          <thead className="bg-dark text-white">
            <tr>
              <th className="text-center">Direccion</th>
              <th className="text-center">Instrucciones</th>
              <th className="text-center">Total</th>
              <th className="text-center">Estatus</th>
              <th className="text-center">Productos</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((item: IOrden) => (
              <tr key={item.id}>
                <td>
                  <div className="col-12 text-center">{item.direccion}</div>
                </td>
                <td>
                  <div className="col-12 text-start">{item.instrucciones}</div>
                </td>
                <td>
                  <div className="col-12 text-center">
                    {(item.total+0.99).toFixed(2)}
                  </div>
                </td>
                <td>
                  <div className="col-12 text-center">
                    <span
                      className={`badge text-bg-${
                        item.estatus == "pendiente"
                          ? "danger"
                          : item.estatus == "en-camino"
                          ? "warning"
                          : "success"
                      }`}
                    >
                      {item.estatus}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-center">
                    <button   value={item.id} onClick={mostrarProductos} className="btn btn-primary">Ver productos</button>
                  </div>
                </td>

                <td>
                  <div className="d-flex justify-content-center">
                    <button
                      value={item.id}
                      id-usuario={item.id_usuario}
                      onClick={cambiarEstado}
                      type="button"
                      className="btn btn-warning  mx-2"
                    >
                      Cambiar estado
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
