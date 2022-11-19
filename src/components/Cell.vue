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
export default {
	methods: {
		onKeyUp(event) {
         if (event.keyCode === 9) {
            return false;
         } 
			else if (
            event.keyCode === 37 ||
            event.keyCode === 39 ||
            event.keyCode === 8 || 
            event.keyCode === 46
			) {
            if (event.keyCode === 8 || event.keyCode === 46) {
					 this.$emit("nextPrevNav", event, 37);
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
			if (event.keyCode == 9) {  
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