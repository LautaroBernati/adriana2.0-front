<template>
            <div id="login" >
                <form @submit.prevent="loginWithCredentials">
                    <label for="ingresarTexto"><h2><b>Ingresar</b></h2></label>
                    <input
                        type="text"
                        v-model="formUser.dni"
                        placeholder="DNI del Usuario"
                        class="form-control input-lg"
                    />
                    <br />
                    <input
                        type="password"
                        v-model="formUser.userPass"
                        placeholder="Contraseña"
                        class="form-control input-lg"
                    />
                    <br />
                    <div class="d-grid">
                        <!--<button type="submit" class="btn btn-dark btn-block mb-3">Ingresar</button>-->
                        <button v-on:click="$emit('enviar-datos', formUser)" class="btn btn-dark btn-block mb-3">Ingresar</button>
                    </div>
                </form>
            </div>
</template>

<script>

export default {
    name: "LoginComponent",
    data() {
        return {
            formUser: {
                dni: "",
                userPass: "",
            },
        };
    },
    emits:['enviar-datos'],
};
</script>

<style lang="scss" scoped>

</style>