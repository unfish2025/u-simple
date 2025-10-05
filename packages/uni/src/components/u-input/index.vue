<template>
	<view class="u-base u-input u-border-box" :class="className">
		<slot name="prefix"></slot>
		<input
			class="u-input-control"
			:type="type"
			:value="currentValue"
			:text-content-type="textContentType"
			:password="computedPassword"
			:placeholder="placeholder"
			:placeholder-style="placeholderStyle"
			:placeholder-class="placeholderClass"
			:disabled="isDisabled"
			:maxlength="maxLength"
			:cursor-spacing="cursorSpacing"
			:focus="focus"
			:confirm-type="confirmType"
			:confirm-hold="confirmHold"
			:cursor="cursor"
			:cursor-color="cursorColor"
			:selection-start="selectionStart"
			:selection-end="selectionEnd"
			:adjust-position="adjustPosition"
			:auto-blur="autoBlur"
			:ignoreCompositionEvent="ignoreCompositionEvent"
			:always-embed="alwaysEmbed"
			:hold-keyboard="holdKeyboard"
			:safe-password-cert-path="safePasswordCertPath"
			:safe-password-length="safePasswordLength"
			:safe-password-time-stamp="safePasswordTimeStamp"
			:safe-password-nonce="safePasswordNonce"
			:safe-password-salt="safePasswordSalt"
			:safe-password-custom-hash="safePasswordCustomHash"
			:random-number="randomNumber"
			:controlled="controlled"
			:always-system="alwaysSystem"
			:inputmode="inputMode"
			@input="onInput"
			@focus="onFocus"
			@blur="onBlur"
			@confirm="onConfirm"
			@keyboardheightchange="onKeyboardHeightChange"
		/>
		<slot name="suffix">
			<view
				v-if="isClearable && currentValue.length"
				class="u-input-suffix u-clearable u-iconfont icon-round_close_light"
				@click="onClear"
			></view>
			<view
				v-if="(type === 'password' || isPassword) && isShowPassword"
				class="u-input-suffix u-show-password u-iconfont"
				:class="isShowPasswordStatus ? 'icon-attention_light' : 'icon-attentionforbid'"
				@click="onSwitchShowPassword"
			></view>
		</slot>
	</view>
</template>

<script>
import { Css } from '@/utils'
const css = new Css()
export default {
	model: {
		event: 'input',
		prop: 'value'
	},
	props: {
		/** 是否显示边框 */
		isBorder: {
			type: Boolean,
			default: true
		},

		/** 输入框占位符 */
		placeholder: {
			type: String,
			default: ''
		},

		/** 输入框的值 */
		value: {
			type: String,
			default: ''
		},

		/** 是否为密码输入框 */
		isPassword: {
			type: Boolean,
			default: false
		},

		/** 输入框占位符样式 */
		placeholderStyle: {
			type: String,
			default: 'color: var(--u-placeholder-color);'
		},

		/** 是否禁用输入框 */
		isDisabled: {
			type: Boolean,
			default: false
		},

		/** 是否展示可清空输入框控件 */
		isClearable: {
			type: Boolean,
			default: true
		},

		/** 是否展示可显示密码输入框控件 */
		isShowPassword: {
			type: Boolean,
			default: true
		},

		/** 输入框类型, 默认为 text */
		type: {
			type: String,
			default: 'text'
		},

		/** 文本区域的语义，根据类型自动填充, 具体支持参考 uniapp */
		textContentType: {
			type: String
		},

		/** 输入框占位符类名, 具体支持参考 uniapp */
		placeholderClass: {
			type: String
		},
		/** 最大输入长度, 默认为 200, 兼容 uniapp bug, 未设置 default(为undefined) 无法使用默认值 */
		maxLength: {
			type: Number,
			default: 200
		},

		/** 光标与键盘的距离, 具体支持参考 uniapp */
		cursorSpacing: {
			type: Number
		},

		/** 是否获取焦点, 具体支持参考 uniapp */
		focus: {
			type: Boolean
		},

		/** 确认按钮文字, 具体支持参考 uniapp */
		confirmType: {
			type: String
		},

		/** 点击键盘右下角按钮时是否保持键盘不收起, 具体支持参考 uniapp */
		confirmHold: {
			type: Boolean
		},

		/** 指定光标位置, 具体支持参考 uniapp */
		cursor: {
			type: Number
		},

		/** 光标颜色, 具体支持参考 uniapp */
		cursorColor: {
			type: String
		},

		/** 光标起始位置, 具体支持参考 uniapp */
		selectionStart: {
			type: Number
		},

		/** 光标结束位置, 具体支持参考 uniapp */
		selectionEnd: {
			type: Number
		},

		/** 键盘弹起时是否自动上推页面, 具体支持参考 uniapp */
		adjustPosition: {
			type: Boolean
		},

		/** 键盘收起时是否自动失焦, 具体支持参考 uniapp */
		autoBlur: {
			type: Boolean
		},

		/** 是否忽略中文输入法的合成事件, 具体支持参考 uniapp */
		ignoreCompositionEvent: {
			type: Boolean
		},

		/** 是否强制内联显示, 具体支持参考 uniapp */
		alwaysEmbed: {
			type: Boolean
		},

		/** 是否强制保持键盘不收起, 具体支持参考 uniapp */
		holdKeyboard: {
			type: Boolean
		},

		/** 安全键盘证书路径, 具体支持参考 uniapp */
		safePasswordCertPath: {
			type: String
		},

		/** 安全键盘输入长度, 具体支持参考 uniapp */
		safePasswordLength: {
			type: Number
		},

		/** 安全键盘时间戳, 具体支持参考 uniapp */
		safePasswordTimeStamp: {
			type: Number
		},

		/** 安全键盘随机数, 具体支持参考 uniapp */
		safePasswordNonce: {
			type: String
		},

		/** 安全键盘盐值, 具体支持参考 uniapp */
		safePasswordSalt: {
			type: String
		},

		/** 安全键盘自定义哈希, 具体支持参考 uniapp */
		safePasswordCustomHash: {
			type: String
		},

		/** 是否随机数字键盘, 具体支持参考 uniapp */
		randomNumber: {
			type: Boolean
		},

		/** 是否受控输入, 具体支持参考 uniapp */
		controlled: {
			type: Boolean
		},

		/** 是否始终使用系统键盘, 具体支持参考 uniapp */
		alwaysSystem: {
			type: Boolean
		},

		/** 输入模式, 具体支持参考 uniapp */
		inputMode: {
			type: String
		}
	},

	data() {
		return {
			isFocus: false,
			currentValue: '',
			isShowPasswordStatus: false
		}
	},

	computed: {
		computedPassword() {
			return this.isPassword && !this.isShowPasswordStatus
		},

		className() {
			// 兼容 uniapp bug 解析为字符串, 以适配小程序
			return css.classObjectToString({
				'u-input-is-border': this.isBorder,
				'u-input-is-focus': this.isFocus,
				'u-is-disabled': this.isDisabled
			})
		}
	},

	methods: {
		onInput(event) {
			this.currentValue = event.detail.value
			this.$emit('input', event.detail.value, { originalEvent: event, emitType: 'input' })
		},

		onFocus(event) {
			this.isFocus = true
			this.$emit('focus', event.detail.value, { originalEvent: event, emitType: 'focus' })
		},

		onBlur(event) {
			this.isFocus = false
			this.$emit('blur', event.detail.value, { originalEvent: event, emitType: 'blur' })
			if (this.currentValue !== event.detail.value) {
				this.$emit('change', event.detail.value, { originalEvent: event, emitType: 'change' })
			}
		},

		onConfirm(event) {
			this.$emit('confirm', event.detail.value, { originalEvent: event, emitType: 'confirm' })
		},

		onKeyboardHeightChange(event) {
			this.$emit('keyboardheightchange', this.currentValue, { originalEvent: event, emitType: 'keyboardheightchange' })
		},

		onClear(event) {
			this.currentValue = ''
			this.$emit('input', '', { originalEvent: event, emitType: 'clear' })
		},

		onSwitchShowPassword(event) {
			this.isShowPasswordStatus = !this.isShowPasswordStatus
			this.$emit('switchshowpassword', this.isShowPasswordStatus, { originalEvent: event, emitType: 'switchshowpassword' })
		},

		/** 清空输入框 */
		clear() {
			this.currentValue = ''
			this.$emit('input', '', { originalEvent: null, emitType: 'clear', call: true })
		},

		/**
		 * 设置是否显示密码
		 * @param {Boolean} status  是否显示密码
		 */
		setShowPasswordStatus(status) {
			this.isShowPasswordStatus = !!status
			this.$emit('switchshowpassword', this.isShowPasswordStatus, { originalEvent: null, emitType: 'switchshowpassword', call: true })
		}
	},

	watch: {
		value: {
			immediate: true,
			handler(value) {
				this.currentValue = value
			}
		}
	}
}
</script>

<style scoped lang="scss">
.u-input {
	display: flex;
	height: 70rpx;
	line-height: 70rpx;
	padding: 0 20rpx;
	border-radius: 8rpx;
}

.u-is-disabled {
	cursor: not-allowed;
	background-color: rgba(231, 231, 231, 0.5);
}

.u-input-control {
	flex: 1;
	height: 100%;
}

.u-input-is-border {
	border: 1px solid var(--u-info-color);
	transition: border-color 0.2s;
}

.u-input-is-focus {
	border-color: var(--u-primary-color);
}

.u-input-suffix {
	margin-left: 10rpx;
	cursor: pointer;
	font-size: 30rpx;
}
</style>
