<template>
	<div :class="['crossword__definition']"
			ref="definition">
		{{number}}. {{clue}}
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
	props: {
		clue: {
			type: String as PropType<string>
		},
		number: {
			type: Number as PropType<number>
		},
		position: {
			type: Number as PropType<number>
		}
	}
});
</script>

<style scoped>
</style>