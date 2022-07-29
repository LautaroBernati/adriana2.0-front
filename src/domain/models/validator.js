function validarCliente(cliente){
    return(!!cliente.alias && !!cliente.nombre && !!cliente.apellido && !!cliente.provincia
        && !!cliente.localidad && !!cliente.cp && !!cliente.direccion.calle && !!cliente.direccion.altura
        && !!cliente.email);
}
export default{
    validarCliente
}