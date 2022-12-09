import { createRouter, createWebHistory } from "vue-router";
import CrosswordGrid from "./components/CrosswordGrid.vue";
import WordComponent from "./components/WordComponent.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/crossword", component: CrosswordGrid , alias: '/'},
    { path: "/oneWord", component: WordComponent },
  ],
});
