<script setup>
</script>

<template>
  <nav class="navbar">
    <div class="nav-container">
      
      <div class="brand-group">
        <span class="brand-logo">
          <a href="/">정리함</a>
        </span>
        <span class="beta-badge">Beta</span>
      </div>

      <div class="nav-actions">
        <NuxtLink to="https://github.com/jyhyun1008/mywiki" class="btn-register">
          기여하기
        </NuxtLink>
      </div>

    </div>
  </nav>

  <div id="all-wrapper">
    <slot />
  </div>
</template>

<style scoped>
/* 1. 네비게이션 바 전체 스타일 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  
  /* 테두리 및 배경 (bg-[#0f172a]/80) */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(12px); /* backdrop-blur-md */
}

/* 2. 네비게이션 내부 컨테이너 */
.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem; /* h-16 */
  max-width: 80rem; /* max-w-7xl */
  margin: 0 auto; /* mx-auto */
  padding: 0 1rem; /* px-4 */
}

/* 반응형 패딩 (sm, lg 대응) */
@media (min-width: 640px) {
  .nav-container { padding: 0 1.5rem; }
}
@media (min-width: 1024px) {
  .nav-container { padding: 0 2rem; }
}

/* 3. 로고 영역 */
.brand-group {
  display: flex;
  align-items: center;
  gap: 0.5rem; /* gap-2 */
}

/* 그라데이션 텍스트 로고 */
.brand-logo {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 900; /* font-black */
  
  /* 그라데이션 (purple-400 to pink-600) */
  background: linear-gradient(to right, #959aff, #db27b7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.brand-logo a {
  text-decoration: none;
  color: inherit;
}

/* 베타 뱃지 */
.beta-badge {
  background-color: rgba(255, 255, 255, 0.1);
  color: #9ca3af; /* text-gray-400 */
  font-size: 0.75rem; /* text-xs */
  font-weight: 500;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px; /* rounded-full */
}

/* 4. 우측 메뉴 영역 */
.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem; /* gap-4 */
}

/* 로그인 링크 */
.link-login {
  font-size: 0.875rem; /* text-sm */
  font-weight: 500;
  color: #d1d5db; /* text-gray-300 */
  text-decoration: none;
  transition: color 0.2s;
}
.link-login:hover {
  color: #ffffff;
}

/* 프로필 만들기 버튼 */
.btn-register {
  display: inline-block;
  background-color: #555df7; /* bg-purple-600 */
  color: white;
  font-size: 0.875rem; /* text-sm */
  font-weight: 700; /* font-bold */
  padding: 0.5rem 1rem; /* px-4 py-2 */
  border-radius: 9999px; /* rounded-full */
  text-decoration: none;
  transition: background-color 0.15s;
}
.btn-register:hover {
  background-color: #a855f7; /* hover:bg-purple-500 */
}

/* 기존 전역 스타일 유지 */

svg.lucide {
  display: inline;
  margin-bottom: 3px;
}
</style>