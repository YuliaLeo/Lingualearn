<template>
  <div class="loading" v-if="isLoading">
    <div class="container">
      <div class="loading__text" v-if="!hasLoadingError">
        Загрузка страницы...
      </div>
      <div class="loading__error" v-if="hasLoadingError">
        <p>Ошибка доступа к базе данных</p>
        <p>
          Вы будете перенаправлены на главную страницу через {{ currentTime }}
        </p>
      </div>
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
    hasLoadingError: {
      type: Boolean as PropType<boolean>,
    },
    currentTime: {
      type: Number as PropType<number>,
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

  &__error {
    display: grid;
    gap: 20px;
  }
}
</style>
