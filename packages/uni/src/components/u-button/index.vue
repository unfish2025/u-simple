<template>
	<view class="u-base u-button u-border-box" :style="style" :class="className" @click.stop.prevent="isDisabled ? null : $emit('click', $event)">
		<slot></slot>
	</view>
</template>

<script>
import Vue from 'vue'
import '@/styles/index.scss'
import { typeEmun, sizeEnum, typeToColorEnum } from './config'
import { Css } from '@/utils'
const css = new Css()
export default Vue.extend({
	props: {
		/** 按钮类型, 默认为 primary */
		type: {
			type: String,
			default: typeEmun.primary
		},

		/** 是否为朴素按钮, 默认为 false */
		isPlain: {
			type: Boolean,
			default: false
		},

		/** 按钮尺寸, 支持 mini/small/normal/large, 默认为 normal */
		size: {
			type: String,
			default: sizeEnum.normal
		},

		/** 是否开启点击反馈, 默认为 true */
		isActiveFeedback: {
			type: Boolean,
			default: true
		},

		/** 点击反馈类型, 支持 darken/lighten, 默认为 darken */
		activeFeedbackType: {
			type: String,
			default: 'darken' // darken / lighten
		},

		/** 点击反馈程度, 支持 0 ~ 100, 默认为 10 */
		activeFeedbackDegree: {
			type: Number,
			default: 10
		},

		/** 是否开启圆角, 默认为 true */
		isBorderRadius: {
			type: Boolean,
			default: true
		},

		/** 是否禁用按钮, 默认为 false */
		isDisabled: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {}
	},

	computed: {
		className() {
			return {
				[`u-button-${this.size}`]: sizeEnum[this.size],
				'u-button-is-plain': this.isPlain,
				'u-button-is-background-color': !this.isPlain,
				'u-button-is-active-feedback': this.isActiveFeedback,
				'u-button-is-border-radius': this.isBorderRadius,
				'u-button-is-disabled': this.isDisabled
			}
		},

		style() {
			/** @type {import('./types').ButtonStyle} */
			const style = {}
			const type = typeEmun[this.type]
			if (type) {
				style['--u-button-type-color'] = typeToColorEnum[type]
			} else {
				style['--u-button-type-color'] = this.type
			}

			if (this.isActiveFeedback) {
				style['--u-button-active-type-color'] =
					this.activeFeedbackType === 'darken'
						? css.colorDarken(style['--u-button-type-color'], this.activeFeedbackDegree)
						: css.colorLighten(style['--u-button-type-color'], this.activeFeedbackDegree)
			}

			return style
		}
	}
})
</script>

<style scoped lang="scss">
.u-button {
	display: inline-flex;
	justify-content: center;
	border: 1px solid var(--u-button-type-color);
	color: #fff;
	cursor: pointer;
}

.u-button-is-background-color {
	background-color: var(--u-button-type-color);
}

.u-button-is-plain {
	color: var(--u-button-type-color);
}

.u-button-is-active-feedback {
	&:active {
		background-color: var(--u-button-active-type-color);
		border-color: var(--u-button-active-type-color);
	}

	&.u-button-is-plain:active {
		color: #fff;
	}
}

.u-button-is-disabled {
	opacity: 0.6;
	// pointer-events: none;
	cursor: not-allowed;
	&:active {
		background-color: var(--u-button-type-color);
		border-color: var(--u-button-type-color);
	}
}

.u-button-mini {
	padding: 8rpx 16rpx;
	font-size: 24rpx;

	&.u-button-is-border-radius {
		border-radius: 6rpx;
	}
}

.u-button-small {
	padding: 12rpx 24rpx;
	font-size: 28rpx;

	&.u-button-is-border-radius {
		border-radius: 6rpx;
	}
}

.u-button-normal {
	padding: 16rpx 32rpx;
	font-size: 32rpx;

	&.u-button-is-border-radius {
		border-radius: 8rpx;
	}
}

.u-button-large {
	padding: 20rpx 38rpx;
	font-size: 34rpx;

	&.u-button-is-border-radius {
		border-radius: 8rpx;
	}
}
</style>
