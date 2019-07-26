import "bootstrap";

import Vue from 'vue/dist/vue.esm'
import App from "../app.vue";

window.store = {}

document.addEventListener("DOMContentLoaded", function (event) {
  var el = document.querySelector('#boards')
  if (el != undefined) {
    window.store.objectives = JSON.parse(el.dataset.objectives)

    new Vue({
      el,
      data: window.store,
      template: "<App :originalObjectives='objectives' />",
      components: { App }
    })
  }
});
