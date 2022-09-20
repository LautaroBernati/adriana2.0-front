import Producto from "./Producto";

class Perfume /*extends Producto*/ {
    id = "";
    creator = "";
    fragrance = "";
    gender = "";
    price100ml = 0;
    price60ml = 0;
    medioPago = "";
    medida = 0;

    constructor(id, creator, fragrance, gender, medida, price100ml, price60ml, medioPago){
        //super(medida == 100 ? price100ml : price60ml);
        this.id = id;
        this.creator = creator;
        this.fragrance = fragrance;
        this.gender = gender;
        this.medida = medida;
        this.price100ml = price100ml;
        this.price60ml = price60ml;
        this.medioPago = medioPago;
    }
    calcularPrecio(){
        let result = this.medida == 100 ? this.price100ml : this.price60ml;
        result = Math.round(this.medioPago == "MercadoPago" ? (result+(result*0.20)) : result);
        return result;
    }
}
export default Perfume;