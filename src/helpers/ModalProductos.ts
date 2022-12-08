import { IOrdenProducto } from './../interfaces/interfaces';
import Swal from "sweetalert2";

export const ModalProductos = (lstProductos:IOrdenProducto[]) => {
  const html = `
    <div class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <div class="table-responsive">
                        <table id="zero_config" class="table table-striped table-bordered no-wrap">
                            <thead> 
                                <tr>
                                    <th >
                                    <span class="fs-6">Nombre</span>
                                    </th>
                                    <th>
                                    
                                    <span class="fs-6">Cantidad</span>
                                    </th>
                                   
                                    <th class="d-none d-sm-block" >
                                        <span class="fs-6">Imagen</span>
                                    </th>
                                    
                                   
                                </tr>
                                    </thead>
                                    <tbody>
                                    ${lstProductos.map((producto) => {
                                        return `
                                        <tr>
                                            <td >${producto.producto}</td>
                                            <td>${producto.cantidad}</td>
                                         
                                            <td class="d-none d-sm-block" >
                                                <img class="d-none d-sm-block" src="${producto.url}" alt="" width="100px" height="60px">
                                            </td>
                                        </tr>
                                        `;
                                    }).join("")}
                                    

                                  
                                    </tbody>
                                    </table>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    </div>
                                    
                                    `;
  Swal.fire({
    title: "Lista de productos",
    html: html,

    width: "750px",
    showCloseButton: true,
    showCancelButton: false,
    focusConfirm: true,
    confirmButtonText: "OK",
    confirmButtonColor: "#3085d6",
  
  });
};
