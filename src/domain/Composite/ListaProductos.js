import Producto from "./Producto";

class ListaProductos extends Producto {
    productos=[];

    constructor(){
        super(0);
        this.productos = new Array();
    }
    addProducto(p){
        this.productos.push(p);
    }
    removeProducto(key){
        this.productos.splice(key, 1);
    }
    getProductoByIndex(i){
        return this.productos[i];
    }
    getPrecioTotal(){
        let acumulador = 0;
        this.productos.forEach(element => {
            acumulador =  acumulador + element.calcularPrecio();
        });
        return acumulador;
    }
}

export default ListaProductos;