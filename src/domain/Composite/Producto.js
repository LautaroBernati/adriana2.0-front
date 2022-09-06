class Producto {
    
    precio = 0;
    nombre = "";

    constructor(precio){
        if(this.constructor == Producto){
            throw new Error('No puede inicializar clase abstracta');
        }
        this.precio = precio;
    }

    calcularPrecio(){
        throw new Error('Metodo debe estar implementado');
    }
}
export default Producto;
