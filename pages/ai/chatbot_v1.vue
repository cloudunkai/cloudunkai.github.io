<template>
  <div class="chat-bot">
    <div class="messsage-area">
      <perfect-scrollbar v-if="messages.length > 0" class="message-container">
        <template v-for="(message, index) in messages" :key="index">
          <div v-if="message.role === 'user'">
            <div class="pa-4 user-message">
              <v-avatar class="ml-4" rounded="sm" variant="elevated">
                <img src="@/assets/images/avatars/avatar_user.jpg" alt="alt" />
              </v-avatar>
              <v-card class="gradient gray" theme="dark">
                <v-card-text>
                  <b> {{ message.content }}</b></v-card-text
                >
              </v-card>
            </div>
          </div>
          <div v-else>
            <div class="pa-4 assistant-message">
              <v-avatar class="mr-4" rounded="sm" variant="elevated">
                <img
                  src="@/assets/images/avatars/avatar_assistant.jpg"
                  alt="alt"
                />
              </v-avatar>
              <v-card>
                <div>
                  <MdEditor v-model="message.content" preview-only />
                </div>
              </v-card>
            </div>
          </div>
        </template>
        <div v-if="isLoading">
          <div class="pa-6">
            <div class="message">
              <AnimationBot1 :size="100" />
            </div>
          </div>
        </div>
      </perfect-scrollbar>
      <div v-else class="no-message-container">
        <h1 class="text-h4 text-md-h2 text-blue-lighten-1 font-weight-bold">
          Chat With Me
        </h1>
        <AnimationBot1 :size="300" />
      </div>
    </div>
    <div class="input-area">
      <v-sheet elevation="0" class="input-panel">
        <v-text-field
          ref="input"
          v-model="userMessage"
          color="primary"
          type="text"
          clearable
          variant="solo"
          placeholder="SendMessage"
          hide-details
          @keyup.enter="sendMessage"
        >
          <template #prepend-inner>
            <v-icon>mdi-microphone</v-icon>
          </template>
          <template #append-inner>
            <v-fade-transition leave-absolute>
              <Icon
                v-if="isLoading"
                class="text-primary"
                size="30"
                name="eos-icons:three-dots-loading"
              />
              <v-icon v-else color="primary" @click="sendMessage"
                >mdi-send</v-icon
              >
            </v-fade-transition>
          </template>
        </v-text-field>
      </v-sheet>
    </div>
  </div>
</template>

<script setup lang="ts">
import MdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
const snackbarStore = useSnackbarStore()
const chatStore = useChatStore()
interface Message {
  content: string
  role: 'user' | 'assistant'
}

// Message List
const messages = ref<Message[]>([])

// User Input Message
const userMessage = ref('')

const isLoading = ref(false)

// Send Messsage
const sendMessage = async () => {
  // Clear the input

  if (userMessage.value) {
    // Add the message to the list
    messages.value.push({
      content: userMessage.value,
      role: 'user'
    })
    userMessage.value = ''

    isLoading.value = true
    // Create a completion
    await createCompletion()
  }
}

const createCompletion = async () => {
  // Check if the API key is set
  // if (!chatStore.state.value.apiKey) {
  //   snackbarStore.showErrorMessage('请先输入API KEY')
  //   isLoading.value = false
  //   return
  // }

  try {
    const completion = await $fetch('/api/aiApi', {
      method: 'post',
      body: {
        messages: messages.value,
        model: 'gpt-3.5-turbo'
      }
    })
    // Add the bot message
    messages.value.push({
      content: completion.choices[0].message.content,
      role: 'assistant'
    })
  } catch (error: any) {
    isLoading.value = false
    snackbarStore.showErrorMessage(error.message)
  }
}

// Scroll to the bottom of the message container
const scrollToBottom = () => {
  const container = document.querySelector('.message-container')
  setTimeout(() => {
    container?.scrollTo({
      top: container?.scrollHeight
    })
  }, 100)
}

watch(
  () => messages.value,
  (val) => {
    if (val) {
      scrollToBottom()
    }
  },
  {
    deep: true
  }
)
</script>
<style scoped lang="scss">
.chat-bot {
  background-image: url('@/assets/images/chat-bg-2.png');
  background-repeat: repeat;
  height: 100%;
  display: flex;
  flex-direction: column;
  .messsage-area {
    flex: 1;
    height: 100%;
  }
  .input-area {
    padding: 1rem;
    height: 90px;

    align-items: center;
    .input-panel {
      border-radius: 5px;
      max-width: 1200px;
      margin: 0 auto;
    }
  }
}

.user-message {
  display: flex;
  align-content: center;
  justify-content: end;
  flex-direction: row-reverse;
}

.assistant-message {
  display: flex;
  align-content: center;
  justify-content: start;
  flex-direction: row;
}

.message {
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
}

.message-container {
  height: calc(100vh - 154px);
  background-image: url('@/assets/images/chat-bg-2.png');
  background-repeat: repeat;
}

.no-message-container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h1 {
    font-size: 2rem;
    font-weight: 500;
  }
}

:deep(.md-editor-preview-wrapper) {
  padding: 5px 15px;
}
</style>
