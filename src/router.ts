import { createRouter, createWebHistory } from "vue-router";
import CrosswordGrid from "./components/CrosswordGrid.vue";
import WordComponent from "./components/WordComponent.vue";
import HomePage from "./components/HomePage.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
	 { path: "/homepage", component: HomePage, alias: '/'},
    { path: "/crossword", component: CrosswordGrid},
    { path: "/oneWord", component: WordComponent },
  ],
});
