import { ICategory } from './../interfaces/interfaces';
import {
  child,
  get,
  getDatabase,
  onValue,
  runTransaction,
} from "firebase/database";
import { db } from "./../Firebase/firebase";
import { ref, push } from "firebase/database";
import {
  getStorage,
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
export const getAllCategory = async () => {
 
  return new Promise((resolve, reject) => {
    const starCountRef = ref(db, 'categorias');
     onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
    resolve(data);
    });


  });
    
   
}
export const uploadImageCategory = async (file: File | undefined,name:string) => {
  try {
    if (file === undefined) return "";
    //configuracion de firebase storage
    const storage = getStorage();
    const storageRef = refStorage(storage, `categorias/${name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error: any) {
    throw new Error(error);
  }
};



export const addCategory= async (data:ICategory) => {

      const starCountRef = ref(db, 'categorias/');
    push(starCountRef, data);

};

export const getCategoryById = async (id: string) => {
  try {
  return new Promise((resolve, reject) => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `categorias/${id}`))
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
///delete categoria
export const deleteCategory = async (id: string) => {
  try {

    const categoria:any =  await getCategoryById(id);
    const nombreImagen = categoria?.imagenNombre;
    const storage = getStorage();
    const desertRef = refStorage(storage, `categorias/${nombreImagen}`);
    deleteObject(desertRef);
    //eliminamos el producto
    const starCountRef = ref(db, "categorias/" + id);
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

export const updateCategory = async (id: string,newImage:boolean, data: ICategory) => {
  try {
   

    if(newImage){
    
      const categoria:any =  await getCategoryById(id);

      const nombreImagen = categoria?.imagenNombre;
      const storage = getStorage();
      const desertRef = refStorage(storage, `categorias/${nombreImagen}`);
      await deleteObject(desertRef);
     
    }
   
    const starCountRef = ref(db, "categorias/" + id);
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



