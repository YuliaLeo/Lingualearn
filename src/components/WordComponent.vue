<template>
	<div class="main-content__crossword container">
		<div class="crossword">
			<div class="crossword__main">
				<div class="crossword__row">
					<cell
						v-for="(letter, letterIdx) in lettersCount"
						:key="letterIdx"
					ref="cells"
					v-model="cells[letterIdx]"
					@prev="selectActiveCell(letterIdx - 1)"
					@next="selectActiveCell(letterIdx + 1)"
					>
					</cell>
				</div>
			</div>
			<div class="crossword__definitions">
				<definition :clue="crosswordWord.clue">
				</definition>
			</div>
		</div>
	</div>
</template>

<script>
import Cell from "@/components/Cell.vue";
import Definition from "@/components/Definition.vue";
import oneWord from "@/oneWord.json";

export default {
	components: {
		Cell, Definition
	},

	data() {
		const lettersCount = oneWord.words[0].answer.length;
		const cells = new Array(lettersCount).fill('');

		return {
      	cells,
			crosswordWord: oneWord.words[0],
			lettersCount: oneWord.words[0].answer.length,
		}
	},
	
	methods: {
    selectActiveCell(letterIdx) {
      if (this.cells.join('').length === this.lettersCount) {
			if (this.cells.join('').toLowerCase() === this.crosswordWord.answer) {
				this.$refs.cells.forEach((cell) => cell.$refs.cell.classList.add("letter-correct"));
			}
			else {
				this.$refs.cells.forEach((cell) => cell.$refs.cell.classList.add("letter-incorrect"))
			}
      } 
		else {
			this.$refs.cells.forEach((cell) => cell.$refs.cell.classList.remove("letter-correct", "letter-incorrect"));
      }

		this.$refs.cells[letterIdx]?.focus();
    },
	}, 

	mounted() {
	},
}
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/crossword";
</style>
