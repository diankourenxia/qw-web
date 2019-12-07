import Vue from "vue";

Vue.directive("focus", {
  inserted(el: HTMLElement) {
    const inputElement = el.querySelector("input");
    if (inputElement) {
      inputElement.focus();
    }
  }
});
