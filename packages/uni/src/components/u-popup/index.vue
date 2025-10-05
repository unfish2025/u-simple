<template>
	<u-mask
		class="u-popup"
		:visible="isShow"
		:isClickClose="maskIsClickClose"
		:zIndex="maskZIndex"
		:bgColor="maskBgColor"
		:isAnimation="maskIsAnimation"
		:duration="maskDuration"
		:timingFunction="maskTimingFunction"
		:delay="maskDelay"
		:isLockScroll="maskIsLockScroll"
		:isLockBody="maskIsLockBody"
		@click="onClick"
	>
		<view class="u-popup-content" :style="style" :class="renderClassName" @animationend="onAnimationend"><slot></slot></view>
	</u-mask>
</template>

<script>
import { Css } from '@/utils'
const css = new Css()
import UMask from '../u-mask/index.vue'
export default {
	components: { UMask },
	model: {
		event: 'update:visible',
		prop: 'visible'
	},

	props: {
		/** 控制弹窗显示 */
		visible: {
			type: Boolean,
			default: false
		},

		/** 点击是否关闭 */
		isClickClose: {
			type: Boolean,
			default: true
		},

		/** 弹窗位置 */
		direction: {
			type: String,
			default: 'center'
		},

		/** 层级 */
		zIndex: {
			type: [String, Number],
			default: 1000
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

		// 以下兼容小程序, 无法使用 v-bind

		/** mask 层级 */
		maskZIndex: {
			type: [String, Number],
			default: 1000
		},

		/** mask 背景颜色 */
		maskBgColor: {
			type: String,
			default: 'rgba(0, 0, 0, 0.45)'
		},

		/** mask 是否开启动画 */
		maskIsAnimation: {
			type: Boolean,
			default: true
		},

		/** mask 动画时长，单位ms */
		maskDuration: {
			type: [String, Number],
			default: 200
		},

		/** mask 动画函数 */
		maskTimingFunction: {
			type: String,
			default: 'ease'
		},

		/** mask 动画延迟，单位ms */
		maskDelay: {
			type: [String, Number],
			default: 0
		},

		/** mask 是否锁定背景滚动 */
		maskIsLockScroll: {
			type: Boolean,
			default: true
		},

		/** mask 是否锁定页面滚动，仅在 web 有效，锁定后会修改 body 的 overflow 属性 */
		maskIsLockBody: {
			type: Boolean,
			default: true
		}
	},

	data() {
		return {
			isShow: false,
			className: {},
			isEmitClose: null
		}
	},

	computed: {
		style() {
			// 兼容 uniapp bug 解析为字符串, 以适配小程序
			return css.styleObjectToString({
				'--u-popup-z-index': this.zIndex,
				'--u-popup-duration': `${this.duration}ms`,
				'--u-popup-timing-function': this.timingFunction,
				'--u-mask-delay': `${this.delay}ms`
			})
		},

		renderClassName() {
			// 兼容 uniapp bug 解析为字符串, 以适配小程序
			return css.classObjectToString(this.className)
		}
	},

	methods: {
		init() {
			this.className = {
				'u-popup-animation-top-enter': false,
				'u-popup-animation-top-leave': false,
				'u-popup-animation-bottom-enter': false,
				'u-popup-animation-bottom-leave': false,
				'u-popup-animation-left-enter': false,
				'u-popup-animation-left-leave': false,
				'u-popup-animation-right-enter': false,
				'u-popup-animation-right-leave': false,
				'u-popup-animation-center-enter': false,
				'u-popup-animation-center-leave': false
			}
		},

		onAnimationend() {
			const leaveClass = `u-popup-animation-${this.direction}-leave`
			if (this.className[leaveClass]) {
				this.init()
				this.$emit('closed')
				this.$emit('popupAnimationend', { emitType: 'leave' })
				this.isShow = false
				this.$emit('update:visible', false)
			} else {
				this.$emit('opened')
				this.$emit('popupAnimationend', { emitType: 'enter' })
			}
		},

		onClick(e) {
			if (this.isClickClose) {
				this.init()
				const leaveClass = `u-popup-animation-${this.direction}-leave`
				this.className[leaveClass] = true
				if (this.isEmitClose) {
					this.isEmitClose = false
				} else {
					this.$emit('close')
					this.isEmitClose = true
				}
			}
			this.$emit('click', e)
		}
	},

	created() {
		this.init()
	},

	watch: {
		visible: {
			immediate: true,
			handler(value) {
				if (this.isAnimation) {
					if (value) {
						const enterClass = `u-popup-animation-${this.direction}-enter`
						this.init()
						this.className[enterClass] = true
					} else {
						const leaveClass = `u-popup-animation-${this.direction}-leave`
						this.init()
						this.className[leaveClass] = true
					}
				}

				if (value) {
					this.isEmitClose = false
					this.isShow = true
					this.$emit('open')
				} else {
					if (this.isEmitClose === null) {
						this.isShow = false
					} else {
						if (this.isEmitClose) {
							this.isEmitClose = false
						} else {
							this.$emit('close')
							this.isEmitClose = true
						}
					}
				}
			}
		}
	}
}
</script>

<style scoped>
.u-popup-content {
	width: 100%;
	height: 100%;
}

/* // 上边 */
@keyframes u-popup-animation-top-enter {
	0% {
		opacity: 0;
		transform: translateY(-100%);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes u-popup-animation-top-leave {
	0% {
		opacity: 1;
		transform: translateY(0);
	}
	100% {
		opacity: 0;
		transform: translateY(-100%);
	}
}

.u-popup-animation-top-enter {
	animation: u-popup-animation-top-enter var(--u-popup-duration) var(--u-popup-timing-function) var(--u-mask-delay) forwards;
}

.u-popup-animation-top-leave {
	animation: u-popup-animation-top-leave var(--u-popup-duration) var(--u-popup-timing-function) var(--u-mask-delay) forwards;
}

/* // 下边 */
@keyframes u-popup-animation-bottom-enter {
	0% {
		opacity: 0;
		transform: translateY(100%);
	}
	100% {
		opacity: 1;
		transform: translateY(0);
	}
}

@keyframes u-popup-animation-bottom-leave {
	0% {
		opacity: 1;
		transform: translateY(0);
	}
	100% {
		opacity: 0;
		transform: translateY(100%);
	}
}

.u-popup-animation-bottom-enter {
	animation: u-popup-animation-bottom-enter var(--u-popup-duration) var(--u-popup-timing-function) var(--u-mask-delay) forwards;
}

.u-popup-animation-bottom-leave {
	animation: u-popup-animation-bottom-leave var(--u-popup-duration) var(--u-popup-timing-function) var(--u-mask-delay) forwards;
}

/* // 左边 */
@keyframes u-popup-animation-left-enter {
	0% {
		opacity: 0;
		transform: translateX(-100%);
	}
	100% {
		opacity: 1;
		transform: translateX(0);
	}
}

@keyframes u-popup-animation-left-leave {
	0% {
		opacity: 1;
		transform: translateX(0);
	}
	100% {
		opacity: 0;
		transform: translateX(-100%);
	}
}

.u-popup-animation-left-enter {
	animation: u-popup-animation-left-enter var(--u-popup-duration) var(--u-popup-timing-function) var(--u-mask-delay) forwards;
}

.u-popup-animation-left-leave {
	animation: u-popup-animation-left-leave var(--u-popup-duration) var(--u-popup-timing-function) var(--u-mask-delay) forwards;
}

/* // 右边 */
@keyframes u-popup-animation-right-enter {
	0% {
		opacity: 0;
		transform: translateX(100%);
	}
	100% {
		opacity: 1;
		transform: translateX(0);
	}
}

@keyframes u-popup-animation-right-leave {
	0% {
		opacity: 1;
		transform: translateX(0);
	}
	100% {
		opacity: 0;
		transform: translateX(100%);
	}
}

.u-popup-animation-right-enter {
	animation: u-popup-animation-right-enter var(--u-popup-duration) var(--u-popup-timing-function) var(--u-mask-delay) forwards;
}

.u-popup-animation-right-leave {
	animation: u-popup-animation-right-leave var(--u-popup-duration) var(--u-popup-timing-function) var(--u-mask-delay) forwards;
}

/* // 中间 */
@keyframes u-popup-animation-center-enter {
	0% {
		opacity: 0;
		transform: scale(0);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
}

@keyframes u-popup-animation-center-leave {
	0% {
		opacity: 1;
		transform: scale(1);
	}
	100% {
		opacity: 0;
		transform: scale(0);
	}
}

.u-popup-animation-center-enter {
	animation: u-popup-animation-center-enter var(--u-popup-duration) var(--u-popup-timing-function) var(--u-mask-delay) forwards;
}

.u-popup-animation-center-leave {
	animation: u-popup-animation-center-leave var(--u-popup-duration) var(--u-popup-timing-function) var(--u-mask-delay) forwards;
}
</style>
