class Perfume {
    _id = "";
    idPerfume = 0;
    creator = "";
    fragrance = "";
    gender = "";
    price100ml = 0;
    price60ml = 0;

    constructor (_id, idPerfume, creator, fragrance, gender, price100ml, price60ml){
        this._id = _id;
        this.idPerfume = idPerfume;
        this.creator = creator;
        this.fragrance = fragrance;
        this.gender = gender;
        this.price100ml = price100ml;
        this.price60ml = price60ml;
    }
}

export default Perfume;