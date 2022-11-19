import { createRouter, createWebHashHistory } from "vue-router";
import CrosswordGrid from "./components/CrosswordGrid.vue";
import WordComponent from "./components/WordComponent.vue";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: "/crossword", component: CrosswordGrid },
    { path: "/oneWord", component: WordComponent },
  ],
});
