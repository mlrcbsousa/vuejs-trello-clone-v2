<template>
  <draggable
    class="board dragArea"
    :list="objectives"
    :options="{ group: 'objectives' }"
    @end="objectiveMoved"
  >
    <objective
      v-for="(objective, index) in objectives"
      :objective=objective
      :key="objective.id"
    />

    <div class="objective">
      <a v-if="!editing" @click="startEditing">Add an Objective</a>

      <textarea
        v-if="editing"
        class="form-control mb-1"
        v-model="message"
        ref="message"
      >
      </textarea>

      <button v-if="editing" class="btn btn-secondary" @click="createObjective">
        Add
      </button>

      <a v-if="editing" @click="editing = false">Cancel</a>
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import objective from "./components/objective";

export default {
  components: { draggable, objective },

  data() {
    return {
      editing: false,
      message: '',
    }
  },

  computed: {
    objectives () {
      return this.$store.state.objectives
    },
  },

  methods: {
    startEditing(){
      this.editing = true
      this.$nextTick(() => this.$refs.message.focus())
    },
    objectiveMoved (event) {
      var data = new FormData
      data.append("objective[position]", event.newIndex + 1)

      Rails.ajax({
        url: `/objectives/${this.objectives[event.newIndex].id}/move`,
        type: "PATCH",
        data,
        dataType: "json",
      })
    },
    createObjective() {
      var data = new FormData
      data.append("objective[name]", this.message)

      Rails.ajax({
        url: "/objectives",
        type: "POST",
        data,
        dataType: "json",
        success: (data) => {
          // action cable adds to store
          this.message = ''
          this.editing = false
        }
      })
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

  .board {
    white-space: nowrap;
    overflow-x: auto;
  }

  .objective {
    background: #E2E4E6;
    border-radius: 3px;
    display: inline-block;
    margin-right: 20px;
    padding: 10px;
    vertical-align: top;
    width: 270px;
  }
</style>
