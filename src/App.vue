<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <button @click="test">test</button>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { reactive, onMounted } from 'vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  setup() {
    const states = reactive({
      deferredPrompt: null,
    })
    const test = () => {
      if (states.deferredPrompt) {
        states.deferredPrompt.prompt()
        states.deferredPrompt = null
      }
    }
    onMounted(() => {
      window.addEventListener('beforeinstallprompt', (e) => {
        console.log(e)
        e.preventDefault()
        states.deferredPrompt = e
      })
      window.addEventListener('appinstalled', (e) => {
        console.log(e)
        states.deferredPrompt = null
      })
    })
    return {
      test,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
