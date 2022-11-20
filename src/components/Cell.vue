<template>
	<div class="crossword__ceil">
		<input
			autocomplete="off"
			type="text"
			maxlength="1"
			class="crossword__input text-bold_medium"
      ref="cell"
			@keydown="handleInput"
      :value="modelValue"
		/>
		<span class="crossword__number"></span>
	</div>
</template>

<script>
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const TAB = 9;
const BACKSPACE = 8;
const DELETE = 46;

export default {
  props: ['modelValue'],
  emits: [
    'update:modelValue',
    'next',
    'prev'
  ],
	methods: {
    focus() {
      this.$refs.cell.focus();
    },
    handleInput(event) {
      const char = String.fromCharCode(event.keyCode);
      const isLetter = (/^[A-Za-z]+$/.test(char));

      if (isLetter) {
        this.$emit('update:modelValue', event.key);
        this.$emit("next");
      } else {
        switch (event.keyCode) {
          case BACKSPACE:
          case DELETE:
            this.$emit('update:modelValue', '');
            this.$emit("prev");
            break;
          case LEFT_ARROW:
          case UP_ARROW:
            this.$emit("prev");
            break;
          case RIGHT_ARROW:
          case DOWN_ARROW:
          case TAB:
            this.$emit("next");
            break;
          default:
            // nothing
        }
      }

      return event.preventDefault();
    },

		onKeyUp(event) {
         if (event.keyCode === TAB) {
            return false;
         } 
			else if (
            event.keyCode === RIGHT_ARROW ||
            event.keyCode === LEFT_ARROW ||
            event.keyCode === BACKSPACE || 
            event.keyCode === DELETE
			) {
            if (event.keyCode === BACKSPACE || event.keyCode === DELETE) {
					 this.$emit("nextPrevNav", event, RIGHT_ARROW);
            } 
				else {
					this.$emit("nextPrevNav", event);
            }
			} 
			else {
				this.$emit("checkAnswer", event);
			}
		},

		onKeyDown(event) {
			if (event.keyCode == TAB) {  
				event.preventDefault();
    		}
		},

		onClick(event) {
			this.$emit("updateByEntry", event);
		},
	}
}
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/crossword";
</style>