<template>
	<view class="u-base u-mask u-border-box" :class="className" :style="style" @click="onClick" @animationend="onAnimationend" v-if="visible">
		<view class="u-mask-container" @touchmove.stop.prevent v-if="isLockScroll"></view>
		<view class="u-mask-container" v-else></view>
		<slot></slot>
	</view>
</template>

<script>
import '@/styles/index.scss'
export default {
	model: {
		event: 'update:visible',
		prop: 'visible'
	},
	props: {
		/** 是否显示 */
		visible: {
			type: Boolean,
			default: false
		},

		/** 层级 */
		zIndex: {
			type: [String, Number],
			default: 1000
		},

		/** 点击是否关闭 */
		isClickClose: {
			type: Boolean,
			default: true
		},

		/** 背景颜色 */
		bgColor: {
			type: String,
			default: 'rgba(0, 0, 0, 0.45)'
		},

		/** 是否开启动画 */
		isAnimation: {
			type: Boolean,
			default: true
		},

		/** 动画时长，单位ms */
		duration: {
			type: [String, Number],
			default: 200
		},

		/** 动画函数 */
		timingFunction: {
			type: String,
			default: 'ease'
		},

		/** 动画延迟，单位ms */
		delay: {
			type: [String, Number],
			default: 0
		},

		/** 是否锁定背景滚动 */
		isLockScroll: {
			type: Boolean,
			default: true
		},

		/** 是否锁定页面滚动，仅在 web 有效，锁定后会修改 body 的 overflow 属性 */
		isLockBody: {
			type: Boolean,
			default: true
		}
	},

	data() {
		return {
			className: {
				'u-mask-animation-enter': false,
				'u-mask-animation-leave': false
			},
			bodyOverflow: null,
			isEmitClose: null
		}
	},

	computed: {
		style() {
			return {
				'--u-mask-bg-color': this.bgColor,
				'--u-mask-z-index': this.zIndex,
				'--u-mask-duration': `${this.duration}ms`,
				'--u-mask-timing-function': this.timingFunction,
				'--u-mask-delay': `${this.delay}ms`
			}
		}
	},

	methods: {
		onClick(e) {
			if (this.isClickClose) {
				this.className = {
					'u-mask-animation-enter': false,
					'u-mask-animation-leave': true
				}
				if (this.isEmitClose) {
					this.isEmitClose = false
				} else {
					this.$emit('close')
					this.isEmitClose = true
				}
				if (!this.isAnimation) {
					this.$emit('update:visible', false)
				}
			}
			this.$emit('click', e)
		},

		onAnimationend() {
			if (this.className['u-mask-animation-leave']) {
				this.$emit('update:visible', false)
				this.className = {
					'u-mask-animation-enter': false,
					'u-mask-animation-leave': false
				}
				this.$emit('closed')
				this.$emit('maskAnimationend', { emitType: 'leave' })
			} else {
				this.$emit('opened')
				this.$emit('maskAnimationend', { emitType: 'enter' })
			}
		}
	},

	watch: {
		visible: {
			immediate: true,
			handler(value) {
				if (this.isAnimation) {
					if (value) {
						this.className = {
							'u-mask-animation-enter': true,
							'u-mask-animation-leave': false
						}
					} else {
						this.className = {
							'u-mask-animation-enter': false,
							'u-mask-animation-leave': true
						}
					}
				}

				if (value) {
					this.$emit('open')
				} else {
					if (this.isEmitClose === null) {
						this.isEmitClose = false
					} else {
						if (this.isEmitClose) {
							this.isEmitClose = false
						} else {
							this.$emit('close')
							this.isEmitClose = true
						}
					}
				}

				// #ifdef WEB
				if (this.isLockBody && this.isLockScroll) {
					if (this.bodyOverflow === null) {
						this.bodyOverflow = document.body.style.overflow
					}

					if (value) {
						document.body.style.overflow = 'hidden'
					} else {
						document.body.style.overflow = this.bodyOverflow
						this.bodyOverflow = null
					}
				}
				if ((!this.isLockBody || !this.isLockScroll) && this.bodyOverflow !== null) {
					// 清除副作用
					document.body.style.overflow = this.bodyOverflow
					this.bodyOverflow = null
				}
				// #endif
			}
		}
	}
}
</script>

<style scoped lang="scss">
@keyframes u-mask-fade-enter {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}

@keyframes u-mask-fade-leave {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
}

.u-mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: var(--u-mask-z-index);
}

.u-mask-container {
	position: absolute;
	z-index: -1;
	width: 100%;
	height: 100%;
	background-color: var(--u-mask-bg-color);
}

.u-mask-animation-enter {
	animation: u-mask-fade-enter var(--u-mask-duration) var(--u-mask-timing-function) var(--u-mask-delay) forwards;
}

.u-mask-animation-leave {
	animation: u-mask-fade-leave var(--u-mask-duration) var(--u-mask-timing-function) var(--u-mask-delay) forwards;
}
</style>
