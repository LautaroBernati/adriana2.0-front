<template>
    <div id="detalle-cliente">
        <form id="formulario">
            <label for="tituloTxt"><h2><b>Ingrese los datos del cliente</b></h2></label>
            <table id="tabla1" class="table table-dark table-striped">

                <tbody>
                    <tr id="persona">
                        <th>Persona</th>
                        <tr>
                            <td>
                                <label for="alias">Alias:<input 
                                    type="text"
                                    v-model="cliente.alias"
                                    placeholder="Alias. Ej: Juancito_1"
                                    class="form-control input-lg">
                                    </label>
                            </td>
                            <td>
                                <label for="nombre">Nombre:
                                    <input 
                                    type="text"
                                    v-model="cliente.nombre"
                                    placeholder="Nombre. Ej: Juan"
                                    class="form-control input-lg">
                                </label>
                            </td>
                            
                            <td>
                                <label for="apellido">Apellido:
                                    <input 
                                    type="text"
                                    v-model="cliente.apellido"
                                    placeholder="Apellido. Ej: Perez"
                                    class="form-control input-lg">
                                </label>
                            </td>
                            <td>
                                <label for="dni">DNI:
                                    <input 
                                    type="text"
                                    v-model="cliente.dni"
                                    placeholder="DNI. Ej: 33444555"
                                    class="form-control input-lg"
                                    required>
                                </label>
                            </td>
                        </tr>
                    </tr>
                    <tr id="ubicacion">
                        <th>Ubicacion</th>
                        <tr>
                            <td>
                                <label for="direccion">Direccion:
                                    <input 
                                    type="text"
                                    v-model="cliente.direccion"
                                    placeholder="Direccion. Ej: Av. Alberdi"
                                    class="form-control input-lg">
                                </label>
                            </td>
                            <td>
                                <label for="direccion">Altura:
                                    <input 
                                    type="text"
                                    v-model="cliente.direccion"
                                    placeholder="Altura. Ej: 2233"
                                    class="form-control input-lg">
                                </label>
                            </td>
                            <td>
                                <label for="localidad">Localidad:
                                    <input 
                                    type="text"
                                    v-model="cliente.localidad"
                                    placeholder="Localidad. Ej: Junin"
                                    class="form-control input-lg">
                                </label>
                            </td>
                            
                            <td>
                                <label for="provincia">Provincia:
                                    <input 
                                    type="text"
                                    v-model="cliente.provincia"
                                    placeholder="Provincia"
                                    class="form-control input-lg">
                                </label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="referencia">Referencia:
                                    <input 
                                    type="text"
                                    v-model="cliente.referencia"
                                    placeholder="Referencia. Ej: Porton negro"
                                    class="form-control input-lg">
                                </label>
                            </td>
                            <td>
                                <label for="cp">Cod Postal:
                                    <input 
                                    type="text"
                                    v-model="cliente.cp"
                                    placeholder="Cod Postal. Ej: 1440"
                                    class="form-control input-lg">
                                </label>
                            </td>
                        </tr>
                    </tr>

                    <tr id="contacto">
                        <th>Contacto</th>
                        <tr>
                            <td>
                                <label for="codArea">Codigo Area:
                                    <input
                                    type="text"
                                    v-model="cliente.codArea"
                                    placeholder="Codigo de area. Ej: 11"
                                    class="form-control input-lg">
                                </label>
                            </td>
                            <td>
                                <label for="celular">Celular:
                                    <input
                                    type="text"
                                    v-model="cliente.celular"
                                    placeholder="Celular sin 15 ni cod area. Ej: 68041510"
                                    class="form-control input-lg">
                                </label>
                            </td>
                            
                            <td>
                                <label for="email">EMail:
                                    <input
                                    type="email"
                                    v-model="cliente.email"
                                    placeholder="EMail. Ej: viafrancepi@gmail.com"
                                    class="form-control input-lg">
                                </label>
                            </td>
                        </tr>
                    </tr>
                </tbody>
            </table>

            <table id="tabla2">
                <tr>
                    <td>
                        <button 
                            class="btn btn-primary btn-block mb-3"
                            v-on:click="$emit('aceptar', cliente)">
                            Aceptar
                        </button>
                    </td>
                    <td>
                        <button 
                            v-on:click="$emit('cancelar')"
                            class="btn btn-secondary btn-block mb-3">
                            Cancelar
                        </button>
                    </td>
                </tr>
            </table>
        </form>
    </div>
</template>

<script>
    export default {
        name:'ClienteDetalle',
        props:['cliente'],
        created(){
        },
        data(){
            return{
                formCliente:{},
            }
        },
        emits:['aceptar','cancelar'],
    }
</script>

<style scoped>
#tabla2{
    margin-top: 30px;
    width: 50%;
    padding: 2%;
}
#tabla2 td{
    padding:2px;
    
    text-align: center;
    vertical-align: middle !important; 
}

table{
    margin:auto;
}
#tabla1{
    white-space: nowrap;
    padding: 10%;
    border-top: 2px double grey;
    border-left: 2px double grey;
    border-right: 2px double grey;
    border-bottom: 2px double grey;
}
#tabla1 td{
    margin: 19px !important;
    padding: 2% !important;
}

th{
    text-align: center;
    vertical-align: middle;
}

input{
    
    margin: auto;
}
#formulario {
  color:whitesmoke;
  padding:2%;
  background-color: #262222;
  border: double darkorchid;
  border-radius: 5px;
  font-family: "Lato", sans-serif;
  margin-top: 1%;
  z-index: 10;
  width: fit-content;
  margin: auto;
  
}
</style>