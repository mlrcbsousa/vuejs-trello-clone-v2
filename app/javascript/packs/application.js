import "bootstrap";

import Vue from 'vue/dist/vue.esm'
import App from "../app.vue";

document.addEventListener("DOMContentLoaded", function (event) {
  var el = document.querySelector('#boards')
  if (el != undefined) {
    const app = new Vue({
      el,
      data: {
        objectives: JSON.parse(el.dataset.objectives)
      },
      template: "<App :originalObjectives='objectives' />",
      components: { App }
    })
  }
});
