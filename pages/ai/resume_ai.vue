<template>
  <div>
    <!-- 文件上传组件 -->
    <div class="ma-3">
      <v-file-upload
        v-model="file"
        clearable
        show-size
        density="default"
      ></v-file-upload>
    </div>

    <!-- 上传按钮 -->
    <div class="text-center ma-3">
      <v-btn :loading="isLoading" @click="handleFileUploadAndGenerateSummary">
        Upload
        <template v-slot:loader>
          <v-progress-linear indeterminate></v-progress-linear>
        </template>
      </v-btn>
    </div>
    <v-card v-if="summary" class="ma-3 card-text" :text="summary">
      <template v-slot:actions>
        <v-btn
          text="download"
          class="ma-3"
          variant="outlined"
          @click="download"
        ></v-btn>
      </template>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import { VFileUpload } from 'vuetify/labs/VFileUpload'

const snackbarStore = useSnackbarStore()
const chatStore = useChatStore()

const isLoading = ref(false)
const file = ref<File | null>(null)
const summary: any = ref(null)
const filename: any = ref(null)

// 上传文件到 OpenAI
const uploadFile = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('purpose', 'user_data')

  try {
    const response = await $fetch('https://api.openai.com/v1/files', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + chatStore.getApiKey()
      },
      body: formData
    })
    filename.value = response.filename
    return response.id
  } catch (error) {
    snackbarStore.showErrorMessage('ファイルをアップロードしてください。')
    throw error
  }
}
const createCompletions = async (fileId: string) => {
  try {
    const response = await $fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + chatStore.getApiKey(),
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'file',
                  file: {
                    file_id: fileId
                  }
                },
                {
                  type: 'text',
                  text: 'このPDFにより、エンジニアのサマリーを作成,余計な言葉不要'
                }
              ]
            }
          ]
        })
      }
    )

    summary.value = response.choices[0].message.content
  } catch (error) {
    snackbarStore.showErrorMessage('解析失敗')
    throw error
  }
}

const handleFileUploadAndGenerateSummary = async () => {
  isLoading.value = true
  if (!file.value) {
    snackbarStore.showErrorMessage('ファイルをアップロードしてください。')
    isLoading.value = false
    return
  }

  try {
    const fileId = await uploadFile(file.value)

    await createCompletions(fileId)

    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    snackbarStore.showErrorMessage('アップロード失敗しました。')
  }
}

// 生成 PDF 文件的函数
const download = async () => {
  try {
    // 将生成的总结内容插入 PDF 页面
    if (!summary.value) {
      snackbarStore.showErrorMessage('サマリーが生成されていません。')
      return
    }

    const resumeContent = summary.value

    const response = await fetch('.netlify/functions-serve/getPdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ resumeContent })
    })

    if (response.ok) {
      const pdfBlob = await response.blob()
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename.value
      link.click()
      URL.revokeObjectURL(url)
    } else {
      console.error('Error generating PDF')
    }
  } catch (error) {
    console.log(error)

    snackbarStore.showErrorMessage('PDFの生成に失敗しました。')
  }
}
</script>

<style scoped>
.card-text {
  white-space: pre-line;
}
</style>
