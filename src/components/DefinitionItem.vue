<template>
  <div
    class="crossword__definition"
    :class="{ 'definition-done': definition.isDone }"
    ref="definition"
  >
    {{ definition.number }}. {{ definition.clue }}
  </div>
</template>

<script lang="ts">
import Definition from "@/types/Definition";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
	definition: {
      type: Object as PropType<Definition>,
		required: true,
   }
  },
});
</script>

<style scoped></style>
