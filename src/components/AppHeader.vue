<template>
  <header class="header"
	:class="{'header--active': headerActive}">
      <div class="header__container container">
         <logo></logo>
       	<div class="spacer"></div>
         <nav class="header__buttons">
            <a href="#" class="button button--link text-bold_medium">Quiz</a>
            <a href="/#/crossword" class="button button--link text-bold_medium">Crossword</a>
         </nav>
			<avatar></avatar>
         <burger-menu @addActive="addHeaderActive"></burger-menu>
      </div>
   </header>
</template>

<script>
import Logo from "@/components/Logo.vue";
import Avatar from "@/components/Avatar.vue";
import BurgerMenu from "@/components/BurgerMenu.vue";

export default {
	components: {
		Logo, Avatar, BurgerMenu
	}, 
	data() {
		return {
			headerActive: false,
		}
	},
	methods: {
		addHeaderActive(state) {
			this.headerActive = state;
		}
	}
}
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/_header.scss";
</style>