<template>
  <!--  сильно прыгает форматирование по файлам, надо применить по проекту автоформатирование ко всем файлам-->

  <header class="header" :class="{ 'header--active': headerActive }">
    <div class="header__container container">
      <logo></logo>
      <div class="spacer"></div>
      <nav class="header__buttons">
        <a href="#" class="button button--link text-bold_medium">Quiz</a>
        <a href="/#/crossword" class="button button--link text-bold_medium"
          >Crossword</a
        >
      </nav>

      <!--        если какие-то компоненты в итоге не будут использованы - их лучше удалить, сейчас у тебя нет профиля пользователя-->
      <avatar></avatar>
      <burger-menu @addActive="addHeaderActive"></burger-menu>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Logo from "@/components/Logo.vue";
import Avatar from "@/components/Avatar.vue";
import BurgerMenu from "@/components/BurgerMenu.vue";

export default defineComponent({
  components: {
    Logo,
    Avatar,
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
@import "@/assets/scss/_header.scss";
</style>
