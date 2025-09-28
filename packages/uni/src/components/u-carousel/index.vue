<template>
	<view
		class="u-base u-carousel u-border-box"
		@touchstart.stop.prevent="onTouchStart"
		@touchmove.stop.prevent="onTouchMove"
		@touchend.stop.prevent="onTouchEnd"
	>
		<view class="u-carousel-container" :style="style">
			<slot></slot>
		</view>
	</view>
</template>

<script>
export default {
	model: {
		event: 'change',
		prop: 'value'
	},

	props: {
		/** 当前选中的索引, 默认为 0 */
		value: {
			type: Number,
			default: 0
		},

		/** 是否开启循环, 三项循环才有效, 默认为 true */
		isLoop: {
			type: Boolean,
			default: true
		},

		/** 是否开启自动播放, 默认为 false */
		autoplay: {
			type: Boolean,
			default: false
		},

		/** 自动播放间隔时间, 单位 ms, 默认为 3000 */
		interval: {
			type: Number,
			default: 3000
		},

		/** 滑动动画时长, 单位 ms, 默认为 500 */
		duration: {
			type: Number,
			default: 500
		},

		/** 是否开启淡入淡出效果, 默认为 false */
		fade: {
			type: Boolean,
			default: false
		},

		/** 是否显示指示点, 默认为 true */
		indicatorDots: {
			type: Boolean,
			default: true
		},

		/** 指示点颜色, 默认为 rgba(0, 0, 0, .3) */
		indicatorColor: {
			type: String,
			default: 'rgba(0, 0, 0, .3)'
		},

		/** 当前选中的指示点颜色, 默认为 #000 */
		indicatorActiveColor: {
			type: String,
			default: '#000'
		},

		/** 指示点大小, 单位 rpx, 默认为 20 */
		indicatorSize: {
			type: Number,
			default: 20
		},

		/** 指示点间距, 单位 rpx, 默认为 12 */
		indicatorSpacing: {
			type: Number,
			default: 12
		},

		/** 指示点位置, 可选值为 'top', 'bottom', 'left', 'right', 'none', 默认为 'bottom' */
		indicatorPosition: {
			type: String,
			default: 'bottom'
		},

		/** 滑动门槛, 单位 px, 默认为 50 */
		threshold: {
			type: Number,
			default: 50
		}
	},

	data() {
		return {
			list: [],
			/** @type {import('./types').UCarouselProvide} */
			uCarousel: {
				orderMap: {},
				add: (value) => {
					if (this.list.includes(value)) return
					this.list.push(value)
					this.uCarousel.orderMap[value] = this.list.length - 1
					this.$set(this.uCarousel.orderMap, value, this.list.length - 1)
				},
				remove: (value) => {
					const index = this.list.indexOf(value)
					if (index === -1) return
					this.list.splice(index, 1)
					delete this.uCarousel.orderMap[value]
					this.$delete(this.uCarousel.orderMap, value)
				}
			},
			startX: 0,
			offsetX: 0
		}
	},

	computed: {
		style() {
			if (this.offsetX) {
				return {
					transform: `translateX(calc(-${this.value * 100}% + ${this.offsetX}px))`,
					transitionDuration: `0ms`
				}
			}
			return {
				transform: `translateX(-${this.value * 100}%)`,
				transitionDuration: `${this.duration}ms`
			}
		}
	},

	provide() {
		return {
			uCarousel: this.uCarousel
		}
	},

	methods: {
		onTouchStart(e) {
			this.startX = e.changedTouches[0].clientX
			console.log('start', e)
		},

		onTouchMove(e) {
			this.offsetX = e.changedTouches[0].clientX - this.startX
			console.log('move', e)
		},

		onTouchEnd(e) {
			if (Math.abs(this.offsetX) > this.threshold) {
				if (this.offsetX > 0) {
					// 向右滑动
					if (this.value > 0) {
						this.$emit('change', this.value - 1)
					} else if (this.isLoop) {
						this.$emit('change', this.list.length - 1)
					}
				} else {
					// 向左滑动
					if (this.value < this.list.length - 1) {
						this.$emit('change', this.value + 1)
					} else if (this.isLoop) {
						this.$emit('change', 0)
					}
				}
			}
			this.offsetX = 0
			console.log('end', e)
		}
	},

	watch: {
		value: {
			immediate: true,
			handler(value) {
				if (!(this.list.length >= 3 && this.isLoop)) {
					return
				}
				if (value === 0) {
					this.uCarousel.orderMap[this.list.at(-1)] = -1
				} else if (value === this.list.length - 1) {
					this.uCarousel.orderMap[this.list.at(0)] = this.list.length
				}
			}
		}
	}
}
</script>

<style scoped lang="scss">
.u-carousel {
	overflow: hidden;
	position: relative;
}

.u-carousel-container {
	display: flex;
	width: 100%;
}
</style>
