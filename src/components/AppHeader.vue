<template>
  <header class="header" :class="{ 'header--active': headerActive }">
    <div class="header__container container">
      <logo></logo>
      <div class="spacer"></div>
      <nav class="header__buttons">
        <a href="/crossword" class="button button--link text-bold_medium"
          >Crossword</a
        >
      </nav>
      <burger-menu @addActive="addHeaderActive"></burger-menu>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Logo from "@/components/Logo.vue";
import BurgerMenu from "@/components/BurgerMenu.vue";

export default defineComponent({
  components: {
    Logo,
    BurgerMenu,
  },

  data() {
    return {
      headerActive: false as boolean,
    };
  },

  methods: {
    addHeaderActive(state: boolean) {
      this.headerActive = state;
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  background-color: var(--bg-green-light-color);

  &--active {
    .header__buttons {
      left: 0;

      &:before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 60px;
        background-color: var(--bg-green-light-color);
        z-index: 3;
      }
    }
  }

  &__container {
    display: flex;
    align-items: center;
    gap: 16px;

    @include mobile {
      max-height: 60px;
    }

    @include tablet {
      max-height: 80px;
    }
  }

  &__logo {
    z-index: 5;
  }

  &__buttons {
    display: flex;
    gap: 16px;

    @include mobile {
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: -100%;
      overflow: auto;
      z-index: 2;
      background-color: var(--bg-primary-color);
      transition: left 0.3s ease 0s;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 72px 16px;
      box-sizing: border-box;
    }
  }

  &__avatar {
    z-index: 5;
  }

  &__burger {
    z-index: 5;
  }
}
</style>
