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
    addObjective(state, data) {
      state.objectives.push(data)
    },
    addTask(state, data) {
      const index = state.objectives.findIndex(item => item.id == data.objective_id)
      state.objectives[index].tasks.push(data)
    },
    editTask(state, data) {
      const objectives = state.objectives
      const objectiveIndex = objectives.findIndex(({ id }) => id === data.objective_id)
      const taskIndex = objectives[objectiveIndex].tasks.findIndex(({ id }) => id === data.id)

      objectives[objectiveIndex].tasks.splice(taskIndex, 1, data)
    },
  }
})

document.addEventListener("DOMContentLoaded", function (event) {
  var el = document.querySelector('#boards')
  if (el != undefined) {
    window.store.state.objectives = JSON.parse(el.dataset.objectives)

    new Vue({
      el,
      store: window.store,
      template: "<App />",
      components: { App }
    })
  }
});
