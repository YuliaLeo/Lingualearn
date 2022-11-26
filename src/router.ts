import { createRouter, createWebHashHistory } from "vue-router";
import CrosswordGrid from "./components/CrosswordGrid.vue";
import WordComponent from "./components/WordComponent.vue";

export default createRouter({
  // webhash немного устарел, обычно используют роутинг без решётки
  history: createWebHashHistory(),
  routes: [
    { path: "/crossword", component: CrosswordGrid },
    { path: "/oneWord", component: WordComponent },
  ],
});
