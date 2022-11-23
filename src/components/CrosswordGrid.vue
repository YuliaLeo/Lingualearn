<template>
	<div class="main-content__crossword container">
		<div class="crossword">
			<h2 class="crossword__title title--h2 text_m">Кроссворд</h2>
			<div class="crossword__main">
				<div 
					class="crossword__row"
					v-for="(row, rowIdx) in rowsCount"
					:key="rowIdx">
						<cell
							v-for="(col, colIdx) in colsCount"
							:key="`${colIdx},${rowIdx}`"
							:wordsCoords="wordsCoords"
							ref="cells"
							v-model="cells[rowIdx][colIdx]"
							:positions="getPositionNumbers(colIdx + 1, rowIdx + 1)"
							:orientation="getOrientation"
							:startCells="getStartCells"
							:x="colIdx+1"
							:y="rowIdx+1"
							@cellActive="selectActiveCells"
							@prevHorizontal="selectActiveCell(rowIdx, colIdx - 1)"
							@nextHorizontal="selectActiveCell(rowIdx, colIdx + 1)"
							@prevVertical="selectActiveCell(rowIdx - 1, colIdx)"
							@nextVertical="selectActiveCell(rowIdx + 1, colIdx)"
						>
						</cell>
				</div>
			</div>
			<div class="crossword__definitions">
				<definition 
					v-for="(word, wordIdx) in wordsCount"
					:key="wordIdx"
					ref="definitions"
					:clue="wordsArray[wordIdx].clue"
					:number="wordIdx+1"
					:position="wordsArray[wordIdx].position-1"
				>
				</definition>
			</div>
		</div>
	</div>
	<div class="loading" v-if="isLoading">
		Загрузка страницы
	</div>
</template>

<script>
import axios from 'axios';
import Cell from "@/components/Cell.vue";
import Definition from "@/components/Definition.vue";

export default {
	components: {
		Cell, Definition
	},

	data() {
		return {
			wordsCoords: [],
			wordsCount: 0,
			wordsArray: [],
			rows: [],
			cols: [],
			rowsCount: 0, 
			colsCount: 0,
			cells: [],
			activePosition: 0,
			startWordCells: [],
			isLoading: false,
		}
	}, 
	
	methods: {
		calculateCrosswordSize() {
			// записываем координаты имеющихся слов в двумерный массив, первый цикл по словам, второй по буквам
			for (let i = 0; i < this.wordsCount; i++) {
          	this.wordsCoords.push(i);
			 	this.wordsCoords[i] = [];

			 	for (let j = 0; j < this.wordsArray[i].answer.length; j++) {
					this.wordsCoords[i].push(j);
					let coords = this.wordsArray[i].orientation === 'across' 
							?  `${this.wordsArray[i].startx++},${this.wordsArray[i].starty}` 
							: `${this.wordsArray[i].startx},${this.wordsArray[i].starty++}`;
					this.wordsCoords[i][j] = coords;
          	}
			}

			// записываем в массивы значения строк и колонок
			for (let i = 0; i < this.wordsCount; i++) {
				for (let j = 0; j < this.wordsArray[i].answer.length; j++) {
           		this.cols.push(this.wordsCoords[i][j].split(",")[0]);
            	this.rows.push(this.wordsCoords[i][j].split(",")[1]);
          	}
        	}

			// выбираем наибольшие, чтобы определить размер кроссворда
        	this.rowsCount = Math.max.apply(Math, this.rows);
        	this.colsCount = Math.max.apply(Math, this.cols);
			
			// заполняем все клеточки пустыми значениями
			for (let i = 0; i < this.rowsCount; i++) {
				this.cells.push(i);
				this.cells[i] = [];

				for (let j = 0; j < this.colsCount; j++) {
					this.cells[i].push(j);
					this.cells[i][j] = "";
				}
			}
		}, 

		getPositionNumbers(col, row) {
			let positions = [];
			// проходим по массиву с координатами слов и смотрим находится ли переданные в функцию координаты 
			// в этом массиве, если да, то заполняем массив позиций
			// В массиве позиций для каждой координаты определяется, к какому слову она принадлежит (может принадлежать ко 2 сразу)
			this.wordsCoords.forEach((array, index) => {
				array.forEach(coord => {
					if (coord === `${col},${row}`) {
						positions.push("position-" + index);
					}
				});
			});

			return positions;
		},

		selectActiveCell(newRow, newCol) {
			let colsTotal = this.colsCount;
			// ставим фокус на следующую/предыдущую ячейку
			let newCell = colsTotal*newRow + newCol;
			this.$refs.cells[newCell]?.focus();

			// выбираем, к каким номерам слов принадлежит выбранная клеточка
			let cellFirstWord = this.$refs.cells[newCell]?.positions[0]?.split("-")[1];
			let cellSecondWord = this.$refs.cells[newCell]?.positions[1]?.split("-")[1];
			
			// меняем активную позицию слова, только если находимся на клеточке, которая принадлежит только одному слову
			if (cellFirstWord && !cellSecondWord) {
				this.activePosition = cellFirstWord;
			}

			// выбираем все буквы, принадлежащие активной в текущий момент позиции
			let currentValue = this.wordsCoords[this.activePosition].map(coords => {
				return this.cells[coords.split(",")[1] - 1][coords.split(",")[0] - 1];
			}).join('');

			// если длина текущего слова равна длине ответа на это слово, смотрим правильное ли оно
			if (currentValue.length === this.wordsArray[this.activePosition].answer.length) {
					if (currentValue.toLowerCase() === this.wordsArray[this.activePosition].answer) {
						this.$refs.cells.forEach((cell) => {
							// если ответ правильный выделяем буквы активного слова одним способом, иначе другим
							if (cell.positions.includes("position-" + this.activePosition)){
								cell.$refs.cell.classList.remove("letter-incorrect");
								cell.$refs.cell.classList.add("letter-correct");
							}
						});
						this.$refs.definitions.forEach(definition => {
							if (definition.position === Number(this.activePosition)) {
								definition.$refs.definition.classList.add("definition-done");
							}
						});
					}
					else {
						this.$refs.cells.forEach((cell) => {
							if (cell.positions.includes("position-" + this.activePosition)) {
								cell.$refs.cell.classList.remove("letter-correct");
								cell.$refs.cell.classList.add("letter-incorrect");
							}
						});
						this.$refs.definitions.forEach(definition => {
							if (definition.position === Number(this.activePosition)) {
								definition.$refs.definition.classList.remove("definition-done");
							}
						});
					}
			} 
			else { // при несовпадении длины убираем выделение букв
				this.$refs.cells.forEach((cell) => {
					if (cell.positions.includes("position-" + this.activePosition)) {
						cell.$refs.cell.classList.remove("letter-correct", "letter-incorrect");
					}
				});
				this.$refs.definitions.forEach(definition => {
					if (definition.position === Number(this.activePosition)) {
						definition.$refs.definition.classList.remove("definition-done");
					}
				});
			}
   	},

		selectActiveCells(settings) {
			// выбор активных клеточек при клике
			if (settings.mode === "click") {
				// идем по всем клеточкам
				this.$refs.cells.forEach(cell => {
					// сначала убираем у всех класс active, если они активны
					cell.$refs.cell?.classList.remove("active-cell");

					// если мы кликнули на клеточку, которая относится к двум словам,
					// класс active должен прикрепиться к тем клеточкам слова, которые относятся ко второму слову
					if (settings.positions.length > 1) {
						if (cell.positions.includes(settings.positions[1])) {
							cell.$refs.cell.classList.add("active-cell");
							this.activePosition = settings.positions[1].split("-")[1];
						}
					} else if (settings.positions.length === 1) {
						if (cell.positions.includes(settings.positions[0])) {
							cell.$refs.cell.classList.add("active-cell");
							this.activePosition = settings.positions[0].split("-")[1];
						}
					}
				});
			} 
			else { // выбор активных клеточек при переходе по клавиатуре
				this.$refs.cells.forEach(cell => {
					// сначала убираем у всех класс active, если они активны
					cell.$refs.cell?.classList.remove("active-cell");

					// выбираем активными клеточки, которые относятся к текущей активной позиции
					if (cell.positions.includes("position-" + this.activePosition)) {
						cell.$refs.cell.classList.add("active-cell");
					}
				});
			}
		},

		async fetchPosts() {
			try {
				this.isLoading = true;
				const response = await axios.get("http://localhost:5000/words")
					.then(response => (this.wordsArray = response.data))
					.then(() => (this.wordsCount = this.wordsArray.length))
					.then(() => (this.calculateCrosswordSize()));
			}
			catch (e) {
				alert(e);
			}
			finally {
				this.isLoading = false;
			}
		},
	}, 

	mounted() {
		this.fetchPosts();
	}, 

	computed: {
		getOrientation() {
			return this.wordsArray[this.activePosition].orientation;
		},
		getStartCells() {
	      for (let i = 0; i < this.wordsCount; i++) {
				this.startWordCells.push(this.wordsCoords[i][0]); 
	      }
			return this.startWordCells;
      },
	}
}
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/crossword";
</style>
