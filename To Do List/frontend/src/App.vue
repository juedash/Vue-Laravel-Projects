<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2, h3, h4, h5, h6 {
  text-align: center;
}

button {
  font: inherit;
  border: 1px solid #360032;
  background-color: #360032;
  color: white;
  padding: 0.5rem 2rem;
  cursor: pointer;
}

button:hover,
button:active {
  background-color: #5c0556;
  border-color: #5c0556;
}

* {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
}

body {
  margin: 0;
}

/** Input fields */
label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  text-align: left;
  font-size: smaller;
}

input,
textarea {
  display: block;
  width: 100%;
  font: 15px;
  padding: 0.3rem;
  border: 1px solid #ccc;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #3a0061;
  background-color: #eeeeee;
}

.form-control {
  margin: 1rem 0;
}

input, textarea
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  font-size: 12px;
  line-height: 1.2;
}


</style>
