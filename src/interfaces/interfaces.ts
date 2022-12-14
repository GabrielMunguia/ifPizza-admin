export interface IPrivateRoutes {
    path: string,
    to: string,
    title: string,
    Component: React.ComponentType<any>,
    visible: boolean,
    icon?: string,

}
export interface IPublicRoutes {
    path: string,
    to: string,
    Component: React.ComponentType<any>,
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
type IAlertFunction = ({ title, icon, text, showConfirmButton, timer }: IAlert) => Promise<void> |( ()=>void);
export interface IAlertContext {
    showAlert: IAlertFunction  , 
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

export interface IUser {
    user:string,
    isAuth: boolean,
}
export interface IAppContext {
    alert: IAlertContext;
    session:{
        user:IUser;
        logIn:(user: string, password: string) => Promise<void> | void;
        logOut:()=>void;
        
    }
}


export interface ICategory {
    nombre: string;
    id?: string;
    descripcion?: string;
    imagenURL?: string;
    imagenNombre?: string;
}

export interface IOrdenProducto{
    id?: string;
    cantidad: number;
    precio: number;
    producto:string;
    productoId: string;
    totalCarrito: number;
    url: string;
}
export interface  IOrden{
    id?: string;
    direccion: string;
    id_usuario: string;
    instrucciones: string;
    total: number;
    productos: IOrdenProducto[];
   
estatus
: string;
}

   