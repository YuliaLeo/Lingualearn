<template>
  <div class="main-content__crossword container">
    <div class="crossword">
      <h2 class="crossword__title title--h2 text_m">Кроссворд</h2>
      <div class="crossword__main">
        <div
          class="crossword__row"
          v-for="(row, rowIdx) in rowsCount"
          :key="rowIdx"
        >
          <cell
            v-for="(col, colIdx) in colsCount"
            :key="`${colIdx},${rowIdx}`"
            ref="cells"
            v-model="cells[rowIdx][colIdx]"
            :positions="positions[rowIdx][colIdx]"
            :orientation="getWordOrientation"
            :firstCellsOfWords="getFirstCellsOfWords"
            :x="colIdx + 1"
            :y="rowIdx + 1"
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
          :number="wordIdx + 1"
          :position="wordsArray[wordIdx].position - 1"
        >
        </definition>
      </div>
    </div>
  </div>
  <div class="loading" v-if="isLoading">Загрузка страницы</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Word from "@/types/Word";
import Point from "@/types/Point";
import Settings from "@/types/InteractSettings";

import axios from "axios";

import Cell from "@/components/Cell.vue";
import Definition from "@/components/Definition.vue";

export default defineComponent({
  components: {
    Cell,
    Definition,
  },

  data() {
    return {
      wordsCoords: [] as Array<Array<Point>>,
      wordsCount: 0 as number,
      wordsArray: [] as Array<Word>,
      rows: [] as Array<number>,
      cols: [] as Array<number>,
      rowsCount: 0 as number,
      colsCount: 0 as number,
      cells: [] as Array<Array<string | null>>,
		positions: [] as Array<Array<Array<number>>>,
      activePosition: 0 as number,
      firstCellsOfWords: [] as Array<Point>,
      isLoading: false as boolean,
    };
  },

  computed: {
    getWordOrientation(): string {
      return this.wordsArray[this.activePosition].orientation;
    },

    getFirstCellsOfWords(): Array<Point> {
      for (let i = 0; i < this.wordsCount; i++) {
        this.firstCellsOfWords.push(this.wordsCoords[i][0]);
      }
      return this.firstCellsOfWords;
    },
  },

  mounted() {
    this.fetchPosts();
  },

  methods: {
    initWordsCoords() {
      for (let i = 0; i < this.wordsCount; i++) {
        this.wordsCoords.push([] as Array<Point>);

        for (let j = 0; j < this.wordsArray[i].answer.length; j++) {
          let cellCoords: Point = {
				row:
              this.wordsArray[i].orientation === "across"
                ? this.wordsArray[i].row
                : this.wordsArray[i].row++,
            col:
              this.wordsArray[i].orientation === "across"
                ? this.wordsArray[i].col++
                : this.wordsArray[i].col,
          };
          this.wordsCoords[i].push(cellCoords);
        }
      }
    },

    getCrosswordSize() {
      for (let i = 0; i < this.wordsCount; i++) {
        for (let j = 0; j < this.wordsArray[i].answer.length; j++) {
          // две след строки можно подрефакторить без дублирования
          this.cols.push(this.wordsCoords[i][j].col);
          this.rows.push(this.wordsCoords[i][j].row);
        }
      }

      this.rowsCount = Math.max.apply(Math, this.rows);
      this.colsCount = Math.max.apply(Math, this.cols);
    },

    initCellsValues() {
      for (let i = 0; i < this.rowsCount; i++) {
        this.cells.push([] as Array<string | null>);

        for (let j = 0; j < this.colsCount; j++) {
          this.cells[i].push(null);
        }
      }
    },

    getPositionsOfWordsForCells() {
      for (let i = 0; i < this.rowsCount; i++) {
        this.positions.push([] as Array<Array<number>>);

        for (let j = 0; j < this.colsCount; j++) {
          this.positions[i].push([]);

          this.wordsCoords.forEach((word, wordIndex) => {
            word.forEach((coords) => {
              if (coords.row === i + 1 && coords.col === j + 1) {
                this.positions[i][j].push(wordIndex);
              }
            });
          });
        }
      }
    },

    // этот метод однозначно нуждается в юнит тестах, берем массив данных и генерим на их основе кроссворд,
    // много-много логики, которая покрывается тестами
    initCrossword() {
      // часть того что здесь представлена не является data, оно скорее computed свойства на основе data,
      // но такой рефакторинг может быть затруднителен

      this.initWordsCoords();

      this.getCrosswordSize();

      this.initCellsValues();

      this.getPositionsOfWordsForCells();
    },

    // выбор активной позиции слова при переходе по клавиатуре и проверка правильности ввода слов
    // вместо И в комментарии выше должно быть дробление на маленькие функции внутри след метода
    // более того, часть данных можно рассчитать заранее, на этапе генерации кроссворда, меньше нагружая рассчет внутри
    // этого метода
    selectActiveCell(newRow: number, newCol: number) {
      // переменные для всех клеточек и определений
      const allCells = Array.from(
        this.$refs.cells as HTMLCollection
      ) as HTMLFormElement[];
      const allDefinitions = Array.from(
        this.$refs.definitions as HTMLCollection
      ) as HTMLFormElement[];

      // ставим фокус на следующую/предыдущую ячейку
      let newCell = this.colsCount * newRow + newCol;
      allCells[newCell]?.focus();

      // выбираем, к каким номерам слов принадлежит выбранная клеточка
      // дублирование в след двух строках, корректнее выносить в отдельную функцию чтобы избежать
      let cellFirstWord = allCells[newCell]?.positions[0];
      let cellSecondWord = allCells[newCell]?.positions[1];

      // меняем активную позицию слова, только если находимся на клеточке, которая принадлежит только одному слову
      if (cellFirstWord && !cellSecondWord) {
        this.activePosition = Number(cellFirstWord);
      }

      // выбираем все буквы, принадлежащие активной в текущий момент позиции
      let currentValue = this.wordsCoords[this.activePosition]
        .map((coords) => {
          return this.cells[coords.row - 1][coords.col - 1];
        })
        .join("");

      // если длина текущего слова равна длине ответа на это слово, смотрим правильное ли оно
      if (
        currentValue.length ===
        this.wordsArray[this.activePosition].answer.length
      ) {
        if (
          currentValue.toLowerCase() ===
          this.wordsArray[this.activePosition].answer
        ) {
          // далее можно сделать много лучше, если у тебя будет без обращения к REFS,
          // правильнее иметь отдельные свойства в объекте cell, который ты передаешь в компонент Cell
          // который бы отвечал за все те булевские переменные, которые ты проверяешь,
          // interface Cell {
          //   x: number;
          //   y: number;
          //   isCorrect: boolean; // даст возможность как раз навесить нужный класс внутри template выше
          // }

          allCells.forEach((cell) => {
            // если ответ правильный выделяем буквы активного слова одним способом, иначе другим
            if (cell.positions.includes(this.activePosition)) {
              cell.$refs.cell.classList.remove("letter-incorrect");
              cell.$refs.cell.classList.add("letter-correct");
            }
          });
          allDefinitions.forEach((definition) => {
            if (definition.position === this.activePosition) {
              definition.$refs.definition.classList.add("definition-done");
            }
          });
        } else {
          // это почти полное дублирование ветки if выше, надо зарефактрить без повторения за счет отдельных маленьких функций
          allCells.forEach((cell) => {
            if (cell.positions.includes(this.activePosition)) {
              cell.$refs.cell.classList.remove("letter-correct");
              cell.$refs.cell.classList.add("letter-incorrect");
            }
          });
          allDefinitions.forEach((definition) => {
            if (definition.position === this.activePosition) {
              definition.$refs.definition.classList.remove("definition-done");
            }
          });
        }
      } else {
        // при несовпадении длины убираем выделение букв
        allCells.forEach((cell) => {
          if (cell.positions.includes(this.activePosition)) {
            cell.$refs.cell.classList.remove(
              "letter-correct",
              "letter-incorrect"
            );
          }
        });
        allDefinitions.forEach((definition) => {
          if (definition.position === this.activePosition) {
            definition.$refs.definition.classList.remove("definition-done");
          }
        });
      }
    },

    // выбор активных в текущий момент клеточек слова
    selectActiveCells(settings: Settings) {
      const allCells = Array.from(
        this.$refs.cells as HTMLCollection
      ) as HTMLFormElement[];

      // выбор активных клеточек при клике
      if (settings.mode === "click") {
        // идем по всем клеточкам
        allCells.forEach((cell) => {
          // сначала убираем у всех класс active, если они активны

          // аналогично комменту про interface Cell выше в функции selectActiveCell,
          // лучше дополнить интерфейс Cell с полем isActive: boolean
          cell.$refs.cell?.classList.remove("active-cell");

          // если мы кликнули на клеточку, которая относится к двум словам,
          // класс active должен прикрепиться к тем клеточкам слова, которые относятся ко второму слову
          if (settings.positions.length > 1) {
            if (cell.positions.includes(settings.positions[1])) {
              cell.$refs.cell.classList.add("active-cell");
              this.activePosition = Number(settings.positions[1]);
            }
          } else if (settings.positions.length === 1) {
            if (cell.positions.includes(settings.positions[0])) {
              cell.$refs.cell.classList.add("active-cell");
              this.activePosition = Number(settings.positions[0]);
            }
          }
        });
      } else {
        // выбор активных клеточек при переходе по клавиатуре
        allCells.forEach((cell) => {
          // сначала убираем у всех класс active, если они активны
          cell.$refs.cell?.classList.remove("active-cell");

          // выбираем активными клеточки, которые относятся к текущей активной позиции
          if (cell.positions.includes(this.activePosition)) {
            cell.$refs.cell.classList.add("active-cell");
          }
        });
      }
    },

    async fetchPosts() {
      try {
        this.isLoading = true;
        const response = await axios
          .get("http://localhost:5000/words")
          .then((response) => (this.wordsArray = response.data))
          .then(() => (this.wordsCount = this.wordsArray.length))
          .then(() => this.initCrossword());
      } catch (e) {
        alert(e);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/crossword";
</style>
