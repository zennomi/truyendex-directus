<template>
	<v-button v-if="originalUrl" :href="originalUrl" target="_blank">Link {{ source }}</v-button>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue';

type Variant = {
	source?: string;
	source_id?: string;
	[key: string]: any;
}

export default defineComponent({
	setup() {
		const values = inject('values', ref<Variant>({}));

		const source = computed(() => values.value.source?.toUpperCase() || "");

		const originalUrl = computed(() => {
			const { source, source_id } = values.value;
			if (!source || !source_id) {
				return '';
			}

			switch (source) {
				case "mangadex":
					return `https://mangadex.org/title/${source_id}`;
				case "cmanga":
					return `https://cmangax.com/album/test-${source_id}`;
				case "cuutruyen":
					return `https://cuutruyen.net/mangas/${source_id}`;
				case "tanamoe":
					if (!values.value.raw_data?.slug) return ""
					return `https://tana.moe/title/${values.value.raw_data.slug}`;
				default:
					return "";
			}
		});


		return { originalUrl, source };
	},
});
</script>
