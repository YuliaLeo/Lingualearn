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
  <loading :isLoading="isLoading" :hasLoadingError="hasLoadingError"></loading>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Word from "@/types/Word";
import Settings from "@/types/InteractSettings";
import Point from "@/types/Point";
import Cell from "@/types/Cell";
import Definition from "@/types/Definition";

import Toast from "@/libraries/Toast/Toast.js";

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
      rowsCount: 0 as number,
      colsCount: 0 as number,
      cellsProperties: [] as Array<Array<Cell>>,
      cellsValues: [] as Array<Array<string | null>>,
      activePosition: 0 as number,
      firstCellsOfWords: [] as Array<Point>,
      allCells: [] as Array<HTMLFormElement>,
      allDefinitions: [] as Array<HTMLFormElement>,
      currentValue: "" as string,
      newCellNumber: 0 as number,
      definitionProperties: [] as Array<Definition>,
      isLoading: false as boolean,
      hasLoadingError: false as boolean,
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

  mounted() {
    this.fetchWords();
  },

  methods: {
    async fetchWords() {
      this.isLoading = true;
      fetch("/words.json")
        .then((response) => response.json())
        .then((response) => (this.wordsProperties = response.words))
        .then(() => this.initCrossword())
        .then(() => this.getAllCellsAndDefinitions())
        .catch(() => this.createNotification())
        .finally(() => (this.isLoading = false));
    },

    createNotification() {
      new Toast({
        message: "Ошибка доступа к базе данных",
        type: "danger",
        customButtons: [
          {
            text: "На главную",
            onClick: function () {
              window.open("/homepage");
            },
          },
        ],
      });
    },

    // этот метод однозначно нуждается в юнит тестах, берем массив данных и генерим на их основе кроссворд,
    // много-много логики, которая покрывается тестами
    initCrossword() {
      // часть того что здесь представлена не является data, оно скорее computed свойства на основе data,
      // но такой рефакторинг может быть затруднителен
      this.wordsCount = this.wordsProperties.length;

      this.initWordsCoords();

      this.initCellsValues();

      this.initCellsProperties();

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

          this.getCrosswordSize(cellCoords.row, cellCoords.col);

          this.wordsCoords[i].push(cellCoords);
        }
      }
    },

    getCrosswordSize(row: number, col: number) {
      this.rowsCount = Math.max(this.rowsCount, row);
      this.colsCount = Math.max(this.colsCount, col);
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
            positions: [],
          });
			 
          this.getPositionsOfWordsForCells(i, j);
        }
      }
    },

    getPositionsOfWordsForCells(i: number, j: number) {
      this.wordsCoords.forEach((word, wordIndex) => {
        word.forEach((coords) => {
          if (coords.row === i + 1 && coords.col === j + 1) {
            this.cellsProperties[i][j].positions.push(wordIndex);
          }
        });
      });
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
      return this.allCells[this.newCellNumber]?.cell?.positions[number];
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

          if (this.activePosition < this.wordsCount - 1) {
            this.activePosition = this.activePosition + 1;
            this.selectActiveCellsByKeyboard(true);
          }
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
        if (cell.cell.positions.includes(this.activePosition)) {
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
        this.selectActiveCellsByKeyboard(false);
      }
    },

    selectActiveCellsByClick(
      cellOfFirstWord: number,
      cellOfSecondWord: number
    ) {
      this.allCells.forEach((cell) => {
        cell.cell.isActive = false;

        if (cellOfSecondWord) {
          if (cell.cell.positions.includes(cellOfSecondWord)) {
            cell.cell.isActive = true;
            this.activePosition = cellOfSecondWord;
          }
        } else {
          if (cell.cell.positions.includes(cellOfFirstWord)) {
            cell.cell.isActive = true;
            this.activePosition = cellOfFirstWord;
          }
        }
      });
    },

    selectActiveCellsByKeyboard(toNextWord: boolean) {
      this.allCells.forEach((cell) => {
        if (toNextWord) {
          if (
            cell.cell.col ===
              this.getFirstCellsOfWords[this.activePosition].col &&
            cell.cell.row === this.getFirstCellsOfWords[this.activePosition].row
          ) {
            cell.focus();
          }
        }
        cell.cell.isActive = false;
        if (cell.cell.positions.includes(this.activePosition)) {
          cell.cell.isActive = true;
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/libraries/Toast/Toast.css";
@import "@/assets/scss/crossword";
</style>
