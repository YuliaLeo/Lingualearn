<template>
	<div class="crossword">
		<h2 class="crossword__title title--h2 text_m">Кроссворд</h2>
		<div class="crossword__main">
			<div 
				class="crossword__row"
				v-for="(row, rowIdx) in rowsCount"
				:key="rowIdx">
				<div 
					v-for="(col, colIdx) in colsCount" 
					:class="['crossword__ceil', getCellClasses(colIdx, rowIdx)]"
					:key="`${colIdx},${rowIdx}`"
					>
					<input
						autocomplete="off"
						type="text"
						maxlength="1"
						class="crossword__input text-bold_medium"
						@keyup="onKeyUp"
						@click="onClick"
						v-if="isInArray(colIdx, rowIdx)"
					/>
					<span class="crossword__number">{{getWordNumber(colIdx, rowIdx)}}</span>
				</div>
			</div>
		</div>

		<div class="crossword__definitions">
					<div class="crossword__definition definition-done">1. Нож</div>
					<div class="crossword__definition">2. Салфетка</div>
					<div class="crossword__definition">3. Вилка</div>
					<div class="crossword__definition">4. Миска</div>
					<div class="crossword__definition">5. Ложка</div>
					<div class="crossword__definition">6. Тарелка</div>
					<div class="crossword__definition">7. Чай</div>
		</div>

	</div>
</template>

<script>
import words from "@/words.json";
words = words.words;

export default {
	data() {
		return {
			wordsCount: words.length,
			wordCoords: [],
			rows: [],
			cols: [],
			rowsCount: 0, 
			colsCount: 0,
			startWordCells: [],
			currentOrientation: "across",
			activePosition: 0,
			solved: [],
			solvedToggle: false,
			mode: "interacting",
		}
	}, 
	
	methods: {
		initCrossword() {
			this.calculateCrosswordSize();
			this.getStartCells();
		},

		calculateCrosswordSize() {
			for (let i = 0; i < this.wordsCount; i++) {
          	this.wordCoords.push(i);
			 	this.wordCoords[i] = [];

			 	for (let j = 0; j < words[i].answer.length; j++) {
					this.wordCoords[i].push(j);
					let coords = words[i].orientation === 'across' 
							?  `${words[i].startx++},${words[i].starty}` 
							: `${words[i].startx},${words[i].starty++}`;
					this.wordCoords[i][j] = coords;
          	}
			}

			for (let i = 0; i < this.wordsCount; i++) {
				for (let j = 0; j < words[i].answer.length; j++) {
           		this.cols.push(this.wordCoords[i][j].split(",")[0]);
            	this.rows.push(this.wordCoords[i][j].split(",")[1]);
          	}
        	}

        	this.rowsCount = Math.max.apply(Math, this.rows);
        	this.colsCount = Math.max.apply(Math, this.cols);
		}, 

		getCellClasses(cols, rows) {
			const classes = [];

			this.wordCoords.forEach((coordsArray, index) => {
				coordsArray.forEach(coords => {
					if (coords === `${cols + 1},${rows + 1}`) {
						classes.push(`position-${index}`);
					}
				})
			});

			return classes;
		},

		getStartCells() {
	      for (let i = 0; i < this.wordsCount; i++) {
				this.startWordCells.push(this.wordCoords[i][0]); 
	      }
      },

		getWordNumber(cols, rows){
			let wordNumber;

			this.startWordCells.forEach((cellCoords, index) => {
				if (cellCoords === `${cols + 1},${rows + 1}`){
					wordNumber = index + 1;
				}
			});

			return wordNumber;
		},

		isInArray(cols, rows) {
			let flag;

			this.wordCoords.forEach((coordsArray, index) => {
				coordsArray.forEach(coords => {
					if (coords === `${cols + 1},${rows + 1}`) {
						flag = true;
					}
				})
			});

			return flag;
		},

		onKeyUp(event) {
			this.mode = "interacting"

			switch (event.which) {
            case 39: 
            case 37:
              this.currentOrientation = "across";
              break;
            case 38:
            case 40:
					this.currentOrientation = "down";
              break;
            default:
              break;
         }

         if (event.keyCode === 9) {
            return false;
         } 
			else if (
            event.keyCode === 37 ||
            event.keyCode === 38 ||
            event.keyCode === 39 ||
            event.keyCode === 40 ||
            event.keyCode === 8 || 
            event.keyCode === 46
			) {
            if (event.keyCode === 8 || event.keyCode === 46) {
					this.currentOrientation === "across"
                ? this.nextPrevNav(event, 37)
                : this.nextPrevNav(event, 38);
            } else {
					this.nextPrevNav(event);
            }
			} else {
				this.checkAnswer(event);
			}
		},

		onClick(event) {
			this.mode = "setting ui";
         if (this.solvedToggle) this.solvedToggle = false;

         this.updateByEntry(event);
		},

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

        	if (classes.length > 1) {
          	let firstOrientation = words[classes[0].split("-")[1]].orientation;
			 	let secondOrientation = words[classes[1].split("-")[1]].orientation;

				// для изменения направления, если кликнили на первый элемент в другом направлении
				let ifCellIsFirst = [...document.querySelectorAll(".position-" + classes[0].split("-")[1] + " input")].indexOf(cellInput);

				if (this.mode === "setting ui") {
					this.currentOrientation = ifCellIsFirst === 0 ? firstOrientation : secondOrientation;
				}
			 	
				if (firstOrientation === this.currentOrientation) {
					this.activePosition = classes[0].split("-")[1];
				} 
				else if (secondOrientation === this.currentOrientation) {
					this.activePosition = classes[1].split("-")[1];
				}
			} 
			else {
				this.activePosition = classes[0].split("-")[1];
			}
      },

		checkAnswer(event) {
			let valToCheck, currVal = [];

			this.getActivePosition(event.target);

			valToCheck = words[this.activePosition].answer.toLowerCase();

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

				this.solved.push(valToCheck);
				this.solvedToggle = true;
				return;
			}

			this.currentOrientation === "across" ? this.nextPrevNav(event, 39) : this.nextPrevNav(event, 40);
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

        	let selector = ".position-" + this.activePosition + " input";
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

				case 40:
					currentInput = parentInputElement?.parentElement?.nextElementSibling?.querySelector(selector);
					currentInput?.classList?.add("current")
					currentInput?.focus()
				break;

				case 38:
					currentInput = parentInputElement?.parentElement?.previousElementSibling?.querySelector(selector);
					currentInput?.classList?.add("current")
					currentInput?.focus()
				default:
					break;
        }
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

			this.currentOrientation = words[this.activePosition].orientation;

			//document.querySelector(".current")?.classList?.remove("current");
		}, 
	}, 

	mounted() {
		this.initCrossword();
	}, 
}
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/crossword";
</style>
