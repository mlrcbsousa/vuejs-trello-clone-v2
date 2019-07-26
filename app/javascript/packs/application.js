import "bootstrap";

import Vue from 'vue/dist/vue.esm'
import Vuex from 'vuex'
import App from "../app.vue";

Vue.use(Vuex)

window.store = new Vuex.Store({
  state: {
    objectives: [],
  },
  mutations: {
    addObjective(state, data) {},
    addTask(state, data) {},
    editTask(state, data) {},
  }
})

document.addEventListener("DOMContentLoaded", function (event) {
  var el = document.querySelector('#boards')
  if (el != undefined) {
    window.store.objectives = JSON.parse(el.dataset.objectives)

    new Vue({
      el,
      store: window.store,
      template: "<App :originalObjectives='objectives' />",
      components: { App }
    })
  }
});
