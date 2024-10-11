<template>
  <div ref="sceneContainer" class="scene-container">
    <!-- 楼层选择下拉框 -->
    <select class="floor-select" @change="onFloorSelect">
      <option disabled selected>フロア</option>
      <option v-for="floor in floors" :key="floor.label" :value="floor.position">{{ floor.label }}</option>
    </select>
    
    <!-- 3D 场景容器 -->
    <div class="chat-panel">
      <div class="chat-header">チャット</div>
      <div class="chat-content">
        <div v-for="(message, index) in messages" :key="index" class="chat-message">
          <span class="message-text">{{ message }}</span>
        </div>
      </div>
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" placeholder="メッセージを入力" class="chat-input" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { navigateTo } from 'nuxt/app'

const sceneContainer = ref<HTMLDivElement | null>(null)
let scene, camera, renderer, character
let sceneModel
const keyboard = { w: false, a: false, s: false, d: false }
const buttonPositions = [
  { x: 5, y: 0, z: 5, url: '/ai/chatbot_v1', label: '2F 総務部' },
  { x: -2, y: 0, z: -5, url: '/ai/chatbot_v1', label: '6F 広報部' }
]
const buttons = []

// 楼层数据
const floors = [
  { label: '2F 総務部', position: new THREE.Vector3(0, 2, 0) },
  { label: '6F 広報部', position: new THREE.Vector3(0, 6, 0) }
]

// 聊天相关
const messages = ref<string[]>([])
const newMessage = ref<string>('')

onMounted(() => {
  // 初始化 Three.js 场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xa0a0a0)

  // 设置相机位置为正面偏上视角
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.set(0, 10, 15)
  camera.lookAt(0, 0, 0)

  // 初始化渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  sceneContainer.value?.appendChild(renderer.domElement)

  // 添加光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(10, 20, 10)
  scene.add(directionalLight)

  // 加载场景模型
  const loader = new GLTFLoader()
  loader.load('/model/scene_model.glb', (gltf) => {
    sceneModel = gltf.scene
    sceneModel.scale.set(1.5, 1.5, 1.5)
    scene.add(sceneModel)

    // 加载角色模型
    loadCharacter()
    // 创建按钮
    createButtons()
  })

  // 监听键盘事件
  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('keyup', handleKeyUp)

  // 添加点击事件监听器
  renderer.domElement.addEventListener('click', onMouseClick)

  // 动画循环
  function animate() {
    requestAnimationFrame(animate)
    moveCharacter()
    renderer.render(scene, camera)
  }
  animate()
})

// 加载角色模型
function loadCharacter() {
  const loader = new GLTFLoader()
  loader.load('/model/character.glb', (gltf) => {
    character = gltf.scene
    character.scale.set(1, 1, 1)
    character.position.set(0, 2, 0) // 设置Y轴位置为2
    scene.add(character)
  })
}

// 创建标签按钮
function createButtons() {
  const buttonGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
  const buttonMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 })

  buttonPositions.forEach((pos) => {
    const button = new THREE.Mesh(buttonGeometry, buttonMaterial)
    button.position.set(pos.x, 0.75, pos.z)
    scene.add(button)
    buttons.push({ mesh: button, url: pos.url })
  })
}

// 发送聊天消息
function sendMessage() {
  if (newMessage.value.trim()) {
    messages.value.push(newMessage.value)
    newMessage.value = ''
  }
}

// 处理楼层选择
function onFloorSelect(event) {
  const selectedPosition = event.target.value
  const position = JSON.parse(selectedPosition)
  camera.position.set(position.x, position.y + 10, position.z + 15)
  camera.lookAt(position)
}

// 键盘按下事件处理
function handleKeyDown(event) {
  switch (event.key) {
    case 'w':
      keyboard.w = true
      break
    case 'a':
      keyboard.a = true
      break
    case 's':
      keyboard.s = true
      break
    case 'd':
      keyboard.d = true
      break
  }
}

// 键盘松开事件处理
function handleKeyUp(event) {
  switch (event.key) {
    case 'w':
      keyboard.w = false
      break
    case 'a':
      keyboard.a = false
      break
    case 's':
      keyboard.s = false
      break
    case 'd':
      keyboard.d = false
      break
  }
}

// 控制角色移动并检测位置
function moveCharacter() {
  if (!character) return
  const speed = 0.2
  if (keyboard.w) {
    character.position.z -= speed
    character.rotation.y = Math.PI
  }
  if (keyboard.s) {
    character.position.z += speed
    character.rotation.y = 0
  }
  if (keyboard.a) {
    character.position.x -= speed
    character.rotation.y = -Math.PI / 2
  }
  if (keyboard.d) {
    character.position.x += speed
    character.rotation.y = Math.PI / 2
  }
  checkProximity()
}

// 检查角色是否接近按钮
function checkProximity() {
  buttons.forEach((button) => {
    const distance = character.position.distanceTo(button.mesh.position)
    if (distance < 1.5) {
      navigateTo(button.url)
    }
  })
}

// 鼠标点击检测
function onMouseClick(event) {
  const mouse = new THREE.Vector2()
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  const raycaster = new THREE.Raycaster()
  raycaster.setFromCamera(mouse, camera)

  const intersects = raycaster.intersectObjects(buttons.map((b) => b.mesh))
  if (intersects.length > 0) {
    const button = buttons.find((b) => b.mesh === intersects[0].object)
    if (button) navigateTo(button.url)
  }
}
</script>

<style scoped>
.scene-container {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.floor-select {
  position: absolute;
  padding: 5px;
  font-size: 27px;
}

.chat-panel {
  position: absolute;
  right: 20px;
  width: 250px;
  height: 400px;
  background-color: #4a90e2;
  color: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 10px;
  font-weight: bold;
  background-color: #357ab8;
  text-align: center;
}

.chat-content {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
}

.chat-message {
  margin-bottom: 10px;
}

.message-text {
  background-color: #ffffff;
  color: #000;
  padding: 5px 10px;
  border-radius: 12px;
  max-width: 200px;
}

.chat-input {
  padding: 10px;
  border: none;
  outline: none;
  font-size: 14px;
}
</style>
