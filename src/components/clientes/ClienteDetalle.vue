<template>
    <div id="detalle-cliente">
        <p>hola {{cliente}}</p>
    </div>
</template>

<script>
    export default {
        name:'ClienteDetalle',
        props:['cliente'],
        data(){
            return{
                //cliente:{},
            }
        },
        emits:['aceptar','cancelar'],
    }
</script>

<style lang="scss" scoped>

</style>