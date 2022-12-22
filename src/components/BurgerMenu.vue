<template>
  <div
    class="header__burger burger-menu clickable"
    @click="addActive"
    :class="{ 'burger-menu--active': burgerActive }"
  >
    <span class="burger-menu__line"></span>
    <span class="burger-menu__line"></span>
    <span class="burger-menu__line"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      burgerActive: false as boolean,
    };
  },

  methods: {
    addActive() {
      this.burgerActive = !this.burgerActive;
      this.$emit("addActive", this.burgerActive);
      // для того, чтобы при открытии меню саму страницу нельзя было скролить
      document.body?.classList?.toggle("lock");
    },
  },
});
</script>

<style lang="scss" scoped>
.burger-menu {
  position: relative;
  width: 30px;
  height: 18px;

  &__line {
    transition: top 0.3s ease 0s, bottom 0.3s ease 0s, transform 0.3s ease 0s;
    position: absolute;
    width: 100%;
    height: 2px;
    left: 0;
    top: calc(50% - 1px);
    background-color: var(--primary-light-color);

    &:first-child {
      top: 0;
    }
    &:last-child {
      top: auto;
      bottom: 0;
    }
  }

  &--active {
    .burger-menu__line {
      transform: scale(0);

      &:first-child {
        transform: rotate(-45deg);
        top: calc(50% - 1px);
      }
      &:last-child {
        transform: rotate(45deg);
        bottom: calc(50% - 1px);
      }
    }
  }

  @include tablet {
    display: none;
  }
}
</style>
