<template>
	<view>
		<u-button @click="toButton">按钮组件</u-button>
	</view>
</template>

<script lang="ts">
import Vue from 'vue'
import UButton from '@/components/u-button/index.vue'
export default Vue.extend({
	components: { UButton },
	data() {
		return {}
	},

	methods: {
		toButton() {
			uni.navigateTo({
				url: '/pages/button/index'
			})
		}
	}
})
</script>

<style scoped lang="scss"></style>
