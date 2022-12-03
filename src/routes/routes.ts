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
        exact: true,
        icon: 'fa-solid fa-gauge-high'
    },
    {
        path: '/agregar-producto',
        to: '/agregar-producto',
        title: 'Agregar producto',
        Component: AddProduct,
        exact: true,
        icon: 'fa-solid fa-square-plus'
    },
    {
        //list products
        path: '/list-products',
        to: '/list-products',
        title: 'Lista  de productos',
        Component: ListProduct,
        icon: 'fa-solid fa-list',
        exact: true,
    },
   
]