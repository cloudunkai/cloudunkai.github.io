export default defineNuxtRouteMiddleware((to, from) => {
  // isAuthenticated() is an example method verifying if a user is authenticated
  if (to.path === '/') {
    // 跳转到指定页面
    return navigateTo('/ai/chatbot_v1')
  }
})
