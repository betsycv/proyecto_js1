class Egresos extends Dato {
    static contadorEgreso = 0;
    constructor (descripion, valor){
        super(descripion, valor);
        this._id= ++ Egresos.contadorEgreso;
    }
    get id(){
        return this._id;
    }
}