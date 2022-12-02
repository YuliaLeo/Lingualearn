<template>
  <div class="wrapper">
    <app-header></app-header>

    <main class="main-content">
      <router-view></router-view>
    </main>

    <app-footer></app-footer>
  </div>
</template>

<script>
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },
  date() {
    return {};
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
</style>
