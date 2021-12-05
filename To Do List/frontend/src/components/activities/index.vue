<template>
  <div></div>
  <button @click="logoutUser">Logout</button>
  <h1>TO DO LIST</h1>
  <base-container v-if="displayError">
    <div v-if="errorsStore.name">
      <small v-for="error in errorsStore.name" :key="error" class="error-text">{{ error }}</small>
    </div>
    <div v-if="errorsUpdate">
      <small v-for="error in errorsUpdate" :key="error" class="error-text">{{ error }}</small>
    </div>
    <div v-if="errorsDelete">
      <small v-for="error in errorsDelete" :key="error" class="error-text">{{ error }}</small>
    </div>
  </base-container>
  <base-container>
    <AddActivity @newActivity="newActivity" :displayError="displayError"/>
  </base-container>
  <base-container v-if="!isLoading && activities.length > 0">
    <h3>Your list of activities</h3>
    <ul>
      <div v-if="isLoading" class="text-center">
        <span>Loading...</span>
      </div>
      <ActivityItem
          v-for="activity in activities"
          :key="activity.id"
          :id="activity.id"
          :name="activity.name"
          :description="activity.description"
          :done="activity.completed"
          @markAsCompleted="completeActivity"
          @deleteActivity="deleteActivity">
      </ActivityItem>
    </ul>
  </base-container>
</template>

<script>
import AddActivity from "./AddActivity.vue";
import ActivityItem from "./ActivityItem.vue";
import repository from "../../api/repository";

export default {
  components: {
    ActivityItem,
    AddActivity
  },

  data() {
    return {
      isLoading: false,
      activities: [],
      checkDisabled: false,
      errorsStore: {},
      errorsUpdate: {},
      errorsDelete: {},
      errorsLoad: {},
      displayError: false,
    };
  },

  methods: {
    newActivity(activity) {
      repository.addActivity(activity)
          .then(() => {
            this.activities.unshift(activity);
            this.savedActivities();
            this.displayError = false;
          })
          .catch((error) => {
            console.log(error.response.data.errors.name);
            this.error = error.data;
            this.errorsStore = error.response.data.errors;
            if (this.errorsStore.name) {
              this.displayError = true;
            }
          });
      this.error = null;
    },
    savedActivities() {
      this.isLoading = true;
      repository.getActivities().then((response) => {
        this.activities = response.data;
        this.displayError = false
      }).catch((error) => {
        console.log(error);
        error.response.message = 'Unable to load activities. View log for more information';
        this.errorsLoad = error.response.data.errors;
        if( error.response.status === 500){
          this.displayError = false;
        }
        else {
          this.displayError = true;
        }
      }).finally(() => {
        this.isLoading = false;
      });
    },

    completeActivity(id, isDone) {
      repository.updateActivity(id, isDone).then(() => {
        this.activities.find(activity => activity.id === id).completed = isDone.completed;
        this.displayError = false;

      }).catch((error) => {
        console.log(error.response);
        this.errorsUpdate = error.response.data.errors;
        this.displayError = true;
      })
    },

    deleteActivity(id) {
      repository.deleteActivity(id).then((response) => {
        this.activities = this.activities.filter(item => item.id !== id);
        this.displayError = false;

        console.log(response);
      }).catch((error) => {
        this.errorsDelete = error.response.data.errors;
        this.displayError = true;
      });
    },

    async logoutUser() {
      try {
        await this.$store.dispatch('logout');
        await this.$router.push({name: 'login'});
        console.log('logged out');
      } catch (error) {
        console.log(error);
      }
    }
  },
  mounted() {
    this.savedActivities();
  }
};
</script>

<style>

ul {
  list-style: none;
  padding: 0;
}

.error-text {
  font-size: 12px;
  color: darkred;
}

.error-border {
  border-color: red;
}
</style>
