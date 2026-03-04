<script setup>
import { onMounted, ref, watch, nextTick } from 'vue'

const props = defineProps({
  code: { type: String, default: '' },
  options: { type: Object, default: () => ({ responsive: 'resize' }) }
})

const abcContainer = ref(null)

const renderAbc = async () => {
  // 1. 빌드 시점(서버)에서는 절대 실행되지 않도록 가드
  if (!process.client || typeof window === 'undefined') return

  try {
    // 2. 라이브러리를 동적으로 로드 (중요: 빌드 시점에 포함되지 않음)
    const abcjs = await import('abcjs')
    const renderer = abcjs.renderAbc || abcjs.default.renderAbc

    if (!props.code || !abcContainer.value) return

    await nextTick()
    // 3. 렌더링 실행
    renderer(abcContainer.value, props.code, props.options)
  } catch (e) {
    // 빌드 로그를 더럽히지 않도록 클라이언트에서만 에러 출력
    if (process.client) console.error('ABCJS Render Error:', e)
  }
}

onMounted(() => {
  renderAbc()
})

watch(() => props.code, renderAbc)
</script>

<template>
  <div class="abc-notation-wrapper">
    <div ref="abcContainer"></div>
  </div>
</template>
<style scoped>
.abc-notation-container {
  margin: 1.5rem 0;
  overflow-x: auto;
  /* background: white; */
  padding: 1rem;
  border-radius: 8px;
}
</style>