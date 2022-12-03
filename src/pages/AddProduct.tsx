import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useState } from "react";
import { FormLayout } from "../components/layouts/FormLayout";
import { useForm } from "../hooks/useForm";
import { ICategory, IProduct } from "../interfaces/interfaces";
import Style from "../assets/css/pages/addProduct.module.css";
import { addCategory, getAllCategory } from "../services/category";
import { AlertContext } from "../context/AlertContext";
import { addProduct, uploadImageProduct } from "../services/products";
const INITIAL_STATE:IProduct = {
  nombre: "",
  descripcion: "",
  precio: 0,

  categoria: "-1",
  imagenURL: "",
  imagenNombre: "",
  nombreCategoria: "",
};
export const AddProduct = () => {
  const [categorys, setCategorys] = useState<ICategory[]>([]);
  const [imageProduct, setImageProduct] = useState("");
  const { values, handleInputChange,reset } = useForm(INITIAL_STATE);
  const [fileImage, setFileImage] = useState<File>();
  const { showAlert, closeAlert } = useContext(AlertContext);
  //Este useEffect se utiliza para obtener todas las categorias de la base de datos
  useEffect(() => {
    const getCategory = async () => {
      const resp: any = await getAllCategory();
      const data = Object.entries(resp);
      const lstCategorys: ICategory[] = [];
      data.map((item: any) => {
        lstCategorys.push({
          id: item[0],
          name: item[1]?.nombre,
          description: item[1]?.descripcion,
        });
      });
      console.log(lstCategorys);
      setCategorys(lstCategorys);

      // setCategorys(Object.values(data))
    };
    getCategory();
  }, []);
  //Este useEfffect se utiliza para mostrar la imagen que se va a subir
  useEffect(() => {
    if (fileImage) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImageProduct(e.target.result.toString());
        }
      };

      reader.readAsDataURL(fileImage);
    }
  }, [fileImage]);

  const handleImage = async (e: any) => {
    const file:File = e.target.files[0];
    //validar que sea una imagen
 

    setFileImage(file);
  };
  const onSubmit = async (e: any) => {
    e.preventDefault();
   try {
    const esValido = validarForm();
    if(!esValido){
     
      return;
    }
    showAlert({
      text: "Subiendo imagen...",
      icon: "info",
      title: "Espere por favor",
      manualClose: true,
    });
   
    //primero subimos la imagen
    const urlImagen = await uploadImageProduct(fileImage);
    //despues subimos el producto
  
    const nombreCategoria = categorys.find(
      (item) => item.id === values.categoria
    )?.name;
    
    const resp = await addProduct({
      ...values,
      imagenURL: urlImagen,
      imagenNombre: fileImage?.name,
      nombreCategoria,
    });
    closeAlert();
    showAlert({
      text: "Producto agregado correctamente",
      icon: "success",
      title: "Exito",
      timer: 1500,
    });
    reset();
    //quitar la imagen
    setImageProduct("");
    setFileImage(undefined);

   
   } catch (error:any) {
    console.log(error.message)
   }

  }

  const validarForm = (): boolean => {
    let mensaje = "";
  
    let esValido = true;
    if (values.nombre.trim() === "") {
      mensaje = "El nombre es obligatorio";
      esValido = false;
    }else if (values.descripcion.trim() === "") {
      mensaje = "La descripcion es obligatoria";
      esValido = false;
    }
    else if (values.precio <= 0) {
      mensaje = "El precio debe ser mayor a 0";
      esValido = false;
    }
    
    else if (values.categoria === "-1") {
      mensaje = "Debe seleccionar una categoria";
      esValido = false;
    }
    else if (!fileImage) {
      mensaje = "Debe seleccionar una imagen";
      esValido = false;
    }
    if (!esValido) {
      console.log('entro')
      showAlert({
        text: mensaje,
        icon: "error",
        timer:1500,
        title: "Error",
        
      });
      return false;
    }
  
      




    return true;
    
  
  }



  return (
    <div>
      <FormLayout>
        <h1 className="text-center mb-5">Agregar Producto</h1>
        <form onSubmit={onSubmit}>
          <div className="d-flex flex-wrap justify-content-center">
            <div className="col-lg-5 mx-4 col-11 mt-2">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Nombre  "
                variant="outlined"
                value={values.nombre}
                name="nombre"
                onChange={handleInputChange}
              />
            </div>
            <div className="col-lg-5  col-11 mt-2">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Precio"
                type="number"
                variant="outlined"
                value={values.precio}
                name="precio"
                onChange={handleInputChange}
              />
            </div>
          </div>
        

          
          <div className="d-flex flex-wrap justify-content-center  mt-3">
          <div   className="col-lg-5 mx-3 col-11 ">
              <FormControl fullWidth
               className="col-lg-5 mx-0 mx-lg-4 col-11 mt-2"
              >
                <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="outlined"
                  value={values.categoria}
                  name="categoria"
                  onChange={handleInputChange}
                  label="Categoria"
                >
                  <MenuItem disabled value={"-1"}>
                    Selecciona una categoria
                  </MenuItem>
                  {categorys.map((item: ICategory) => {
                    return (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              
            </div>
            
           
            <div className="col-lg-5 mx-4 col-11 mt-2">
              <TextField
                fullWidth
                id="outlined-basic"
                label="Descripcion  "
                variant="outlined"
                value={values.descripcion}
                name="descripcion"
                onChange={handleInputChange}
              />
            </div>
          
          </div>

          <div className="d-flex flex-wrap flex-column flex-wrap align-items-center  justify-content-center mt-4">
            <div>
              <Button variant="contained" color="info" component="label">
                Subir imagen
                <input
                  onChange={handleImage}
                  hidden
                  accept="image/*"
                  multiple
                  type="file"
                />
              </Button>
            </div>

            <div className="mt-3">
              <img
                className={Style.imageProduct}
                src={imageProduct !== "" ? imageProduct : "./img/notFound.png"}
                alt=""
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Button type="submit" variant="contained" color="primary" className="mt-5">
              Agregar Producto
            </Button>
          </div>
        </form>
      </FormLayout>
    </div>
  );
};
