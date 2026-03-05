<template>
  <div class="guide-page">
    <!-- ── 헤더 ── -->
    <header class="guide-page__header">
      <h1 class="guide-page__title">FAPRO AI · 프로젝트 구조 가이드</h1>
      <p class="guide-page__subtitle">
        Frontend Agent Development Rules v1.3 준수 · 아키텍처 시각 트리 (Rule
        11)
      </p>
    </header>

    <!-- ── 패키지 버전 섹션 ── -->
    <section class="guide-page__pkg-section">
      <h2 class="guide-page__pkg-title">📦 주요 패키지 버전</h2>
      <div class="guide-page__pkg-grid">
        <div
          v-for="pkg in packages"
          :key="pkg.name"
          class="guide-page__pkg-card"
        >
          <div class="guide-page__pkg-name">{{ pkg.name }}</div>
          <div class="guide-page__pkg-ver">{{ pkg.version }}</div>
          <div class="guide-page__pkg-desc">{{ pkg.desc }}</div>
        </div>
      </div>
    </section>

    <!-- ── 페이지 → 컴포넌트 트리 ── -->
    <div class="guide-page__content">
      <div
        v-for="page in structure"
        :key="page.name"
        class="guide-page__section"
      >
        <!-- 페이지 노드 -->
        <div class="guide-page__page-node">
          <div class="guide-page__icon guide-page__icon--page">P</div>
          <div>
            <span class="guide-page__name">{{ page.name }}</span>
            <span class="guide-page__path">pages/{{ page.file }}</span>
          </div>
        </div>

        <!-- 컴포넌트 트리 -->
        <div class="guide-page__tree">
          <div
            v-for="comp in page.components"
            :key="comp.name"
            class="guide-page__comp-node"
          >
            <div class="guide-page__tree-line"></div>
            <div class="guide-page__icon guide-page__icon--comp">C</div>
            <div class="guide-page__comp-detail">
              <div class="guide-page__comp-header">
                <span class="guide-page__name">{{ comp.name }}</span>
                <span class="guide-page__path">components/{{ comp.file }}</span>
              </div>
              <div class="guide-page__sub-tree">
                <div class="guide-page__meta">
                  <span>CSS:</span> {{ comp.css }}
                </div>
                <div class="guide-page__meta">
                  <span>API:</span> {{ comp.api || "Mock 데이터" }}
                </div>
                <div class="guide-page__meta">
                  <span>Logic:</span> {{ comp.logic || "Vue Options API" }}
                </div>
              </div>

              <!-- 하위 컴포넌트 -->
              <div v-if="comp.children" class="guide-page__subcomponents">
                <div class="guide-page__subcomponents-title">
                  <div class="guide-page__subcomponents-dot"></div>
                  <span class="guide-page__subcomponents-label"
                    >하위 컴포넌트</span
                  >
                </div>
                <div class="guide-page__subcomponents-grid">
                  <div
                    v-for="child in comp.children"
                    :key="child.name"
                    class="guide-page__sub-card"
                  >
                    <div class="guide-page__sub-name">{{ child.name }}</div>
                    <div class="guide-page__sub-path">{{ child.file }}</div>
                    <div class="guide-page__sub-css">{{ child.css }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 프로젝트 시각적 트리 및 가이드 페이지 (Rule 11)
 * 패키지 버전, 페이지-컴포넌트-CSS-API 관계를 시각적으로 나타냅니다.
 */
import "~/assets/css/pages/guide/GuidePage/GuidePage.css";
import { packages, structure } from "~/utils/guideData.js";

export default {
  name: "GuidePage",
  data() {
    return {
      packages,
      structure,
    };
  },
};
</script>
