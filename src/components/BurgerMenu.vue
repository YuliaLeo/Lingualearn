<template>
	<div class="header__burger burger-menu clickable" 
		@click="addActive" 
		:class="{'burger-menu--active': burgerActive}"
	>
      <span class="burger-menu__line"></span>
      <span class="burger-menu__line"></span>
      <span class="burger-menu__line"></span>
	</div>
</template>

<script>
export default {
	data() {
		return {
			burgerActive: false,
		}
	}, 
	methods: {
		addActive() {
			this.burgerActive = !this.burgerActive;
			this.$emit("addActive", this.burgerActive);
			// для того, чтобы при открытии меню саму страницу нельзя было скролить
			document.querySelector("body")?.classList?.toggle("lock"); 
		}
	}
}
</script>

<style lang="scss" scoped>
	@import "@/assets/scss/_burger-menu.scss";
</style>