<template>
  <div class="flex content-center justify-center flex-wrap h-screen">
    <div class="w-80 h-120 bg-gray-200 shadow-2xl flex flex-col content-between">
      <div
        class="font-semibold border-b border-gray-300 text-left bg-white p-4"
      >Ice Cream Sundae Assistant</div>
      <div ref="scrollArea" class="h-96 overflow-y-scroll px-4 text-sm leading-tight">
        <div class="pt-8">
          <span class="border-l border-2 border-indigo-500"></span>
        </div>
        <div v-for="(conversation, index) in conversations" :key="index">
          <div v-if="conversation.from === 'bot'" class="mb-8">
            <span class="border-l border-2 border-indigo-500 mr-2"></span>
            <span>{{ conversation.text }}</span>
          </div>
          <div v-else class="mb-8 text-right text-white">
            <span class="rounded-lg bg-gray-800 p-2">{{ conversation.text }}</span>
          </div>
        </div>
      </div>
      <div class="h-12 bg-white border-t border-gray-300">
        <form @submit.prevent="sendMessage" class="h-full flex">
          <div class="h-full w-4/5 text-sm leading-tight">
            <input
              v-model="text"
              class="h-full w-full px-2"
              placeholder="Type something..."
              type="text"
            />
          </div>
          <div
            class="h-full w-1/5"
            :class="[text ? 'bg-indigo-500 text-gray-300' : 'text-gray-700']"
          >
            <button type="submit" class="h-full w-full flex justify-center">
              <i class="material-icons">arrow_forward</i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Chat',
  data() {
    return {
      id: '',
      text: '',
      conversations: []
    }
  },
  methods: {
    scrollToEnd() {
      const scrollHeight = this.$refs.scrollArea.scrollHeight
      this.$refs.scrollArea.scrollTop = scrollHeight
    },
    sendMessage() {
      const payload = {
        text: this.text,
        from: this.id
      }
      this.conversations.push(payload)
      axios
        .post('api/message', payload)
        .then(res => {
          const payload = {
            text: res.data.output.text,
            from: 'bot'
          }
          this.conversations.push(payload)
        })
        .catch(err => {
          console.log(err)
        })
      this.text = ''
    }
  },
  created() {
    axios
      .get('api/session')
      .then(res => {
        this.id = res.data.session_id
      })
      .catch(err => {
        console.log(err)
      })
  },
  mounted() {
    this.scrollToEnd()
  },
  updated() {
    this.scrollToEnd()
  }
}
</script>

<style scoped>
input:focus {
  outline-color: #667eea;
}
</style>
