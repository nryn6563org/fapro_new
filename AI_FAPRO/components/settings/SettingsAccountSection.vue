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
          id: "changePassword",
          label: "비밀번호 변경",
          icon: "lock-icon",
        },
        {
          id: "updateInfo",
          label: "회원정보 변경",
          icon: "user-icon",
        }
      ],
    };
  },
  methods: {
    handleAction(id) {
      const urls = {
        changePassword: "https://www.thinkpool.com/customer/pwChange",
        updateInfo: "https://www.thinkpool.com/customer/infoChange"
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
