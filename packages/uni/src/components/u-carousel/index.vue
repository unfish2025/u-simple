<template>
	<view
		class="u-base u-carousel u-border-box"
		:class="{ [uuid]: true }"
		@touchstart.stop.prevent="onTouchStart"
		@touchmove.stop.prevent="onTouchMove"
		@touchend.stop.prevent="onTouchEnd"
	>
		<view class="u-carousel-container" :style="style" @transitionstart="onTransitionStart" @transitionend="onTransitionEnd">
			<slot></slot>
		</view>
		<slot name="other"></slot>
	</view>
</template>

<script>
import { createUUID, Css } from '@/utils'
import Bus from '@yishu/event'
const css = new Css()
export default {
	model: {
		event: 'input',
		prop: 'value'
	},

	props: {
		/** 当前选中的索引, 默认为 0 */
		value: {
			type: Number,
			default: 0
		},

		/** 滑动门槛, 单位 px, 默认为 60 */
		threshold: {
			type: Number,
			default: 60
		},

		/** 是否开启过渡动画, 默认为 true */
		isTransition: {
			type: Boolean,
			default: true
		},

		/** 是否开启循环, 三项循环才有效, 默认为 false */
		isLoop: {
			type: Boolean,
			default: false
		},

		/** 滑动动画时长, 单位 ms, 默认为 300 */
		duration: {
			type: Number,
			default: 300
		},

		/** 是否禁用, 默认为 false */
		isDisabled: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			uuid: 'u-id-' + createUUID() + '-' + Date.now(),
			minLoopItems: 3,
			tempValue: 0,
			width: 0,
			stopTransition: false,
			isTransitioning: false,
			list: [],
			/** @type {import('./types').UCarouselProvide} */
			uCarousel: {
				bus: new Bus({
					events: {
						add: (uuid, onChangeHandler) => {
							this.list.push({ uuid, onChangeHandler })
						},
						remove: (uuid) => {
							const index = this.list.findIndex((item) => item.uuid === uuid)
							if (index !== -1) {
								this.list.splice(index, 1)
							}
						}
					}
				})
			},
			startX: 0,
			offsetX: 0
		}
	},

	computed: {
		style() {
			const style = {}
			if (this.tempValue) {
				style.transform = `translateX(calc(${this.tempValue * 100}% + ${this.offsetX}px))`
			} else {
				style.transform = `translateX(calc(-${this.value * 100}% + ${this.offsetX}px))`
			}

			if (this.isTransition) {
				if (this.offsetX || this.stopTransition) {
					style.transition = 'transform 0ms'
				} else {
					style.transition = `transform ${this.duration}ms`
				}
			}

			// 兼容 uniapp bug 解析为字符串, 以适配小程序
			return css.styleObjectToString(style)
		}
	},

	provide() {
		return {
			uCarousel: this.uCarousel
		}
	},

	methods: {
		onTransitionStart() {
			this.isTransitioning = true
		},

		onTransitionEnd() {
			// 向右滑动
			if (this.tempValue > 0) {
				this.$emit('input', this.list.length - 1)
			}
			// 向左滑动
			else if (this.tempValue < 0) {
				this.$emit('input', 0)
			}
			this.$nextTick(() => {
				this.stopTransition = true
				this.tempValue = 0
				this.list.forEach((item) => {
					item.onChangeHandler(0)
				})

				// #ifdef WEB
				setTimeout(() => {
					this.stopTransition = false
					this.isTransitioning = false
				}, 0)
				// #endif
				// #ifdef MP-WEIXIN
				setTimeout(() => {
					this.$nextTick(() => {
						this.stopTransition = false
						this.isTransitioning = false
					})
				}, 10) // 小程序模拟器没问题, 但真机会有问题, 所以延时处理
				// #endif
			})
		},

		onTouchStart(e) {
			this.startX = e.changedTouches[0].clientX
		},

		onTouchMove(e) {
			if (this.isTransitioning || this.isDisabled) return
			// 移动过程中计算, 避免切换闪烁
			if (this.isLoop && this.list.length >= this.minLoopItems) {
				if (this.value === 0) {
					const item = this.list.at(-1)
					item.onChangeHandler(this.list.length * -100)
				} else if (this.value === this.list.length - 1) {
					const item = this.list.at(0)
					item.onChangeHandler(this.list.length * 100)
				} else {
					this.list.forEach((item) => {
						item.onChangeHandler(0)
					})
				}
			}
			const offsetX = e.changedTouches[0].clientX - this.startX
			if (this.width && Math.abs(this.offsetX) >= this.width) {
				this.offsetX = this.offsetX > 0 ? this.width : -this.width
			} else {
				this.offsetX = offsetX
			}
		},

		onTouchEnd() {
			if (Math.abs(this.offsetX) > this.threshold) {
				// 向右滑动
				if (this.offsetX > 0) {
					if (this.value > 0) {
						this.$emit('input', this.value - 1)
					} else if (this.isLoop && this.list.length >= this.minLoopItems && this.value === 0) {
						this.tempValue = 1
					}
				}
				// 向左滑动
				else {
					if (this.value < this.list.length - 1) {
						this.$emit('input', this.value + 1)
					} else if (this.isLoop && this.list.length >= this.minLoopItems && this.value === this.list.length - 1) {
						this.tempValue = -this.list.length
					}
				}
			}
			this.offsetX = 0
			if (!this.isTransition) {
				this.onTransitionEnd()
			}
		}
	},

	mounted() {
		// #ifdef WEB || MP-WEIXIN
		this.windowResizeCallback = () => {
			const query = uni.createSelectorQuery().in(this)
			query
				.select(`.${this.uuid}`)
				.boundingClientRect((data) => {
					this.width = data.width
				})
				.exec()
		}
		uni.onWindowResize(this.windowResizeCallback)
		this.windowResizeCallback()
		// #endif
	},

	beforeDestroy() {
		// #ifdef WEB || MP-WEIXIN
		uni.offWindowResize(this.windowResizeCallback)
		// #endif
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
