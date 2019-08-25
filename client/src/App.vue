<template>
  <div id="app" class="bg-gray-100 text-gray-900">
    <Chat></Chat>
  </div>
</template>

<script>
import Chat from './components/Chat.vue'

export default {
  name: 'app',
  components: {
    Chat
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
} */
</style>
