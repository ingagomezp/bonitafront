<template>
  <v-row class="row info-bonita">
    <v-container>
      <!-- LOADER -->
      <v-dialog v-model="loading" persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Por favor espera...
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-card class="card-general mx-auto my-6" elevation="6" max-width="800">
        <!-- Form -->
        <!-- x6 campos Placa Cédula Nombre-->
        <v-card-text :loading="loading">
          <v-col>
            <p style="font-weight: bold; font-size: 20px">
              Caso #: {{ idcase }}
            </p>
            <p style="font-weight: bold; font-size: 20px">
              Nombre: {{ nombre + " " + apellido }}
            </p>
            <p>
              Apreciado cliente, por favor diligencie la siguiente encuesta de
              satisfacción sobre el servicio prestado hasta el momento:
            </p>
          </v-col>
          <v-col class="col_msj_bno">
            <v-select
              prepend-icon="mdi-star-check"
              :items="items"
              label="El servicio prestado fue?"
              v-model="score"
              outlined
              dense
              item-text="description"
              item-value="abreviation"
              style="text-transform: uppercase; font-weight: 800"
            ></v-select>
          </v-col>
          <v-col>
            <v-textarea
              prepend-icon="mdi-text-box"
              outlined
              name="input-7-4"
              label="Dejanos tus comentarios"
              v-model="detailscore"
            ></v-textarea>
          </v-col>
        </v-card-text>
        <v-row align="center" justify="center" style="display: grid">
          <v-col v-if="validIdCase">
            <v-btn color="primary" elevation="8" large @click="sendScore()"
              >Enviar</v-btn
            >
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </v-row>
</template>

<script>
import {
  getDataContractPurchaseOrder,
  getDataContractLead,
  postExecuteTask,
} from "../services/bonitaApi";

export default {
  name: "Score",
  components: {},
  data() {
    return {
      detailscore: "",
      apellido: "",
      nombre: "",
      validIdCase: false,
      score: null,
      items: [
        { description: "Excelente", abreviation: 5 },
        { description: "Muy Bueno", abreviation: 4 },
        { description: "Bueno", abreviation: 3 },
        { description: "Regular", abreviation: 2 },
        { description: "Malo", abreviation: 1 },
      ],
      loading: false,
      idcase: 0,
      resultLead: null,
      resultPurchaseOrder: null,
    };
  },
  computed: {},
  methods: {
    timeout(ms) {
      // pass a time in milliseconds to this function
      console.log(ms);
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async sendScore() {
      this.loading = true;
      if (
        this.score !== null &&
        this.detailscore !== "" &&
        this.resultPurchaseOrder !== null &&
        this.resultLead !== null
      ) {
        console.log("this.score:::::::::", this.score);
        console.log(
          "this.resultPurchaseOrder:::::::::",
          this.resultPurchaseOrder
        );
        this.resultPurchaseOrder.client_qualification = this.score;
        this.resultPurchaseOrder.client_feedback = this.detailscore;

        // ejecuta la tarea con los dos contratos
        const contracts = {
          leadInput: this.resultLead,
          purchaseOrderInput: this.resultPurchaseOrder,
        };

        const resultExecute = await postExecuteTask(contracts, this.idcase);
        console.log("resultExecute: ", resultExecute);

        this.$router.push({
          name: "gracias",
        });
      } else {
        // Presenta mensaje de error por campos obligatorios

        this.$swal({
          title: "Error",
          html: "<p>Campos incompletos, por favor verifique e intente nuevamente.</p>",
          allowOutsideClick: false,
          showCancelButton: false,
          showConfirmButton: true,
        });
      }
      this.loading = false;
    },
    async testRe() {
      this.$router.push({
        name: "gracias",
      });
    },
  },
  async mounted() {
    this.loading = true;
    var routeInfo = this.$route;
    this.idcase = routeInfo.params.idcase;
    if (this.idcase && this.idcase.length == 4) {
      // obtiene la informacion del contrato lead
      this.resultLead = await getDataContractLead(this.idcase);
      console.log("resultLead: ", this.resultLead);
      // obtiene la informacion del contrato purchaseorder
      try {
        console.log("inicia llamado getDataContractPurchaseOrder");
        this.resultPurchaseOrder = await getDataContractPurchaseOrder(
          this.idcase
        );
        console.log("resultPurchaseOrder: ", this.resultPurchaseOrder);
        // asigna los datos del cliente a las variables locales
        if (this.resultLead) {
          this.nombre = this.resultLead.name;
          this.apellido = this.resultLead.last_name;
          this.validIdCase = true; // habilita el boton
        }
      } catch (ex) {
        console.log("Error en llamado getDataContractPurchaseOrder");
        this.$swal({
          title: "Error",
          html: ex.message,
          allowOutsideClick: false,
          showCancelButton: false,
          showConfirmButton: true,
        });
      }
      this.loading = false;
    } else {
      //crear mensaje de alerta y no dejar diligenciar
      this.$swal({
        title: "Error",
        html: "<p>El caso no existe o ya fue completado.</p>",
        allowOutsideClick: false,
        showCancelButton: false,
        showConfirmButton: true,
      });
    }
    this.loading = false;
  },
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
