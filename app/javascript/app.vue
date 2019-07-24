<template>
  <draggable
    class="row dragArea"
    :list="objectives"
    :options="{ group: 'objectives' }"
    @end="listMoved"
  >
    <div
      v-for="(objective, index) in originalObjectives"
      :key="objective.id"
      class="col-3"
    >
      <h6>{{ objective.name }}</h6>
      <hr>

      <draggable
        v-model="objective.tasks"
        :options="{ group: 'cards' }"
        class="dragArea"
        @change="cardMoved"
      >
        <div
          v-for="(task, index) in objective.tasks"
          :key="task.id"
          class="card card-body mb-3"
        >
          {{ task.name }}
        </div>
      </draggable>

      <div class="card card-body">
        <textarea class="form-control"
          v-model="messages[objective.id]"
          ></textarea>

        <button
          class="btn btn-secondary"
          @click="submitMessages(objective.id)"
        >
          Add
        </button>
      </div>
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  props: {
    originalObjectives: {
      type: Array,
      default: []
    },
  },
  data() {
    return {
      messages: {},
      objectives: this.originalObjectives
    }
  },
  methods: {
    submitMessages(objectiveId) {
      var data = new FormData
      data.append("task[objective_id]", objectiveId)
      data.append("task[name]", this.messages[objectiveId])

      Rails.ajax({
        url: "/tasks",
        type: "POST",
        data,
        dataType: "json",
        success: (data) => {
          const index = this.objectives.findIndex(item => item.id == objectiveId)
          this.objectives[index].tasks.push(data)
          this.messages[objectiveId] = undefined
        }
      })
    },
    listMoved (event) {
      var data = new FormData
      data.append("objective[position]", event.newIndex + 1)

      Rails.ajax({
        url: `/objectives/${this.objectives[event.newIndex].id}/move`,
        type: "PATCH",
        data,
        dataType: "json",
      })
    },
    cardMoved (event) {
      console.log(event);

      if (event.added == undefined) { return }

      const objectiveIndex = this.objectives.findIndex(objective => {
        return objective.tasks.find(task => {
          task.id == event.added.newIndex
        })
      })

      console.log(objectiveIndex);

      var data = new FormData
      data.append("objective[position]", event.newIndex + 1)

      // Rails.ajax({
      //   url: `/objectives/${this.objectives[event.newIndex].id}/move`,
      //   type: "PATCH",
      //   data,
      //   dataType: "json",
      // })
    },
  }
}
</script>

<style scoped>
  p {
    font-size: 2em;
    text-align: center;
  }

  .dragArea {
    min-height: 10px;
  }
</style>
