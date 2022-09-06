import Producto from "./Producto";

class Item extends Producto {
    constructor(perfume, cantidad, precio, medida, medioPago){
        super(precio);
        this.perfume = perfume;
        this.cantidad = cantidad;
        this.medida = medida;
        this.medioPago = medioPago;
    }
    getPrecio(){
        return Number(this.precio);
    }
}
export default Item;