<template>
  <footer class="footer">
    <div class="footer__container container">LinguaLearn, 2022 &copy;</div>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  background-color: var(--bg-green-light-color);
  color: var(--primary-light-color);
  padding: 20px 0;

  @include mobile {
    padding: 10px 0;
  }

  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

</style>
