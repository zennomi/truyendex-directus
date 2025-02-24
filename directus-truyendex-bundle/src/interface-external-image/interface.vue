<template>
	<v-input v-model="imageUrl" type="text" placeholder="Enter image URL" />
	<img style="margin-top: 10px;" v-if="isValidUrl(imageUrl)" :src="getProxiedImageUrl(imageUrl)" alt="Image" />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { isValidUrl, getProxiedImageUrl } from '../utils/image';

export default defineComponent({
	props: {
		value: {
			type: String,
			default: null,
		},
	},
	emits: ['input'],
	setup(props, { emit }) {
		const imageUrl = ref(props.value);

		watch(imageUrl, (newValue) => {
			emit('input', newValue);
		});

		watch(() => props.value, (newValue) => {
			if (newValue !== null) {
				imageUrl.value = newValue;
			}
		}, { immediate: true });

		return { imageUrl, isValidUrl, getProxiedImageUrl };
	},
});
</script>