<template>
  <div class="wiki-page">
    
    <template v-if="data">
      <div 
        class="full-background" 
        :style="{ backgroundImage: `url(${data.image || '/images/default-bg.jpg'})` }"
      >
        <div class="dim-overlay"></div>
      </div>

      <main class="scroll-container">
        
        <header class="hero-section">
          <div class="hero-content">
            <h1 class="page-title">{{ data.title }}</h1>
            <p class="page-desc">{{ data.description }}</p>
          </div>
          
          <div class="scroll-indicator">
            <span>↓
            </span>
          </div>
        </header>

        <section class="content-wrapper">
          <article class="wiki-body">
            <ContentRenderer :value="data" />
          </article>

          <footer class="wiki-footer">
            <NuxtLink to="/" class="home-btn">← Main</NuxtLink>
            <p>© 2026 Yeonina Wiki</p>
          </footer>
        </section>

      </main>
    </template>

    <div v-else class="not-found">
      <h1>404</h1>
      <p>문서가 없어요!</p>
      <NuxtLink to="/">홈으로</NuxtLink>
    </div>

  </div>
</template>

<script setup>
import E from '~/components/E.vue'
// Nuxt 3 Composition API 방식
const route = useRoute()

const { data } = await useAsyncData(route.path, () => {
  return queryCollection('docs').path(route.path).first()
})

console.log(data.value)

// 페이지 메타 태그 설정 (SEO)
useHead({
  title: data.value?.title || 'Yeonina Wiki',
  meta: [
    { name: 'description', content: data.value?.description || '개인 위키 페이지' }
  ]
})
</script>
<style scoped>
/* 겨울 쿨톤 딥 + 꽉 찬 배경 스타일 
*/

/* 1. 전체 구조 */
.wiki-page {
  min-height: 100vh;
  color: #fff;
  font-family: 'Pretendard', sans-serif;
}

/* 2. 배경 이미지 (고정됨) */
.full-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: -1; /* 제일 뒤로 */
}

/* 배경이 너무 밝을까봐 깐 검은 막 */
.dim-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* 투명도 조절로 밝기 조정 */
  backdrop-filter: blur(2px); /* 배경 살짝 흐리게 (취향껏 제거 가능) */
}

/* 3. 헤더 (Hero Section) - 화면 꽉 채우기 */
.hero-section {
  height: 90vh; /* 화면 높이의 90%를 차지 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
}

.hero-content {
  animation: floatUp 1s ease-out;
}

.page-title {
  font-size: 4rem; /* 제목 아주 크게 */
  font-weight: 800;
  margin: 0;
  text-shadow: 0 0 20px rgba(0,0,0,0.5); /* 글자 뒤 후광 */
  letter-spacing: -0.03em;
}

.page-desc {
  font-size: 1.2rem;
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
}

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  font-size: 2rem;
  animation: bounce 2s infinite;
  opacity: 0.7;
}

/* 4. 본문 영역 (Glassmorphism) */
.content-wrapper {
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 5rem;
}

.wiki-body {
  background: rgba(20, 20, 30, 0.75); /* 반투명 남색 배경 */
  backdrop-filter: blur(15px); /* 유리 블러 효과 */
  padding: 4rem;
  border-radius: 20px; /* 둥근 모서리 */
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
  border: 1px solid rgba(255, 255, 255, 0.1); /* 얇은 테두리 */
  
  /* 타이포그래피 */
  line-height: 1.8;
  font-size: 1.1rem;
  color: #e0e0e0;
}

/* 마크다운 내부 스타일 (:deep 필수) */
.wiki-body :deep(h1) { font-size: 2.2rem; border-bottom: 2px solid #555; padding-bottom: 0.5rem; margin-top: 1rem; color: #fff; }
.wiki-body :deep(h2) { font-size: 1.8rem; border-bottom: 2px solid #555; margin-top: 2.5rem; color: #fff; }
.wiki-body :deep(h3) { font-size: 1.5rem; border-bottom: 2px solid #555; margin-top: 2rem; color: #fff; }
.wiki-body :deep(h2 a) { color: #fff; }
.wiki-body :deep(h3 a) { color: #fff; }
.wiki-body :deep(p) { margin-bottom: 1.5rem; }
.wiki-body :deep(strong) { color: #fff; background: linear-gradient(to top, rgba(142, 155, 255, 0.3) 50%, transparent 50%); } /* 형광펜 효과 */
.wiki-body :deep(a) { color: #8194ff; text-decoration: none; font-weight: 500; }
.wiki-body :deep(a:hover) { text-decoration: underline; color: #fff; }
.wiki-body :deep(ul), .wiki-body :deep(ol) { margin-bottom: 1.5rem; padding-left: 1.5rem; }
.wiki-body :deep(li) { margin-bottom: 0.5rem; }
.wiki-body :deep(blockquote) { 
  background: rgba(255,255,255,0.05); 
  border-left: 4px solid #96a6ff; 
  margin: 2rem 0; 
  padding: 1rem 1.5rem; 
  font-style: italic; 
  color: #ccc;
}
.wiki-body :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 2rem 0;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

/* 코드블록 스타일 */
.wiki-body :deep(pre) {
  background: #111;
  padding: 1.5rem;
  border-radius: 10px;
  overflow-x: auto;
  border: 1px solid rgba(255,255,255,0.1);
}
.wiki-body :deep(code) {
  font-family: monospace;
  background: rgba(255,255,255,0.1);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  color: #ff9e9e;
}
.wiki-body :deep(pre code) { background: transparent; padding: 0; color: inherit; }

/* 5. 푸터 */
.wiki-footer {
  text-align: center;
  margin-top: 3rem;
  color: #888;
}
.home-btn {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.5rem 1.5rem;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 30px;
  color: #fff;
  text-decoration: none;
  transition: all 0.3s;
}
.home-btn:hover {
  background: #fff;
  color: #000;
}

/* 6. 애니메이션 & 반응형 */
@keyframes floatUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

@media (max-width: 768px) {
  .page-title { font-size: 2.5rem; }
  .wiki-body { padding: 2rem; }
  .hero-section { height: 70vh; }
}
</style>