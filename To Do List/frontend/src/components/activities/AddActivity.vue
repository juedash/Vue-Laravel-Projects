<template>
  <div>
    <h3>Add a new activity</h3>
    <form action="" @submit.prevent="submitData">
      <div class="form-control">
        <label>Name</label>
        <input type="text" name="activityInput" v-model.trim="activity.name"
               :class="{ 'error-border' : error }"
               @focus="error=false">
      </div>
      <div class="form-control">
        <label>Description</label>
        <textarea id="activityDesc" v-model.trim="activity.description"></textarea>
      </div>
      <div class="form-control">
        <button>Add</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  emits: ['submitData'],
  props: ['displayError'],

  data() {
    return {
      activity: {
        name: ''
      },
      error: false
    };
  },

  methods: {
    submitData() {
      this.$emit('newActivity',
          this.activity
      );

      this.activity = {
        name: ''
      };
    },
  },
};
</script>

<style scoped>

</style>