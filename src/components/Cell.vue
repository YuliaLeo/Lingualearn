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
			<span class="crossword__number">{{checkFirstCell(x, y)}}</span>
		</div>
	</div>
</template>

<script>
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const BACKSPACE = 8;
const DELETE = 46;

export default {
  props: {
		wordsCoords: {type: Array, required: true},
		modelValue: {type: String},
		positions: {type: Array},
		orientation: {type: String},
		startCells: {type: Array},
		x: {type: Number},
		y: {type: Number},
  },

  emits: [
  		'update:modelValue',
		'nextHorizontal',
		'prevHorizontal',
		'prevVertical', 
		'nextVertical',
		'cellActive'
  ],

	methods: {
		focus() {
			this.$refs.cell?.focus();
		},

		handleInput(event) {
			const char = String.fromCharCode(event.keyCode);
			const isLetter = (/^[A-Za-z]+$/.test(char));

			if (isLetter) {
				this.$emit('update:modelValue', event.key);
				if (this.orientation === "across") this.$emit("nextHorizontal");
				else this.$emit("nextVertical");
			} else {
				switch (event.keyCode) {
					case BACKSPACE:
					case DELETE:
						this.$emit('update:modelValue', '');
						if (this.orientation === "across") this.$emit("prevHorizontal");
						else this.$emit("prevVertical");
						break;
					case LEFT_ARROW:
						this.$emit("prevHorizontal");
						break;
					case UP_ARROW:
						this.$emit("prevVertical");
						break;
					case RIGHT_ARROW:
						this.$emit("nextHorizontal");
						break;
					case DOWN_ARROW:
						this.$emit("nextVertical");
						break;
					default:
				}
				
				let positions = this.positions;
				this.$emit("cellActive", {positions});
			}

			return event.preventDefault();
		},

		handleClick(event) {
			let positions = this.positions;
			let mode = "click";
			this.$emit("cellActive", {positions, mode});
		},

		checkFirstCell(cols, rows){
			let wordNumber;

			this.startCells.forEach((el, index) => {
				if (el === `${cols},${rows}`){
					wordNumber = index + 1;
				}
			});

			return wordNumber;
		},
	},
}
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/crossword";
</style>