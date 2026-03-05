import Modal from "modal-vanilla";
// modal-vanilla does not provide own CSS, using project BEM styles instead

/**
 * 기능: Modal-Vanilla 플러그인 (Rule 7)
 * Vue 인스턴스에 $modalV로 바인딩하여 전역에서 사용 가능토록 함
 */

export default (context, inject) => {
  const modalV = {
    alert(title, content, options = {}) {
      return Modal.alert(content, { title, ...options });
    },
    confirm(title, content, options = {}) {
      return Modal.confirm(content, { title, ...options });
    },
    show(options) {
      return new Modal(options).show();
    },
  };

  inject("modalV", modalV);
};
