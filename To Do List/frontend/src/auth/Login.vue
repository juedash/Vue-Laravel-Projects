<template>
  <base-container>
    <h3>Login</h3>
    <p v-if="loading">loading...</p>
    <div class="form-control">
      <input type="email" placeholder="Email" v-model.trim="user.email"
             @focus="errorRes.email = null"
             :class="{ 'error-border':errorRes.email}">
      <div class="error-list" v-if="errorRes.email">
        <small v-for="error in errorRes.email" :key="error" class="error-text">{{ error }}</small>
      </div>
    </div>
    <div class="form-control">
      <input type="password" placeholder="Password" v-model="user.password"
             @focus="errorRes.password = null"
             :class="{ 'error-border':errorRes.password}">
      <div class="error-list" v-if="errorRes.password">
        <small v-for="error in errorRes.password" :key="error" class="error-text">{{ error }}</small>
      </div>
    </div>
    <p v-if="error" style="color:red">{{ error }}</p>
    <button @click="login">Login</button>
  </base-container>
</template>

<script>
import BaseContainer from "../components/UI/BaseContainer";

export default {
  name: 'Login',
  components: {BaseContainer},
  data() {
    return {
      user: {
        email: null,
        password: null
      },

      loading: false,
      error: null,
      errorRes: {},
    }
  },

  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', this.user);
        await this.$router.push({name: 'activities'});
      }
      catch (error) {
        if (error.response) {
          console.log(error.response);
          this.errorRes = error.response.data.errors;
          if(error.response.status == 401){
            this.error = 'Password or email are invalid'
          }
        }
      }
      finally {
        this.loading = false;
      }
    },
  }
}
</script>
