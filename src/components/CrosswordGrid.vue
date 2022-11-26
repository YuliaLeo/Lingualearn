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
					:position="wordsArray[wordIdx].position - 1"
				>
				</definition>
			</div>
		</div>
	</div>
	<div class="loading" v-if="isLoading">
		Загрузка страницы
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Word from '@/types/Word';
import Settings from '@/types/InteractSettings';

import axios from 'axios';

import Cell from "@/components/Cell.vue";
import Definition from "@/components/Definition.vue";

export default defineComponent({
	components: {
		Cell, Definition
	},

	data() {
		return {
			wordsCoords: [] as Array<Array<string>>, // массив координат слов
			wordsCount: 0 as number, // кол-во слов
			wordsArray: [] as Array<Word>, // массив со словами и их характеристиками
			rows: [] as Array<number>, // номера всех имеющихся строк
			cols: [] as Array<number>, // номера всех имеющихся столбцов
			rowsCount: 0 as number, // максимальное кол-во строк
			colsCount: 0 as number, // максимальное кол-во столбцов
			cells: [] as Array<Array<string>>, // массив значений в клетоках кроссворда
			activePosition: 0 as number, // текущая позиция вводимого слова
			startWordCells: [] as Array<string>, // массив координат первых клеточек всех слов
			isLoading: false as boolean, // индикатор загрузки
		}
	}, 
	
	methods: {
		// подсчет размеров кроссворда и заполнение клеточек пустыми значениями
		calculateCrosswordSize() {
			// записываем координаты имеющихся слов в двумерный массив, первый цикл по словам, второй по буквам
			for (let i = 0; i < this.wordsCount; i++) {
				if (Array.isArray(this.wordsCoords)) {
					this.wordsCoords.push([] as Array<string>);

					for (let j = 0; j < this.wordsArray[i].answer.length; j++) {
						let coords = this.wordsArray[i].orientation === 'across' 
								?  `${this.wordsArray[i].startx++},${this.wordsArray[i].starty}` 
								: `${this.wordsArray[i].startx},${this.wordsArray[i].starty++}`;
						this.wordsCoords[i].push(coords);
					}
				}
			}

			// записываем в массивы значения строк и колонок
			for (let i = 0; i < this.wordsCount; i++) {
				for (let j = 0; j < this.wordsArray[i].answer.length; j++) {
           		this.cols.push(Number(this.wordsCoords[i][j].split(",")[0]));
            	this.rows.push(Number(this.wordsCoords[i][j].split(",")[1]));
          	}
        	}

			// выбираем наибольшие, чтобы определить размер кроссворда
        	this.rowsCount = Math.max.apply(Math, this.rows);
        	this.colsCount = Math.max.apply(Math, this.cols);
			
			// заполняем все клеточки пустыми значениями
			if (Array.isArray(this.cells)) {
				for (let i = 0; i < this.rowsCount; i++) {
					this.cells.push([] as Array<string> );

					for (let j = 0; j < this.colsCount; j++) {
						this.cells[i].push('');
					}
				}
			}
		}, 

		// получение номеров позиций слов для клеточек
		getPositionNumbers(col: number, row: number) {
			let positions: Array<string> = [];
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

		// выбор активной позиции слова при переходе по клавиатуре и проверка правильности ввода слов
		selectActiveCell(newRow: number, newCol: number) {
			// переменные для всех клеточек и определений
			const allCells = Array.from(this.$refs.cells as HTMLCollection) as HTMLFormElement[];
			const allDefinitions = Array.from(this.$refs.definitions as HTMLCollection) as HTMLFormElement[];

			// общее число колонок кроссворда
			let colsTotal = this.colsCount;

			// ставим фокус на следующую/предыдущую ячейку
			let newCell = colsTotal*newRow + newCol;
			allCells[newCell]?.focus();

			// выбираем, к каким номерам слов принадлежит выбранная клеточка
			let cellFirstWord = allCells[newCell]?.positions[0]?.split("-")[1];
			let cellSecondWord = allCells[newCell]?.positions[1]?.split("-")[1];
			
			// меняем активную позицию слова, только если находимся на клеточке, которая принадлежит только одному слову
			if (cellFirstWord && !cellSecondWord) {
				this.activePosition = Number(cellFirstWord);
			}

			// выбираем все буквы, принадлежащие активной в текущий момент позиции
			let currentValue = this.wordsCoords[this.activePosition].map(coords => {
				return this.cells[Number(coords.split(",")[1]) - 1][Number(coords.split(",")[0]) - 1];
			}).join('');

			// если длина текущего слова равна длине ответа на это слово, смотрим правильное ли оно
			if (currentValue.length === this.wordsArray[this.activePosition].answer.length) {
				if (currentValue.toLowerCase() === this.wordsArray[this.activePosition].answer) {
					allCells.forEach(cell => {
						// если ответ правильный выделяем буквы активного слова одним способом, иначе другим
						if (cell.positions.includes("position-" + this.activePosition)){
							cell.$refs.cell.classList.remove("letter-incorrect");
							cell.$refs.cell.classList.add("letter-correct");
						}
					});
					allDefinitions.forEach(definition => {
						if (definition.position === this.activePosition) {
							definition.$refs.definition.classList.add("definition-done");
						}
					});
				}
				else {
					allCells.forEach(cell => {
						if (cell.positions.includes("position-" + this.activePosition)) {
							cell.$refs.cell.classList.remove("letter-correct");
							cell.$refs.cell.classList.add("letter-incorrect");
						}
					});
					allDefinitions.forEach(definition => {
						if (definition.position === this.activePosition) {
							definition.$refs.definition.classList.remove("definition-done");
						}
					});
				}
			} 
			else { // при несовпадении длины убираем выделение букв
				allCells.forEach(cell => {
					if (cell.positions.includes("position-" + this.activePosition)) {
						cell.$refs.cell.classList.remove("letter-correct", "letter-incorrect");
					}
				});
				allDefinitions.forEach(definition => {
					if (definition.position === this.activePosition) {
						definition.$refs.definition.classList.remove("definition-done");
					}
				});
			}
   	},

		// выбор активных в текущий момент клеточек слова
		selectActiveCells(settings: Settings) {
			const allCells = Array.from(this.$refs.cells as HTMLCollection) as HTMLFormElement[];

			// выбор активных клеточек при клике
			if (settings.mode === "click") {
				// идем по всем клеточкам
				allCells.forEach(cell => {
					// сначала убираем у всех класс active, если они активны
					cell.$refs.cell?.classList.remove("active-cell");

					// если мы кликнули на клеточку, которая относится к двум словам,
					// класс active должен прикрепиться к тем клеточкам слова, которые относятся ко второму слову
					if (settings.positions.length > 1) {
						if (cell.positions.includes(settings.positions[1])) {
							cell.$refs.cell.classList.add("active-cell");
							this.activePosition = Number(settings.positions[1].split("-")[1]);
						}
					} else if (settings.positions.length === 1) {
						if (cell.positions.includes(settings.positions[0])) {
							cell.$refs.cell.classList.add("active-cell");
							this.activePosition = Number(settings.positions[0].split("-")[1]);
						}
					}
				});
			} 
			else { // выбор активных клеточек при переходе по клавиатуре
				allCells.forEach(cell => {
					// сначала убираем у всех класс active, если они активны
					cell.$refs.cell?.classList.remove("active-cell");

					// выбираем активными клеточки, которые относятся к текущей активной позиции
					if (cell.positions.includes("position-" + this.activePosition)) {
						cell.$refs.cell.classList.add("active-cell");
					}
				});
			}
		},
		
		// получение слов с сервера
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

	computed: {
		// высчитывание текущей ориентации слова
		getOrientation(): string  {
			return this.wordsArray[this.activePosition].orientation;
		},

		// выбор координат первых клеточек слов
		getStartCells(): Array<string>  {
	      for (let i = 0; i < this.wordsCount; i++) {
				this.startWordCells.push(this.wordsCoords[i][0]); 
	      }
			return this.startWordCells;
      },
	}, 

	mounted() {
		this.fetchPosts();
	}, 
});
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/crossword";
</style>
