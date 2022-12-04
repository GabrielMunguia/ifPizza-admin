import { ListCategorys } from './../pages/ListCategorys';
import { Home } from './../pages/Home';
import { IPrivateRoutes, IPublicRoutes } from './../interfaces/interfaces';
import { AddProduct } from '../pages/AddProduct';
import { ListProduct } from '../pages/ListProduct';
import { Login } from '../pages/Login';
import { AddCategory } from '../pages/AddCategory';
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
        path: '/lista-productos',
        to: '/lista-productos',
        title: 'Lista  de productos',
        Component: ListProduct,
        icon: 'fa-solid fa-list',
        visible: true
       
    },
    {
        path: '/agregar-categoria',
        to: '/agregar-categoria',
        title: 'Agregar categoria',
        Component: AddCategory,
        icon: 'fa-solid fa-square-plus',
        visible: true
    },
    {
        path: '/editar-categoria/:id',
        to: '/editar-categoria',
        title: 'Editar categoria',
        Component: AddCategory,
        icon: 'fa-solid fa-pen-to-square' ,
        visible: false
    },
    {
        //list categories
        path: '/lista-categorias',
        to: '/lista-categorias',
        title: 'Lista  de categorias',
        Component: ListCategorys,
        icon: 'fa-solid fa-list',
        visible: true
    }
   
]

export const publicRoutes:IPublicRoutes[] = [
    {
        path: '/login',
        to: '/login',
        Component: Login
    }
]


