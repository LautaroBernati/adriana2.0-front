import Producto from "./Producto";

class Item extends Producto {
    constructor(articulo, cantidad){
        super(0);
        this.cantidad = cantidad;
        this.articulo = articulo;
    }
    calcularPrecio(){
        return this.articulo.calcularPrecio()*this.cantidad;
    }
}
export default Item;