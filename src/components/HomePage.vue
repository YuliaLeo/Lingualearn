<template>
  <div class="homepage container">
    <div class="homepage__main">
      <div class="homepage__intro"></div>
      <div class="homepage__block homepage-block">
        <div class="homepage-block__title">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </div>
        <div class="homepage-block__text">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </div>
        <a href="#" class="homepage-block__button">ipsum dolor sit</a>
      </div>
      <div class="homepage__blocks">
        <div class="homepage__block homepage-block">
          <div class="homepage-block__title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </div>
          <div class="homepage-block__text">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </div>
          <a href="#" class="homepage-block__button">ipsum dolor sit</a>
        </div>
        <div class="homepage__block homepage-block">
          <div class="homepage-block__title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </div>
          <div class="homepage-block__text">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </div>
          <a href="#" class="homepage-block__button">ipsum dolor sit</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.homepage {
  &__main {
    display: grid;
    gap: 30px;
  }

  &__intro {
    height: 500px;
    background-color: var(--bg-green-light-color);
  }
  &__blocks {
    display: flex;
    gap: 30px;
  }
  &__block {
    padding: 15px;
    background-color: var(--bg-green-light-color);
    color: var(--white-color);
    border-radius: 10px;
    display: grid;
    gap: 20px;
  }
}
.homepage-block {
  &__title {
    font-size: var(--font-size-medium);
  }
  &__text {
  }

  &__button {
    text-transform: uppercase;
    color: inherit;
    background-color: var(--bg-green-dark-color);
    padding: 10px;
    border-radius: 5px;
    max-width: 150px;
    justify-self: end;
  }
}
</style>
