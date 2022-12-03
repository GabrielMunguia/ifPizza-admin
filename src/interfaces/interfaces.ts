export  interface ICategory {
    name: string;
    description: string;
    id?: string;
  
}
export type iconsAlert = "success" | "error" | "warning" | "info" | "question";

export interface IAlert {
    text: string;
    icon: iconsAlert;
    title: string;
    confirmButtonColor?: string;
    cancelButtonColor?: string;
    timer?: number;
    showConfirmButton?: boolean;
    manualClose?: boolean;
    allowOutsideClick?: boolean;
    showCancelButton?:boolean;
    confirmButtonText?:string;
    cancelButtonText?:string;

}
export interface IAlertContext {
    showAlert:  ({ title, icon, text, showConfirmButton, timer }: IAlert) => Promise<void> | (  ()=>void) , 
    showConfirmAlert: ({ title, icon, text, timer }: IAlert) => Promise<boolean> | (  ()=>void) ,
    isActive: boolean
    closeAlert: () => void
}

export interface IProduct {
    nombre: string;
    descripcion: string;
    precio: number;
    id?: string;
    categoria: string;
    imagenURL: string;
    imagenNombre: string;
   
    nombreCategoria: string;
   
}