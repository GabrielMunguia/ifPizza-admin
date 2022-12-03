import { Home } from './../pages/Home';
import { IPrivateRoutes } from './../interfaces/routes';
import { AddProduct } from '../pages/AddProduct';
import { ListProduct } from '../pages/ListProduct';
export const privateRoutes: IPrivateRoutes[] = [
    {
        path: '/inicio',
        to: '/inicio',
        title: 'Inicio',
        Component: Home,
        icon: 'fa-solid fa-gauge-high',
        visible: true
    },
    {
        path: '/agregar-producto',
        to: '/agregar-producto',
        title: 'Agregar producto',
        Component: AddProduct,
        icon: 'fa-solid fa-square-plus',
        visible: true
    },
    {
        path: '/editar-producto/:id',
        to: '/editar-producto',
        title: 'Editar producto',
        Component: AddProduct,
        icon: 'fa-solid fa-pen-to-square' ,
        visible: false
    },
    {
        //list products
        path: '/list-products',
        to: '/list-products',
        title: 'Lista  de productos',
        Component: ListProduct,
        icon: 'fa-solid fa-list',
        visible: true
       
    },
   
]