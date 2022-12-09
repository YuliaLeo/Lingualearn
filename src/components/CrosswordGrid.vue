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
          <cell-item
            v-for="(col, colIdx) in colsCount"
            :key="`${colIdx},${rowIdx}`"
            ref="cells"
            v-model="cellsValues[rowIdx][colIdx]"
            :positions="positions[rowIdx][colIdx]"
            :cell="cellsProperties[rowIdx][colIdx]"
            :orientation="getWordOrientation"
            :firstCellsOfWords="getFirstCellsOfWords"
            @cellActive="selectActiveCells"
            @prevHorizontal="selectNewCell(rowIdx, colIdx - 1)"
            @nextHorizontal="selectNewCell(rowIdx, colIdx + 1)"
            @prevVertical="selectNewCell(rowIdx - 1, colIdx)"
            @nextVertical="selectNewCell(rowIdx + 1, colIdx)"
          >
          </cell-item>
        </div>
      </div>
      <div class="crossword__definitions">
        <definition-item
          v-for="(word, wordIdx) in wordsCount"
          :key="wordIdx"
          ref="definitions"
          :definition="definitionProperties[wordIdx]"
        >
        </definition-item>
      </div>
    </div>
  </div>
  <loading
    :isLoading="isLoading"
    :hasLoadingError="hasLoadingError"
    :currentTime="currentTime"
  ></loading>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Word from "@/types/Word";
import Settings from "@/types/InteractSettings";
import Point from "@/types/Point";
import Cell from "@/types/Cell";
import Definition from "@/types/Definition";

import CellItem from "@/components/CellItem.vue";
import DefinitionItem from "@/components/DefinitionItem.vue";
import Loading from "@/components/Loading.vue";

export default defineComponent({
  components: {
    CellItem,
    DefinitionItem,
    Loading,
  },

  data() {
    return {
      wordsCoords: [] as Array<Array<Point>>,
      wordsCount: 0 as number,
      wordsProperties: [] as Array<Word>,
      rows: [] as Array<number>,
      cols: [] as Array<number>,
      rowsCount: 0 as number,
      colsCount: 0 as number,
      cellsProperties: [] as Array<Array<Cell>>,
      cellsValues: [] as Array<Array<string | null>>,
      positions: [] as Array<Array<Array<number>>>,
      activePosition: 0 as number,
      firstCellsOfWords: [] as Array<Point>,
      allCells: [] as Array<HTMLFormElement>,
      allDefinitions: [] as Array<HTMLFormElement>,
      currentValue: "" as string,
      newCellNumber: 0 as number,
      definitionProperties: [] as Array<Definition>,
      isLoading: false as boolean,
      hasLoadingError: false as boolean,
      currentTime: 5 as number,
      timer: undefined as number | undefined,
    };
  },

  computed: {
    getWordOrientation(): string {
      return this.wordsProperties[this.activePosition].orientation;
    },

    getFirstCellsOfWords(): Array<Point> {
      for (let i = 0; i < this.wordsCount; i++) {
        this.firstCellsOfWords.push(this.wordsCoords[i][0]);
      }
      return this.firstCellsOfWords;
    },
  },

  watch: {
    currentTime(time) {
      if (time === 0) {
        clearTimeout(this.timer);
        this.$router.push({ path: "/homepage" });
      }
    },
  },

  mounted() {
    this.fetchPosts();
  },

  methods: {
    async fetchPosts() {
      this.isLoading = true;
      fetch("/words.json")
        .then((response) => response.json())
        .then((response) => (this.wordsProperties = response.words))
        .then(() => this.initCrossword())
        .then(() => this.getAllCellsAndDefinitions())
        .then(() => (this.isLoading = false))
        .catch(() => {
          this.hasLoadingError = true;
          this.redirectTimer();
        });
    },

    redirectTimer() {
      this.timer = setInterval(() => {
        this.currentTime--;
      }, 1000);
    },

    // этот метод однозначно нуждается в юнит тестах, берем массив данных и генерим на их основе кроссворд,
    // много-много логики, которая покрывается тестами
    initCrossword() {
      // часть того что здесь представлена не является data, оно скорее computed свойства на основе data,
      // но такой рефакторинг может быть затруднителен
      this.wordsCount = this.wordsProperties.length;

      this.initWordsCoords();

      this.getCrosswordSize();

      this.initCellsValues();

      this.initCellsProperties();

      this.getPositionsOfWordsForCells();

      this.initDefinitionProperties();
    },

    getAllCellsAndDefinitions() {
      this.allCells = Array.from(
        this.$refs.cells as HTMLCollection
      ) as HTMLFormElement[];

      this.allDefinitions = Array.from(
        this.$refs.definitions as HTMLCollection
      ) as HTMLFormElement[];
    },

    initWordsCoords() {
      for (let i = 0; i < this.wordsCount; i++) {
        this.wordsCoords.push([] as Array<Point>);

        for (let j = 0; j < this.wordsProperties[i].answer.length; j++) {
          let cellCoords: Point = {
            row:
              this.wordsProperties[i].orientation === "across"
                ? this.wordsProperties[i].rowStart
                : this.wordsProperties[i].rowStart++,
            col:
              this.wordsProperties[i].orientation === "across"
                ? this.wordsProperties[i].colStart++
                : this.wordsProperties[i].colStart,
          };

          this.wordsCoords[i].push(cellCoords);
        }
      }
    },

    getCrosswordSize() {
      for (let i = 0; i < this.wordsCount; i++) {
        for (let j = 0; j < this.wordsProperties[i].answer.length; j++) {
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
        this.cellsValues.push([] as Array<string | null>);

        for (let j = 0; j < this.colsCount; j++) {
          this.cellsValues[i].push(null);
        }
      }
    },

    initCellsProperties() {
      for (let i = 0; i < this.rowsCount; i++) {
        this.cellsProperties.push([] as Array<Cell>);

        for (let j = 0; j < this.colsCount; j++) {
          this.cellsProperties[i].push({
            row: i + 1,
            col: j + 1,
            isCorrect: false,
            isIncorrect: false,
            isActive: false,
          });
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

    initDefinitionProperties() {
      for (let i = 0; i < this.wordsCount; i++) {
        this.definitionProperties.push({
          clue: this.wordsProperties[i].clue,
          number: this.wordsProperties[i].position,
          isDone: false,
        });
      }
    },

    // более того, часть данных можно рассчитать заранее, на этапе генерации кроссворда, меньше нагружая рассчет внутри
    // этого метода
    selectNewCell(newRow: number, newCol: number) {
      this.focusOnActiveCell(newRow, newCol);

      this.checkCellIntersection();

      this.getCurrentWordValue();

      this.checkWordValue();
    },

    focusOnActiveCell(newRow: number, newCol: number) {
      this.newCellNumber = this.colsCount * newRow + newCol;
      this.allCells[this.newCellNumber]?.focus();
    },

    checkCellIntersection() {
      let cellOfFirstWord: number = this.getCellPosition(0);
      let cellOfSecondWord: number = this.getCellPosition(1);

      // меняем активную позицию слова, только если находимся на клеточке, которая принадлежит только одному слову
      if ((cellOfFirstWord || cellOfFirstWord === 0) && !cellOfSecondWord) {
        this.activePosition = cellOfFirstWord;
      }
    },

    getCellPosition(number: number): number {
      return this.allCells[this.newCellNumber]?.positions[number];
    },

    getCurrentWordValue() {
      this.currentValue = this.wordsCoords[this.activePosition]
        .map((coords) => {
          return this.cellsValues[coords.row - 1][coords.col - 1];
        })
        .join("");
    },

    checkWordValue() {
      if (
        this.currentValue.length ===
        this.wordsProperties[this.activePosition].answer.length
      ) {
        if (
          this.currentValue.toLowerCase() ===
          this.wordsProperties[this.activePosition].answer
        ) {
          this.highlightWord(true, false);
          this.highlightDefinition(true);
        } else {
          this.highlightWord(false, true);
          this.highlightDefinition(false);
        }
      } else {
        this.highlightWord(false, false);
        this.highlightDefinition(false);
      }
    },

    highlightWord(isWordCorrect: boolean, isWordIncorrect: boolean) {
      this.allCells.forEach((cell) => {
        if (cell.positions.includes(this.activePosition)) {
          cell.cell.isCorrect = isWordCorrect;
          cell.cell.isIncorrect = isWordIncorrect;
        }
      });
    },

    highlightDefinition(isDefinitionCorrect: boolean) {
      this.allDefinitions.forEach((definition) => {
        if (definition.definition.number - 1 === this.activePosition) {
          definition.definition.isDone = isDefinitionCorrect;
        }
      });
    },

    selectActiveCells(settings: Settings) {
      if (settings.mode === "click") {
        this.selectActiveCellsByClick(
          settings.positions[0],
          settings.positions[1]
        );
      } else {
        this.allCells.forEach((cell) => {
          cell.cell.isActive = false;
          if (cell.positions.includes(this.activePosition)) {
            cell.cell.isActive = true;
          }
        });
      }
    },

    selectActiveCellsByClick(
      cellOfFirstWord: number,
      cellOfSecondWord: number
    ) {
      this.allCells.forEach((cell) => {
        cell.cell.isActive = false;

        if (cellOfSecondWord) {
          if (cell.positions.includes(cellOfSecondWord)) {
            cell.cell.isActive = true;
            this.activePosition = cellOfSecondWord;
          }
        } else {
          if (cell.positions.includes(cellOfFirstWord)) {
            cell.cell.isActive = true;
            this.activePosition = cellOfFirstWord;
          }
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/crossword";
</style>
