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
          :class="['settings-account__btn', action.hoverClass]"
          @click="handleAction(action.id)"
        >
          <component :is="action.icon" class="w-4 h-4 mr-2" />
          {{ action.label }}
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
          hoverClass: "hover:border-[#14B8A6] hover:text-[#14B8A6]",
        },
        {
          id: "findPassword",
          label: "비밀번호 찾기",
          icon: "key-icon",
          hoverClass: "hover:border-[#14B8A6] hover:text-[#14B8A6]",
        },
        {
          id: "changePassword",
          label: "비밀번호 변경",
          icon: "lock-icon",
          hoverClass: "hover:border-[#F59E0B] hover:text-[#F59E0B]",
        },
        {
          id: "updateInfo",
          label: "회원정보 변경",
          icon: "user-icon",
          hoverClass: "hover:border-[#F59E0B] hover:text-[#F59E0B]",
        },
        {
          id: "register",
          label: "회원가입",
          icon: "user-plus-icon",
          hoverClass: "hover:border-blue-500 hover:text-blue-500",
        },
        {
          id: "withdraw",
          label: "회원탈퇴",
          icon: "user-minus-icon",
          hoverClass: "hover:border-red-500 hover:text-red-500 hover:bg-red-50",
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
