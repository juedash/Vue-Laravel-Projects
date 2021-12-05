<template>
  <li :class="{ completedTask: done  }">
    <div class="activityTitle">
      <h3>{{ name }}</h3>
      <div class="icons">
        <span @click="markAsCompleted(id)" v-if="!done"><font-awesome-icon icon="check"/></span>
        <span @click="deleteActivity(id)"><font-awesome-icon icon="trash"/></span>
      </div>
    </div>
    <p v-if="description">{{ description }}</p>
  </li>
</template>

<script>
export default {
  props: ["id", "name", "description", "done"],
  emits: ['markAsCompleted', 'deleteActivity'],

  data(){
    return {
      isDone: false
    }
  },

  methods: {
    markAsCompleted(id) {
      this.isDone = {
        "completed": true
      };
      this.$emit('markAsCompleted', id, this.isDone);
    },

    deleteActivity(id) {
      this.$emit('deleteActivity', id);
    },
  },
};
</script>

<style scoped>
.activityTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
li {
  margin: 1rem;
  border: 1px solid #ccc;
  padding: 1rem;
}

.completedTask{
  background: #eee;
}

.completedTask h3{
  text-decoration: line-through;
}

.icons span{
  margin: 5px;
}

.icons span:first-child{
  color: green;
}
.icons span:last-child{
  color: red;
}
</style>