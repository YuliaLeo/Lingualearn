<template>
  <div class="homepage container">
    <div class="homepage__main">
      <div class="homepage__block homepage-block homepage-block--main">
        <h1 class="homepage__title">A platform for learning languages</h1>
        <div class="homepage__info">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos,
          tempore obcaecati corporis eum veniam omnis quos, nesciunt optio,
          reiciendis vitae ipsum iure magni modi placeat ipsa eveniet officia
          reprehenderit enim unde aspernatur necessitatibus. Dicta obcaecati
          sint et, repellat quis tempore officia deserunt veniam molestiae
          voluptatibus. Saepe provident fugit vitae aliquam?
        </div>
      </div>
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
        <a href="#" class="homepage-block__button button button--link"
          >ipsum dolor sit</a
        >
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
          <a href="#" class="homepage-block__button button button--link"
            >ipsum dolor sit</a
          >
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
          <a href="#" class="homepage-block__button button button--link"
            >ipsum dolor sit</a
          >
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

  &__title {
    font-size: var(--font-size-big);
    font-weight: normal;
    text-align: center;
  }

  &__blocks {
    display: flex;
    gap: 30px;
  }

  &__info {
    line-height: 30px;
  }
}
.homepage-block {
  display: grid;
  gap: 20px;
  background-color: var(--bg-green-light-color);
  border-radius: 10px;
  padding: 15px;
  color: var(--white-color);

  &--main {
    gap: 30px;
    padding: 25px;
  }

  &__title {
    font-size: var(--font-size-medium);
  }

  &__text {
    line-height: 24px;
  }

  &__button {
    justify-self: end;
  }
}
</style>
