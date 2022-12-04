<template>
  <div class="crossword__ceil">
    <div class="crossword__inner" v-if="positions.length > 0">
      <input
        autocomplete="off"
        type="text"
        maxlength="1"
        class="crossword__input text-bold_medium"
        :class="{
          'letter-correct': cell.isCorrect,
          'letter-incorrect': cell.isIncorrect,
          'active-cell': cell.isActive,
        }"
        ref="cell"
        :value="modelValue"
        @keydown="handleInput"
        @click="handleClick"
      />
      <span class="crossword__number">{{
        checkFirstCell(cell.row, cell.col)
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Keys } from "@/types/Constants";
import Point from "@/types/Point";
import Cell from "@/types/Cell";

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<string | null>,
    },
    positions: {
      type: Array as PropType<Array<number>>,
      required: true,
    },
    orientation: {
      type: String as PropType<String>,
    },
    firstCellsOfWords: {
      type: Array as PropType<Array<Point>>,
      required: true,
    },
    cell: {
      type: Object as PropType<Cell>,
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

    checkFirstCell(rows: number, cols: number) {
      let wordNumber;

      this.firstCellsOfWords.forEach((el, index) => {
        if (el.row === rows && el.col === cols) {
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
