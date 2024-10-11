<template>
  <div ref="container" class="map-container"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {
  CSS2DRenderer,
  CSS2DObject
} from 'three/examples/jsm/renderers/CSS2DRenderer.js'
import { gsap } from 'gsap'
import { navigateTo } from 'nuxt/app'

const container = ref<HTMLDivElement | null>(null)
const labels = [] // 存储标签对象
let model // 存储模型对象

let initialCameraPosition, initialLookAt // 初始位置和目标
const currentCameraTarget = new THREE.Vector3(0, 0, 0) // 默认目标
// 重置相机位置函数

onMounted(() => {
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x87ceeb) // 水蓝色背景

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  )
  camera.position.set(0, 15, 30)

  initialCameraPosition = camera.position.clone()
  initialLookAt = currentCameraTarget.clone()

  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(window.innerWidth, window.innerHeight)
  container.value?.appendChild(renderer.domElement)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
  directionalLight.position.set(10, 10, 10)
  scene.add(directionalLight)

  // 加载 3D 模型
  const loader = new GLTFLoader()
  loader.load('/model/model.glb', (gltf) => {
    model = gltf.scene
    scene.add(model)

    const box = new THREE.Box3().setFromObject(model)
    const center = box.getCenter(new THREE.Vector3())

    // 将模型位置移到场景中心
    model.position.set(-center.x, -center.y, -center.z)

    // 向上移动模型的位置
    model.position.y += 10
    model.position.x -= 2

    // 设置相机位置在正面偏上，同时 Y 轴向上移动
    camera.position.set(center.x, center.y + 20, center.z + 30)
    camera.lookAt(center)
    initialCameraPosition.copy(camera.position)
    currentCameraTarget.copy(center)
    initialLookAt.copy(center)

    // 创建标签并放置在模型上
    createLabel('金融', new THREE.Vector3(-10, 2, -5), '/apps/board')
    createLabel('商社', new THREE.Vector3(-7, 4, 12), '/apps/board')
    createLabel('官公庁', new THREE.Vector3(0, 2, 5), '/apps/board')
    createLabel('メーカー', new THREE.Vector3(9, 3, -2), '/apps/board')
    createLabel('小売', new THREE.Vector3(8, 2, 9), '/apps/board')
  })

  const labelRenderer = new CSS2DRenderer()
  labelRenderer.setSize(window.innerWidth, window.innerHeight)
  labelRenderer.domElement.style.position = 'absolute'
  labelRenderer.domElement.style.top = '0px'
  container.value?.appendChild(labelRenderer.domElement)

  // 标签点击的拉近效果
  function zoomToLabel(position) {
    const targetDistance = 15 // 设置拉近的距离
    const direction = new THREE.Vector3()
      .subVectors(position, camera.position)
      .normalize()
    const targetPosition = camera.position
      .clone()
      .add(direction.multiplyScalar(targetDistance))

    gsap.to(camera.position, {
      x: targetPosition.x,
      y: targetPosition.y,
      z: targetPosition.z,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        camera.lookAt(initialLookAt) // 确保相机保持原始的朝向
      },
      onComplete: () => {
        currentCameraTarget.copy(position)
      }
    })
  }

  // 创建标签
  function createLabel(text: string, position: THREE.Vector3, route: string) {
    const div = document.createElement('div')
    div.className = 'tabsLabel'
    div.textContent = text
    div.style.cursor = 'pointer'

    // 点击事件处理，先进行拉近动画再跳转
    div.addEventListener('click', (event) => {
      event.stopPropagation()
      zoomToLabel(position)
      setTimeout(() => {
        navigateTo(route) // 使用 Nuxt 3 的 navigateTo 进行页面跳转
      }, 2000) // 等待2秒确保动画完成再跳转
    })

    const label = new CSS2DObject(div)
    label.position.copy(position)
    model.add(label)
    labels.push(label)
  }

  // 动画循环
  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
    labelRenderer.render(scene, camera)
  }

  animate()

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    labelRenderer.setSize(window.innerWidth, window.innerHeight)
  })
})
</script>

<style>
.map-container {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
}

.tabsLabel {
  display: inline-block;
  background: #4caf50; /* 按钮背景色 */
  color: white; /* 按钮文字颜色 */
  padding: 10px 20px; /* 内边距 */
  border-radius: 6px; /* 圆角 */
  font-size: 16px; /* 加大字体 */
  font-weight: bold;
  text-align: center;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.tabsLabel:hover {
  background-color: #45a049; /* 悬停背景色 */
  transform: scale(1.05); /* 悬停时放大效果 */
}
</style>
