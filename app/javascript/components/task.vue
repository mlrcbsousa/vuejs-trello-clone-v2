<template>
  <div>

    <div
      @click="editing = true"
      class="card card-body mb-3"
    >
      {{ task.name }}
    </div>

    <!-- Modal -->
    <div v-if="editing" class="modal-backdrop show"></div>

    <div
      v-if="editing"
      @click="closeModal"
      class="modal show"
      style="display: block"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ task.name }}</h5>
          </div>
          <div class="modal-body">
            <input v-model="name" class="form-control">
          </div>
          <div class="modal-footer">
             <!-- type="button" -->
            <button @click="save" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    props: {
      task: { type: Object, required: true },
      objectiveId: { type: Number, required: true },
    },

    data() {
      return {
        editing: false,
        name: this.task.name
      }
    },

    methods: {
      closeModal ({ target }) {
        if (target.classList.contains("modal")) {
          this.editing = false
        }
      },
      save() {
        var data = new FormData
        data.append("task[name]", this.name)

        Rails.ajax({
          url: `/tasks/${this.task.id}`,
          type: "PATCH",
          data,
          dataType: "json",
          success: (data) => {
            // this.$store.commit('editTask', data)
            this.editing = false
          }
        })
      }
    },
  }
</script>

<style scoped>

</style>
