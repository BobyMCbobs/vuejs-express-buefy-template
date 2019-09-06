<template>
  <div>
    <div id="message" v-if="message.message">
      <h1>{{ message.message }}</h1>
    </div>
    <div id="error" v-if="errors && errors.length">
        <h3>Error:</h3>
        <ul>
          <li v-for="error of errors" v-bind:key="error">
            - {{error.message}}
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  data () {
    return {
      message: {},
      errors: []
    }
  },
  created () {
    axios.get(`http://localhost:8080/api`)
      .then(response => {
        this.message = response.data
      })
      .catch(err => {
        this.errors.push(err)
      })
  }
}
</script>

<style scoped>
div h1 {
  text-align: center;
}
</style>
