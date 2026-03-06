<template>
  <div class="settings-account">
    <div class="settings-account__card">
      <div class="settings-account__header">
        <user-icon class="w-5 h-5 text-slate-700" />
        <h3 class="settings-account__title">회원정보관리</h3>
      </div>
      <div class="settings-account__grid">
        <button
          v-for="action in actions"
          :key="action.id"
          class="settings-account__btn"
          @click="handleAction(action.id)"
        >
          <div class="settings-account__btn-icon-wrapper">
            <component :is="action.icon" class="settings-account__btn-icon" />
          </div>
          <span class="settings-account__btn-label">{{ action.label }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 기능: 회원정보 관리 섹션 (아이디/비번 찾기, 수정 등)
 */
import {
  SettingsIcon,
  MailIcon,
  KeyIcon,
  LockIcon,
  UserIcon,
  UserPlusIcon,
  UserMinusIcon,
} from "vue-feather-icons";
import "~/assets/css/pages/settings/SettingsAccountSection/SettingsAccountSection.css";

export default {
  name: "SettingsAccountSection",
  components: {
    SettingsIcon,
    MailIcon,
    KeyIcon,
    LockIcon,
    UserIcon,
    UserPlusIcon,
    UserMinusIcon,
  },
  data() {
    return {
      actions: [
        {
          id: "findId",
          label: "아이디 찾기",
          icon: "mail-icon",
        },
        {
          id: "findPassword",
          label: "비밀번호 찾기",
          icon: "key-icon",
        },
        {
          id: "changePassword",
          label: "비밀번호 변경",
          icon: "lock-icon",
        },
        {
          id: "updateInfo",
          label: "회원정보 변경",
          icon: "user-icon",
        },
        {
          id: "register",
          label: "회원가입",
          icon: "user-plus-icon",
        },
        {
          id: "withdraw",
          label: "회원탈퇴",
          icon: "user-minus-icon",
        },
      ],
    };
  },
  methods: {
    handleAction(id) {
      const urls = {
        findId: "https://www.thinkpool.com/customer/idInquiry",
        findPassword: "https://www.thinkpool.com/customer/pwInquiry",
        changePassword: "https://www.thinkpool.com/customer/pwChange",
        updateInfo: "https://www.thinkpool.com/customer/infoChange",
        register: "https://sign.thinkpool.com/user/join.do",
        withdraw: "https://www.thinkpool.com/customer/withdraw",
      };

      if (id === "withdraw") {
        alert("0000-0000 로 문의주시기 바랍니다");
        return;
      }

      window.open(urls[id], "_blank");
    },
  },
};
</script>
