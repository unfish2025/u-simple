<template>
	<view class="u-base u-carousel-item u-border-box" :style="style"><slot></slot></view>
</template>

<script>
export default {
	data() {
		return {
			uuid: Math.random().toString(36).substring(2, 8) + '_' + Date.now()
		}
	},

	computed: {
		style() {
			const index = this.uCarousel.orderMap?.[this.uuid]
			console.log('index', index)
			return {
				order: index !== void 0 ? index : 'auto'
			}
		}
	},

	inject: {
		uCarousel: {
			from: 'uCarousel'
		}
	},

	created() {
		this.uCarousel.add(this.uuid)
	},

	beforeDestroy() {
		this.uCarousel.remove(this.uuid)
	}
}
</script>

<style scoped lang="scss">
.u-carousel-item {
	flex-shrink: 0;
	width: 100%;
}
</style>
