<template>
	<div :class="['crossword__definition']"
			ref="definition">
		{{number}}. {{clue}}
	</div>
</template>

<script>
export default {
	props: {
		clue: {type: String},
		number: {type: Number},
		position: {type: Number}
	}
}
</script>

<style scoped>
</style>