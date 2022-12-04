import {
  child,
  get,
  getDatabase,
  onValue,
  runTransaction,
} from "firebase/database";
import { db } from "./../Firebase/firebase";
import { ref, push } from "firebase/database";

import { IProduct } from "./../interfaces/interfaces";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
export const addProduct = async (data: IProduct) => {
  try {
    const starCountRef = ref(db, "productos/");
    push(starCountRef, data);
    return true;
  } catch (error) {
    return false;
  }
};

export const uploadImageProduct = async (file: File | undefined,name:string) => {
  try {
    if (file === undefined) return "";
    //configuracion de firebase storage
    const storage = getStorage();
    const storageRef = refStorage(storage, `productos/${name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getAllProducts = async () => {
  try {
    return new Promise((resolve, reject) => {
      const starCountRef = ref(db, "productos");
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        resolve(data);
      });
    });
  } catch (error) {
    return [];
  }
};
///delete product
export const deleteProduct = async (id: string) => {
  try {

    const product:any =  await getProductById(id);
    const nombreImagen = product?.imagenNombre;
    const storage = getStorage();
    const desertRef = refStorage(storage, `productos/${nombreImagen}`);
    deleteObject(desertRef);
    //eliminamos el producto
    const starCountRef = ref(db, "productos/" + id);
    runTransaction(starCountRef, (prod) => {
      if (prod) {
        prod = null;
      }
      return prod;
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const getProductById = async (id: string) => {
  try {
  return new Promise((resolve, reject) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `productos/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
            resolve(snapshot.val());
         
        } else {
            reject("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

  });
  } catch (error) {
    return null;
  }
};


export const updateProduct = async (id: string,newImage:boolean, data: IProduct) => {
  try {
   

    if(newImage){
    
      const product:any =  await getProductById(id);

      const nombreImagen = product?.imagenNombre;
      const storage = getStorage();
      const desertRef = refStorage(storage, `productos/${nombreImagen}`);
      await deleteObject(desertRef);
     
    }
   
    const starCountRef = ref(db, "productos/" + id);
    runTransaction(starCountRef, (prod) => {
      if (prod) {
        prod = data;
      }
      return prod;
    });

    return true;
  } catch (error) {
    return false;
  }
}
