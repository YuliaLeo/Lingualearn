<template>
  <div :class="['crossword__definition']">1. {{ clue }}</div>
</template>

<script>
export default {
  props: {
    clue: {
      type: String,
    },
  },
};
</script>

<style scoped></style>
