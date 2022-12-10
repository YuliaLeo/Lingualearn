<template>
  <div class="loading" v-if="isLoading">
    <div class="container">
      <div class="loading__text">Загрузка страницы...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    isLoading: {
      type: Boolean as PropType<boolean>,
    },
  },
});
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 10;
  background-color: var(--white-color);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: var(--font-size-big);

  @include mobile {
    font-size: var(--font-size-medium);
  }
}
</style>
