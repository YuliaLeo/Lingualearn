<template>
  <div class="crossword__ceil">
    <div class="crossword__inner" v-if="positions.length > 0">
      <input
        autocomplete="off"
        type="text"
        maxlength="1"
        class="crossword__input text-bold_medium"
        ref="cell"
        :value="modelValue"
        @keydown="handleInput"
        @click="handleClick"
      />
      <span class="crossword__number">{{ checkFirstCell(x, y) }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Keys } from "@/types/Constants";

export default defineComponent({
  props: {
    wordsCoords: {
      type: Array as PropType<Array<Array<string>>>,
      required: true,
    },
    modelValue: {
      type: String as PropType<String>,
    },
    positions: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
    orientation: {
      type: String as PropType<String>,
    },
    startCells: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
    x: {
      type: Number as PropType<number>,
      required: true,
    },
    y: {
      type: Number as PropType<number>,
      required: true,
    },
  },

  emits: [
    "update:modelValue",
    "nextHorizontal",
    "prevHorizontal",
    "prevVertical",
    "nextVertical",
    "cellActive",
  ],

  methods: {
    focus() {
      (this.$refs.cell as HTMLInputElement)?.focus();
    },

    handleInput(event: KeyboardEvent) {
      const char = String.fromCharCode(event.keyCode);
      const isLetter = /^[A-Za-z]+$/.test(char);

      if (isLetter) {
        this.$emit("update:modelValue", event.key);
        if (this.orientation === "across") this.$emit("nextHorizontal");
        else this.$emit("nextVertical");
      } else {
        switch (event.keyCode) {
          case Keys.BACKSPACE:
          case Keys.DELETE:
            this.$emit("update:modelValue", "");
            if (this.orientation === "across") this.$emit("prevHorizontal");
            else this.$emit("prevVertical");
            break;
          case Keys.LEFT_ARROW:
            this.$emit("prevHorizontal");
            break;
          case Keys.UP_ARROW:
            this.$emit("prevVertical");
            break;
          case Keys.RIGHT_ARROW:
            this.$emit("nextHorizontal");
            break;
          case Keys.DOWN_ARROW:
            this.$emit("nextVertical");
            break;
          default:
        }

        let positions = this.positions;
        this.$emit("cellActive", { positions });
      }

      return event.preventDefault();
    },

    handleClick() {
      let positions = this.positions;
      let mode = "click";
      this.$emit("cellActive", { positions, mode });
    },

    checkFirstCell(cols: number, rows: number) {
      let wordNumber;

      this.startCells.forEach((el, index) => {
        if (el === `${cols},${rows}`) {
          wordNumber = index + 1;
        }
      });

      return wordNumber;
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/crossword";
</style>
