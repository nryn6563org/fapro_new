<template>
  <div v-if="issue && issue.newsSummary" class="issue-detail__news-detail">
    <div class="issue-detail__section-label">
      <!-- <div class="fapro-badge fapro-badge--teal fapro-badge--sm mr-2">12</div> -->
      <h5 class="issue-detail__section-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12.4997 15H8.33301" stroke="#14B8A6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14.9997 11.6667H8.33301" stroke="#14B8A6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
          <path
            d="M3.33366 18.3334H16.667C17.109 18.3334 17.5329 18.1578 17.8455 17.8453C18.1581 17.5327 18.3337 17.1088 18.3337 16.6667V3.33341C18.3337 2.89139 18.1581 2.46746 17.8455 2.1549C17.5329 1.84234 17.109 1.66675 16.667 1.66675H6.66699C6.22496 1.66675 5.80104 1.84234 5.48848 2.1549C5.17592 2.46746 5.00033 2.89139 5.00033 3.33341V16.6667C5.00033 17.1088 4.82473 17.5327 4.51217 17.8453C4.19961 18.1578 3.77569 18.3334 3.33366 18.3334ZM3.33366 18.3334C2.89163 18.3334 2.46771 18.1578 2.15515 17.8453C1.84259 17.5327 1.66699 17.1088 1.66699 16.6667V9.16675C1.66699 8.72472 1.84259 8.3008 2.15515 7.98824C2.46771 7.67568 2.89163 7.50008 3.33366 7.50008H5.00033"
            stroke="#14B8A6"
            stroke-width="1.66667"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M14.1663 5H9.16634C8.7061 5 8.33301 5.3731 8.33301 5.83333V7.5C8.33301 7.96024 8.7061 8.33333 9.16634 8.33333H14.1663C14.6266 8.33333 14.9997 7.96024 14.9997 7.5V5.83333C14.9997 5.3731 14.6266 5 14.1663 5Z" stroke="#14B8A6" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        관련 뉴스 상세
      </h5>
    </div>
    <div class="issue-detail__news-content">
      <div class="issue-detail__news-summary-box">
          <p class="issue-detail__news-text">
          {{ issue.newsSummary }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 이슈 관련 뉴스 상세
 */
import {  } from "vue-feather-icons";
import "~/assets/css/pages/issues/IssueDetailNews/IssueDetailNews.css";

export default {
  name: "IssueDetailNews",
  components: {
  },
  props: {
    issue: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>
