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
  import {  ICategory } from "../interfaces/interfaces";
  import Style from "../assets/css/pages/addCategory.module.css";
  import { addCategory, getCategoryById, updateCategory, uploadImageCategory } from "../services/category";
  import { AppContext } from "../context/AppContext";

  import { useParams } from "react-router-dom";
  const INITIAL_STATE:ICategory = {
    nombre: "",
    descripcion: "",
    imagenURL: "",
    imagenNombre: "",
 
  };
  export const AddCategory = () => {
    const [categorys, setCategorys] = useState<ICategory[]>([]);
    const [imageCategoria, setImageCategoria] = useState("");
    const { values, handleInputChange,reset,loadValues } = useForm(INITIAL_STATE);
    const [fileImage, setFileImage] = useState<File>();
    const {alert} = useContext(AppContext);
    const { showAlert, closeAlert}=alert;
  
    let { id } = useParams();
  
    useEffect(() => {
      if(id){
        cargarCategoria(id);
        return;
      }
      reset();
      if(imageCategoria!==""){
        setImageCategoria("");
      }
     
    }, [id])
    
    
    //Este useEfffect se utiliza para mostrar la imagen que se va a subir
    useEffect(() => {
      if (fileImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            setImageCategoria(e.target.result.toString());
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
        text: "Cargando registro...",
        icon: "info",
        title: "Espere por favor",
        manualClose: true,
      });
      const imagenNombre=Date.now()+(fileImage?.name??"-");
     if(!id){
         //primero subimos la imagen
       
         const urlImagen = await uploadImageCategory(fileImage,imagenNombre);
         //despues subimos el Categoria
         const resp = await addCategory({
           ...values,
           imagenURL: urlImagen,
           imagenNombre,
          
         });
     }else{
      
        if(fileImage){
           //primero subimos la imagen
         const urlImagen = await uploadImageCategory(fileImage,imagenNombre);
         //despues subimos el Categoria
       
        
         const resp = await updateCategory(id,true,{
           ...values,
           imagenURL: urlImagen,
           imagenNombre,
          
         });
         console.log({
          ...values,
          imagenURL: urlImagen,
          imagenNombre,
         
        })
        }else{
          
          const resp = await updateCategory(id,false,{
            ...values,
          
          });
        }
     }
   
      closeAlert();
      showAlert({
        text: `Categoria ${id?'actualizado':'agregado'}  correctamente`,
        icon: "success",
        title: "Exito",
        timer: 1500,
      }); 
      if(!id){
        reset();
      
        //quitar la imagen
        setImageCategoria("");
        setFileImage(undefined);
      }
     
  
     
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
    
      else if (!fileImage && !id) {
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
  
    const cargarCategoria = async (id:string) => {
      const Categoria:any = await getCategoryById(id);
      if(!Categoria){
        return;
      }
      loadValues(Categoria);
      setImageCategoria(Categoria.imagenURL);
    
    }
  
  
  
    return (
      <div>
        
        <FormLayout>
          <h1 className="text-center mb-5">{id?"Actualizar":"Agregar"} Categoria</h1>
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
                label="Descripcion"
                type="text"
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
                  className={Style.imageCategoria}
                  src={imageCategoria !== "" ? imageCategoria : "/img/notFound.png"}
                  alt=""
                />
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <Button type="submit" variant="contained" color="primary" className="mt-5">
              {id?"Actualizar":"Agregar"} Categoria
              </Button>
            </div>
          </form>
        </FormLayout>
      </div>
    );
  };
  