import { ICategory } from './../interfaces/interfaces';
import {
  child,
  get,
  getDatabase,
  onValue,
  update,
  runTransaction,
} from "firebase/database";

import { db } from "./../Firebase/firebase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { ref, push } from "firebase/database";
export const getAllOrders = async () => {
    return new Promise((resolve, reject) => {
              //ordenar por estado pendiente primero
              const starCountRef = ref(db, 'pedidos');

              onValue(starCountRef, (snapshot) => {
               const data = snapshot.val();
               //ordenar por estado pendiente primero
               
             resolve(data);
             });
         
         
           });
}

//actualizar estado de pedido por idUsuario y idPedido
export const updateStatusOrder = async (idUsuario: string, idPedido: string, estatus: string) => {
    try {
        const starCountRef = ref(db, 'pedidos/' + idUsuario + '/' + idPedido);
        await update(starCountRef, {
          estatus: estatus
        });
        return true;
    } catch (error) {
        return false;
    }

  };


