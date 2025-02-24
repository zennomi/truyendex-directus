<template>
	<div style="width: 100%; height: 100%;">
		<img v-if="value" :src="value" style="width: 100%; height: 100%; object-fit: contain;" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { getProxiedImageUrl, isValidUrl } from '../utils/image';

export default defineComponent({
	props: {
		value: {
			type: String,
			default: null,
		},
	},
	setup(props) {
		if (!props.value || !isValidUrl(props.value)) {
			return {
				value: null,
			};
		}

		return {
			value: getProxiedImageUrl(props.value),
		};
	},
});
</script>
