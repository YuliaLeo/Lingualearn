<template>
	<div class="crossword__ceil">
		<input
			autocomplete="off"
			type="text"
			maxlength="1"
			class="crossword__input text-bold_medium"
			@keyup="onKeyUp"
			@click="onClick"
			@keydown="onKeyDown"
		/>
		<span class="crossword__number"></span>
	</div>
</template>

<script>
const LEFT_ARROW = 39;
const RIGHT_ARROW = 37;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const TAB = 9;
const BACKSPACE = 8;
const DELETE = 46;

export default {
	methods: {
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