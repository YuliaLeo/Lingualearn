<template>
  <header class="header">
      <div class="header__container container">
         <Logo></Logo>
       	<div class="spacer"></div>
         <nav class="header__buttons">
            <a href="#" class="button button--link text-bold_medium">Quiz</a>
            <a href="#" class="button button--link text-bold_medium">Crossword</a>
         </nav>
			<Avatar></Avatar>
         <BurgerMenu></BurgerMenu>
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
	}
}
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/_header.scss";
</style>