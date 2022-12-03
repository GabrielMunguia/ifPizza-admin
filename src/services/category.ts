import { db } from '../Firebase/firebase';
import { onValue,push } from 'firebase/database';
import { ref } from 'firebase/database';
import { ICategory } from '../interfaces/interfaces';
export const getAllCategory = async () => {
 
  return new Promise((resolve, reject) => {
    const starCountRef = ref(db, 'categorias');
     onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
    resolve(data);
    });


  });
    
   
}

export const addCategory= async ({name,description}:ICategory) => {
  const cate = ['Entradas','Pizzas','Bebidas','Postres'];

    const category = {
      nombre: name,
      descripcion: description,
   
    };
  
    const starCountRef = ref(db, 'categorias/');
    push(starCountRef, category);

};


