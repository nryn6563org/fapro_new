<template>
  <div class="guide-page">
    <header class="guide-page__header">
      <h1 class="guide-page__title">Project Visual Tree & Guide</h1>
      <p class="guide-page__subtitle">Architecture Mapping (Rule 11 Compliance)</p>
    </header>

    <div class="guide-page__content">
      <div v-for="page in structure" :key="page.name" class="guide-page__section">
        <div class="guide-page__page-node">
          <div class="guide-page__icon guide-page__icon--page">P</div>
          <span class="guide-page__name">{{ page.name }}</span>
          <span class="guide-page__path">pages/{{ page.file }}</span>
        </div>

        <div class="guide-page__tree">
          <div v-for="comp in page.components" :key="comp.name" class="guide-page__comp-node">
            <div class="guide-page__tree-line"></div>
            <div class="guide-page__icon guide-page__icon--comp">C</div>
            <div class="flex-1">
              <div class="flex items-center justify-between">
                <span class="guide-page__name">{{ comp.name }}</span>
                <span class="guide-page__path">components/{{ comp.file }}</span>
              </div>
              <div class="guide-page__sub-tree">
                <div class="guide-page__meta">
                  <span class="text-blue-500">CSS:</span> assets/css/{{ comp.css }}
                </div>
                <div class="guide-page__meta">
                  <span class="text-purple-500">API:</span> {{ comp.api || 'Internal Mock' }}
                </div>
                <div class="guide-page__meta">
                  <span class="text-orange-500">Logic:</span> {{ comp.logic || 'Vue Composition' }}
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
 */
import '~/assets/css/pages/guide/GuidePage.css'

export default {
  name: 'GuidePage',
  layout: 'default',
  data() {
    return {
      structure: [
        {
          name: '이슈 포착',
          file: 'issues.vue',
          components: [
            {
              name: 'IssueBubbleChart',
              file: 'issues/IssueBubbleChart.vue',
              css: 'pages/issues/...',
              api: 'issueDetectionMockData'
            },
            {
              name: 'IssueAnalysisSide',
              file: 'issues/IssueAnalysisSide.vue',
              css: 'pages/issues/...'
            },
            {
              name: 'IssueProposalModal',
              file: 'issues/IssueProposalModal.vue',
              css: 'pages/issues/...'
            }
          ]
        },
        {
          name: '투자 정보',
          file: 'investment.vue',
          components: [
            {
              name: 'InvestmentIntelligenceCard',
              file: 'investment/InvestmentIntelligenceCard.vue',
              css: 'pages/investment/...'
            },
            {
              name: 'BrokerReportCard',
              file: 'investment/BrokerReportCard.vue',
              css: 'pages/investment/...'
            }
          ]
        },
        {
          name: '고객 목록 (Client)',
          file: 'clients.vue',
          components: [
            {
              name: 'ClientAiSearch',
              file: 'clients/ClientAiSearch.vue',
              css: 'pages/clients/...'
            },
            {
              name: 'ClientListTable',
              file: 'clients/ClientListTable.vue',
              css: 'pages/clients/...'
            },
            {
              name: 'ClientHoldingsModal',
              file: 'clients/ClientHoldingsModal.vue',
              css: 'pages/clients/...'
            }
          ]
        },
        {
          name: '고객 목록 (Customer)',
          file: 'customers.vue',
          components: [
            {
              name: 'CustomerAiSearch',
              file: 'customers/CustomerAiSearch.vue',
              css: 'pages/customers/...'
            },
            {
              name: 'CustomerListTable',
              file: 'customers/CustomerListTable.vue',
              css: 'pages/customers/...'
            }
          ]
        },
        {
          name: '일정 관리',
          file: 'schedule.vue',
          components: [
            {
              name: 'ScheduleHeader',
              file: 'schedule/ScheduleHeader.vue',
              css: 'pages/schedule/...'
            },
            {
              name: 'ScheduleSidebar',
              file: 'schedule/ScheduleSidebar.vue',
              css: 'pages/schedule/...'
            },
            {
              name: 'ScheduleWeekView',
              file: 'schedule/ScheduleWeekView.vue',
              css: 'pages/schedule/...'
            }
          ]
        }
      ]
    }
  }
}
</script>
