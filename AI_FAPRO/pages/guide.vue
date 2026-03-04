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

              <!-- Subcomponents -->
              <div v-if="comp.children" class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div class="flex items-center gap-1 mb-2">
                  <div class="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  <span class="text-xs font-bold text-slate-500 dark:text-slate-400">Sub Components</span>
                </div>
                <div class="flex gap-2 flex-wrap">
                  <div v-for="child in comp.children" :key="child.name" class="flex-1 min-w-[200px] bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    <div class="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">{{ child.name }}</div>
                    <div class="text-xs text-slate-500">C: {{ child.file }}</div>
                    <div class="text-[10px] text-blue-500 truncate mt-1">CSS: {{ child.css }}</div>
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
 */
import '~/assets/css/pages/guide/GuidePage/GuidePage.css'

export default {
  name: 'GuidePage',
  layout: 'default',
  data() {
    return {
      structure: [
        {
          name: '기본 레이아웃',
          file: 'layouts/default.vue',
          components: [
            {
              name: 'AppSidebar',
              file: 'layout/AppSidebar.vue',
              css: 'layout/AppSidebar/AppSidebar.css',
              children: [
                { name: 'AppSidebarNav', file: 'layout/AppSidebarNav.vue', css: 'layout/AppSidebarNav/AppSidebarNav.css' },
                { name: 'AppSidebarUser', file: 'layout/AppSidebarUser.vue', css: 'layout/AppSidebarUser/AppSidebarUser.css' }
              ]
            }
          ]
        },
        {
          name: '이슈 포착',
          file: 'issues.vue',
          components: [
            {
              name: 'IssueDetailSection',
              file: 'issues/IssueDetailSection.vue',
              css: 'pages/issues/IssueDetailSection/IssueDetailSection.css',
              children: [
                { name: 'IssueDetailStats', file: 'issues/IssueDetailStats.vue', css: 'pages/issues/IssueDetailStats/IssueDetailStats.css' },
                { name: 'IssueDetailStockTable', file: 'issues/IssueDetailStockTable.vue', css: 'pages/issues/IssueDetailStockTable/IssueDetailStockTable.css' },
                { name: 'IssueDetailAnalysis', file: 'issues/IssueDetailAnalysis.vue', css: 'pages/issues/IssueDetailAnalysis/IssueDetailAnalysis.css' },
                { name: 'IssueDetailNews', file: 'issues/IssueDetailNews.vue', css: 'pages/issues/IssueDetailNews/IssueDetailNews.css' }
              ]
            },
            {
              name: 'IssueBubbleChart',
              file: 'issues/IssueBubbleChart.vue',
              css: 'pages/issues/IssueBubbleChart/IssueBubbleChart.css',
              api: 'issueDetectionMockData'
            },
            {
              name: 'IssueProposalModal',
              file: 'issues/IssueProposalModal.vue',
              css: 'pages/issues/IssueProposalModal/IssueProposalModal.css',
              children: [
                { name: 'IssueProposalInfo', file: 'issues/IssueProposalInfo.vue', css: 'pages/issues/IssueProposalInfo/IssueProposalInfo.css' },
                { name: 'IssueProposalForm', file: 'issues/IssueProposalForm.vue', css: 'pages/issues/IssueProposalForm/IssueProposalForm.css' }
              ]
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
              name: 'SmartOnboardingModal',
              file: 'clients/SmartOnboardingModal.vue',
              css: 'pages/clients/SmartOnboardingModal/SmartOnboardingModal.css',
              children: [
                { name: 'SmartOnboardingExtract', file: 'clients/SmartOnboardingExtract.vue', css: 'pages/clients/SmartOnboardingExtract/SmartOnboardingExtract.css' },
                { name: 'SmartOnboardingForm', file: 'clients/SmartOnboardingForm.vue', css: 'pages/clients/SmartOnboardingForm/SmartOnboardingForm.css' }
              ]
            },
            {
              name: 'ClientHoldingsModal',
              file: 'clients/ClientHoldingsModal.vue',
              css: 'pages/clients/ClientHoldingsModal/ClientHoldingsModal.css',
              children: [
                { name: 'ClientHoldingsTable', file: 'clients/ClientHoldingsTable.vue', css: 'pages/clients/ClientHoldingsTable/ClientHoldingsTable.css' },
                { name: 'ClientHoldingsSummary', file: 'clients/ClientHoldingsSummary.vue', css: 'pages/clients/ClientHoldingsSummary/ClientHoldingsSummary.css' },
                { name: 'ClientHoldingsAnalysis', file: 'clients/ClientHoldingsAnalysis.vue', css: 'pages/clients/ClientHoldingsAnalysis/ClientHoldingsAnalysis.css' }
              ]
            },
            {
              name: 'ClientAiSearch',
              file: 'clients/ClientAiSearch.vue',
              css: 'pages/clients/...'
            },
            {
              name: 'ClientListTable',
              file: 'clients/ClientListTable.vue',
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
