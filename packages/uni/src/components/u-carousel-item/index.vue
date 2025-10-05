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
			style: {}
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
	flex-shrink: 0;
	width: 100%;
}
</style>
