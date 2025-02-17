<template>
	<div style="width: 100%; height: 100%;">
		<img :src="value" style="width: 100%; height: 100%; object-fit: contain;" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		value: {
			type: String,
			default: null,
		},
	},
	setup(props) {
		const IMAGE_RESIZE_URL = "https://resizer.f-ck.me";

		return {
			value: `${IMAGE_RESIZE_URL}/?url=${props.value}`,
		};
	},
});
</script>
