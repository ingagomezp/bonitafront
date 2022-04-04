<template>
  <v-row class="row info-bonita">
    <v-container>
      <v-card class="card-general mx-auto my-6" elevation="6" max-width="800">
        <!-- Form -->
        <!-- x6 campos Placa Cédula Nombre-->
        <v-card-text>
          <div style="text-align: center; width: 100%">
            <h2>Se ha enviado la encuesta de manera exitosa.</h2>
            <img
              style="max-width: 100%; max-height: 100%"
              src="https://media.istockphoto.com/vectors/vector-lettering-gracias-vector-id1173919068?k=20&m=1173919068&s=612x612&w=0&h=5vUYItkipudPVDSh5FhRJTeZhhMDZzE9zLgHqInuXJg="
            />
          </div>
        </v-card-text>
      </v-card>
    </v-container>
  </v-row>
</template>

<script>
export default {
  name: "Gracias",
  components: {},
  data() {
    return {};
  },
  computed: {},
  methods: {},
  async mounted() {},
};
</script>

<style>
/* RESPONSIVE CARD --------------------------- */
.bg {
  /* background-image: url(../../assets/bg-principal.png); */
  background-position: center;
  background-size: cover;
  width: 100% !important;
  height: 100% !important;
  margin: 0px;
  padding: 0px;
}

.h-100vh {
  /* height: 100vh !important;
  width: 100vh !important; */
  height: 100% !important;
  width: 100% !important;
}
</style>
