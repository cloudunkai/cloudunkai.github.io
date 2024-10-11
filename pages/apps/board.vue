<template>
  <div ref="sceneContainer" class="scene-container" @wheel="handleZoom">
    <div v-if="showOverlay" class="overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { navigateTo } from 'nuxt/app'

const sceneContainer = ref<HTMLDivElement | null>(null)
let scene, camera, renderer
const showOverlay = ref(false)
const targetScale = 10 // 设置触发导航的相机高度

onMounted(() => {
  // 初始化场景
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xa0a0a0) // 背景色

  // 设置相机（正面偏上视角）
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.set(15, 30, 15) // 从上方偏斜角度看向场景
  camera.lookAt(0, 0, 0)

  // 初始化渲染器
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  sceneContainer.value?.appendChild(renderer.domElement)

  // 加载场景模型
  const loader = new GLTFLoader()
  loader.load('/model/main_map.glb', (gltf) => {
    const sceneModel = gltf.scene
    sceneModel.scale.set(0.5, 0.5, 0.5) // 缩小场景比例
    scene.add(sceneModel)
  })

  // 添加光源
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambientLight)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(10, 20, 10)
  scene.add(directionalLight)

  // 动画循环
  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()
})

// 处理滚轮缩放
function handleZoom(event: WheelEvent) {
  event.preventDefault()
  const zoomFactor = event.deltaY > 0 ? 1.1 : 0.9 // 向上滚动放大，向下缩小
  camera.position.y = Math.max(10, camera.position.y * zoomFactor) // 最小高度限制

  // 检查相机高度触发动画并导航到下一个页面
  if (camera.position.y <= targetScale) {
    showOverlay.value = true
    setTimeout(() => {
      navigateTo('/apps/chat') // 替换为目标页面路径
    }, 500) // 等待500毫秒以显示朦胧动画效果
  }
}
</script>

<style scoped>
.scene-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* 半透明黑色蒙层 */
  transition: opacity 0.5s ease;
  opacity: 1;
}
</style>
