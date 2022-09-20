import Producto from "./Producto";

class Envio extends Producto {
    cantidad = 0;
    tipoEnvio = "";
    
    constructor(precio, cant, tipoEnvio){
        super(precio);
        this.cantidad = cant;
        this.tipoEnvio = tipoEnvio;
    }
    getPrecio(){
        return Number(this.precio);
    }
    calcularPrecio(){
        return this.precio;
    }
}
export default Envio;