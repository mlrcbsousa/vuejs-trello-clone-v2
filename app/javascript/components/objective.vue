<template>
  <div class="objective">
    <h6>{{ objective.name }}</h6>
    <hr>

    <draggable
      v-model="objective.tasks"
      :options="{ group: 'tasks' }"
      class="dragArea"
      @change="taskMoved"
    >
      <task v-for="task in objective.tasks" :task="task" :objectiveId="objective.id" :key="task.id" />
    </draggable>

    <a v-if="!editing" @click="startEditing">Add a Task</a>
    <textarea
      v-if="editing"
      class="form-control mb-1"
      v-model="message"
      ref="message"
    >
    </textarea>
    <button v-if="editing" class="btn btn-secondary" @click="createTask">
      Add
    </button>
    <a v-if="editing" @click="editing = false">Cancel</a>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import task from "./task";

  export default {
    components: { draggable, task },

    props: {
      objective: { type: Object, required: true },
    },
    data() {
      return {
        editing: false,
        message: ''
      }
    },
    methods: {
      startEditing(){
        this.editing = true
        this.$nextTick(() => this.$refs.message.focus())
      },
      createTask() {
        const objectiveId = this.objective.id

        var data = new FormData
        data.append("task[objective_id]", objectiveId)
        data.append("task[name]", this.message)

        Rails.ajax({
          url: "/tasks",
          type: "POST",
          data,
          dataType: "json",
          success: (data) => {
            this.$store.commit('addTask', data)
            this.message = ''
            this.$nextTick(() => this.$refs.message.focus())
          }
        })
      },
      taskMoved ({ added, moved }) {
        const event = added || moved
        if (event == undefined) { return }

        const { element, newIndex } = event

        const objectiveIndex = window.store.objectives.findIndex(objective => {
          return objective.tasks.find(({ id }) => id === element.id)
        })

        var data = new FormData
        data.append("task[objective_id]", window.store.objectives[objectiveIndex].id)
        data.append("task[position]", newIndex + 1)

        Rails.ajax({
          url: `/tasks/${element.id}/move`,
          type: "PATCH",
          data,
          dataType: "json",
        })
      },
    },
  }
</script>

<style scoped>
 .dragArea {
    min-height: 10px;
  }

</style>
