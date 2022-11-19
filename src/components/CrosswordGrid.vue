<template>
<div class="main-content__crossword container">
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
						@keydown="onKeyDown"
						v-if="isInArray(colIdx, rowIdx)"
					/>
					<span class="crossword__number">{{getWordNumber(colIdx, rowIdx)}}</span>
				</div>
			</div>
		</div>
		<div class="crossword__definitions">
			<div 
			v-for="(word, wordIdx) in wordsCount"
			:key="wordIdx"
			:class="['crossword__definition', `position-${wordIdx}`]">
				{{wordIdx + 1}}. {{wordsArray[wordIdx].clue}}
			</div>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			wordsArray: [],
			wordsCount: 0,
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

			 	for (let j = 0; j < this.wordsArray[i].answer.length; j++) {
					this.wordCoords[i].push(j);
					let coords = this.wordsArray[i].orientation === 'across' 
							?  `${this.wordsArray[i].startx++},${this.wordsArray[i].starty}` 
							: `${this.wordsArray[i].startx},${this.wordsArray[i].starty++}`;
					this.wordCoords[i][j] = coords;
          	}
			}

			for (let i = 0; i < this.wordsCount; i++) {
				for (let j = 0; j < this.wordsArray[i].answer.length; j++) {
           		this.cols.push(this.wordCoords[i][j].split(",")[0]);
            	this.rows.push(this.wordCoords[i][j].split(",")[1]);
          	}
        	}

        	this.rowsCount = Math.max.apply(Math, this.rows);
        	this.colsCount = Math.max.apply(Math, this.cols);
		}, 

		getStartCells() {
	      for (let i = 0; i < this.wordsCount; i++) {
				this.startWordCells.push(this.wordCoords[i][0]); 
	      }
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

		onKeyDown(event) {
			if (event.keyCode == 9) {  
				event.preventDefault();
    		}
		},

		onClick(event) {
			this.mode = "setting ui";
         //if (this.solvedToggle) this.solvedToggle = false;

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
          	let firstOrientation = this.wordsArray[classes[0].split("-")[1]].orientation;
			 	let secondOrientation = this.wordsArray[classes[1].split("-")[1]].orientation;

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

			valToCheck = this.wordsArray[this.activePosition].answer.toLowerCase();

			document.querySelectorAll(".position-" + this.activePosition + " input").forEach(el => {
				currVal.push(el.value.toLowerCase());
			});

			currVal = currVal.join('');

			if (valToCheck === currVal) {
				document.querySelectorAll(".activeCell").forEach(el => {
					el.classList.add("done");
					el.classList.remove("activeCell");
				//	el.disabled = true;
				});

				document.querySelector(".crossword__definition.position-" + this.activePosition).classList.add("definition-done");

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

			this.currentOrientation = this.wordsArray[this.activePosition].orientation;

			//document.querySelector(".current")?.classList?.remove("current");
		}, 

		async fetchPosts() {
			try {
				//this.isPostLoading = true;
				const response = await axios.get("http://localhost:5000/words")
					.then(response => (this.wordsArray = response.data))
					.then(() => (this.wordsCount = this.wordsArray.length))
					.then(() => (this.initCrossword()));
			}
			catch (e) {
				alert(e);
			}
			finally {
				//this.isPostLoading = false;
			}
		},
	}, 

	mounted() {
		this.fetchPosts();
	}, 
}
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/crossword";
</style>
