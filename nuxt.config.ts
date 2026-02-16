// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  app: {
    // 깃허브 배포 예정이라면 repo 이름, 로컬 테스트 중이면 '/'
    baseURL: '/' 
  },
  content: {
    // 이 설정이 켜져 있으면 우리가 만든 pages/[...slug].vue 와 충돌합니다.
    // 반드시 false로 꺼주세요!
    documentDriven: false
  },
})