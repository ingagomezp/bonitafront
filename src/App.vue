<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div style="text-align: center; width: 100%">
        <h2>ENCUESTA DE SATISFACCIÓN</h2>
      </div>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
