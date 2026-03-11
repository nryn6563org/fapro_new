# AI_FAPRO Migration Guide

## Environment Specifications

- **Node.js**: v16.x (Recommended for Nuxt 2)
- **Framework**: Nuxt.js v2.15.8
- **Styling**: Tailwind CSS v3.x
- **Language**: JavaScript / Vue 2

## Mandatory Frontend Rules (The 15 Rules)

1. **No Internal Styles**: All styles in `assets/css/`.
2. **No Bootstrap**: Pure Tailwind + BEM.
3. **CSS Hierarchy**: `assets/css/[PageName]/[ComponentName]/[Filename].css`.
4. **Functional CSS Granularity**: Use Korean comments.
5. **Tailwind via @apply**: Extract to BEM classes.
6. **Single Class Principle**: One BEM class per tag.
7. **Mandatory Libraries**: Modal-Vanilla, Animate.css, SwiperJS, D3.js.
8. **Purpose-Driven Naming**: Intent over form.
9. **Structural Granularity**: 150-line limit per component.
10. **Korean Documentation**: All comments in Korean.
11. **Guide Page & Visual Tree**: Automated mapping.
12. **Project Specification Log**: Tracking versions/decisions.
13. **Unique Filename Requirement**: Descriptive prefixes.
14. **Smart Search & UX**: Autocomplete enforcement.
15. **External Library Styling Control**: Styles in `assets/css/`.

## Route Visual Tree (Rule 11)

### [/] - AI 인텔리전스 리포트 (메인)

```mermaid
graph TD
    Page["pages/index.vue"] --> CSS_Page["assets/css/pages/index/IndexPage/IndexPage.css"]
    Page --> Card["components/discovery/AIReportCard.vue"]
```

### [/contact] - AI 컨텍 제안

```mermaid
graph TD
    Page["pages/contact.vue"] --> CSS_Page["assets/css/pages/contact/ContactPage/ContactPage.css"]
    Page --> TodayProposalCard["components/dashboard/TodayProposalCard.vue"]
    Page --> CustomerIntelligenceCard["components/dashboard/CustomerIntelligenceCard.vue"]
```

### [/issues] - AI 이슈 포착

```mermaid
graph TD
    Page["pages/issues.vue"] --> CSS_Page["assets/css/pages/issues/IssuesPage.css"]
    Page --> Header["components/issues/IssuesPage/IssuesPageHeader.vue"]
    Page --> Stats["components/issues/IssuesPage/IssuesPageStats.vue"]
    Chart["components/issues/IssueBubbleChart.vue"]
    Analysis["components/issues/IssueAnalysisSide.vue"]
    Detail["components/issues/IssueDetailSection.vue"]
    Modal["components/issues/IssueProposalModal.vue"]
```

### [/customers] - 고객 목록

```mermaid
graph TD
    Page["pages/customers.vue"] --> CSS_Page["assets/css/pages/customers/CustomersPage.css"]
    Page --> Header["components/customers/CustomersPage/CustomersPageHeader.vue"]
    Page --> Upload["components/customers/CustomerUploadArea.vue"]
    Page --> Search["components/customers/CustomerAiSearch.vue"]
    Search --> SearchHeader["components/customers/CustomerAiSearch/CustomerAiSearchHeader.vue"]
    Search --> SearchRecommends["components/customers/CustomerAiSearch/CustomerAiSearchRecommends.vue"]
    Search --> SearchFilters["components/customers/CustomerAiSearch/CustomerAiSearchFilters.vue"]
    Page --> Table["components/customers/CustomerListTable.vue"]
    Page --> DetailModal["components/customers/CustomerDetailModal.vue"]
    Page --> HoldingsModal["components/customers/CustomerHoldingsModal.vue"]
    HoldingsModal --> H_Header["components/customers/CustomerHoldingsModal/CustomerHoldingsHeader.vue"]
    HoldingsModal --> H_Summary["components/customers/CustomerHoldingsModal/CustomerHoldingsSummary.vue"]
    HoldingsModal --> H_Table["components/customers/CustomerHoldingsModal/CustomerHoldingsTable.vue"]
    HoldingsModal --> H_AI["components/customers/CustomerHoldingsModal/CustomerHoldingsAiAnalysis.vue"]
```

### [/signals] - AI 매매신호 포착

```mermaid
graph TD
    Page["pages/signals.vue"] --> CSS_Page["assets/css/pages/signals/SignalsPage/SignalsPage.css"]
    Page --> Header["components/signals/SignalsPage/SignalsPageHeader.vue"]
    Page --> Column["components/signals/SignalsPage/SignalsPageSignalColumn.vue"]
    Page --> Modal["components/signals/SignalsPage/SignalsPageReportModal.vue"]
    Column --> Card["components/signals/TradingSignalCard.vue"]
    Modal --> Content["components/signals/AIReportContent.vue"]
```


### [/strategic-stocks] - AI 중장기 유망주

```mermaid
graph TD
    Page["pages/strategic-stocks.vue"] --> CSS_Page["assets/css/pages/strategic-stocks/StrategicStocksPage.css"]
    Page --> Card["components/strategic-stocks/StrategicStockCard.vue"]
    Page --> Modal["components/strategic-stocks/StrategicProposalModal.vue"]
```

## Directory Structure

- `assets/css/`: Centralized CSS storage.
- `components/`: Modularized Vue components.
- `pages/`: Nuxt based routing.
- `utils/`: Mock data and utility functions.
- `layouts/`: Application layouts.
- `plugins/`: Vue plugins (Modal, Autocomplete, etc).
