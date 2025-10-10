<template>
	<view class="u-base u-carousel-item u-border-box" :style="renderStyle"><slot></slot></view>
</template>

<script>
import { createUUID, Css } from '@/utils'
const css = new Css()
export default {
	data() {
		return {
			uuid: createUUID(),
			style: {
				transform: `translateX(0%)`
			}
		}
	},

	computed: {
		renderStyle() {
			return css.styleObjectToString(this.style)
		}
	},

	inject: {
		uCarousel: {
			from: 'uCarousel'
		}
	},

	created() {
		/** @type {import('../u-carousel/types').UCarouselProvide['bus']} */
		const bus = this.uCarousel.bus
		bus.emit('add', this.uuid, (offsetX) => {
			this.style = {
				transform: `translateX(${offsetX}%)`
			}
		})
	},

	beforeDestroy() {
		/** @type {import('../u-carousel/types').UCarouselProvide['bus']} */
		const bus = this.uCarousel.bus
		bus.emit('remove', this.uuid)
	}
}
</script>

<style scoped lang="scss">
.u-carousel-item {
	--u-carousel-item-width: 100%;
	--u-carousel-item-height: auto;
	width: var(--u-carousel-item-width);
	height: var(--u-carousel-item-height);
	flex-shrink: 0;
}
</style>
