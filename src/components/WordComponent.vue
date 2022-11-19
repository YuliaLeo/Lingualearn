<template>
	<div class="main-content__crossword container">
		<div class="crossword">
			<div class="crossword__main">
				<div class="crossword__row">
					<cell
						v-for="(letter, letterIdx) in lettersCount"
						:key="letterIdx"
						@nextPrevNav="nextPrevNav"
						@checkAnswer="checkAnswer"
						@updateByEntry="updateByEntry"
						:class="['position-'+0]">
					</cell>
				</div>
			</div>
			<div class="crossword__definitions">
				<definition :clue="crosswordWord.clue"
					:class="['position-'+0]">
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
		return {
			wordsArray: oneWord.words,
			lettersCount: oneWord.words[0].answer.length,
			crosswordWord: oneWord.words[0],
			activePosition: 0,
		}
	},
	
	methods: {
		getClasses(cell, classType) {
			let classes = [],
      	positions = [];

			cell.classList.forEach(cellClass => classes.push(cellClass));

        	for (let i = 0; i < classes.length; i++) {
          	if (!classes[i].indexOf(classType)) {
            	positions.push(classes[i]);
          	}
        	}

        return positions;
      },
		
		getActivePosition(cellInput) {
			let classes = this.getClasses(cellInput.parentElement, "position");
			this.activePosition = classes[0].split("-")[1];
      },

		nextPrevNav(event, newKeyCode) {
     		let keyCode = newKeyCode ? newKeyCode : event.which;
			let parentInputElement = event.target.parentElement;

			this.getActivePosition(event.target);
        	
			let actives = document.querySelectorAll(".activeCell");
  
			actives.forEach(el => {
				 el.classList.remove("activeCell");
			});
			  
			actives = document.querySelectorAll(".position-" + this.activePosition + " input");
			
			actives.forEach(el => {
				el.classList.add("activeCell");
			});

			document.querySelector(".current")?.classList?.remove("current");

			let currentInput;

			switch (keyCode) {
         	case 39:
					currentInput = parentInputElement.nextElementSibling?.querySelector("input");
					currentInput?.classList?.add("current");
					currentInput?.focus();
					break;

          	case 37:
					currentInput = parentInputElement.previousElementSibling?.querySelector("input");
					currentInput?.classList?.add("current")
					currentInput?.focus()
					break;
					
				default:
					break;
        	}
		},

		checkAnswer(event) {
			let valToCheck, currVal = [];

			this.getActivePosition(event.target);

			valToCheck = this.wordsArray[this.activePosition].answer.toLowerCase();

			document.querySelectorAll(".position-" + this.activePosition + " input").forEach(el => {
				currVal.push(el.value.toLowerCase());
			});

			currVal = currVal.join('');

			if (valToCheck === currVal) {
				document.querySelectorAll(".activeCell").forEach(el => {
					el.classList.add("done");
					el.classList.remove("activeCell");
					el.disabled = true;
				});

				document.querySelector(".crossword__definition.position-" + this.activePosition).classList.add("definition-done");
				return;
			}

			this.nextPrevNav(event, 39);
		}, 

		updateByEntry(event) {
			this.getActivePosition(event.target);

			let actives = document.querySelectorAll(".activeCell");
			actives.forEach(el => {
				el.classList.remove("activeCell");
			});
			
			actives = document.querySelectorAll(".position-" + this.activePosition + " input");

			actives.forEach(el => {
				el.classList.add("activeCell");
			});
		},
	}, 

	mounted() {
	},
}
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/crossword";
</style>
