<template>
	<view class="u-base u-select-item u-border-box" @click="onClick" :class="{ 'u-select-item-disabled': isTrueDisabled }">
		<view class="u-select-item-content u-border-box"><slot></slot></view>
		<slot name="icon"
			><view v-if="isTrueSelected" class="u-select-item-icon u-iconfont icon-roundcheckfill u-select-item-selected-icon"> </view>
			<view v-else class="u-select-item-icon u-iconfont icon-round u-select-item-unselcted-icon"></view
		></slot>
	</view>
</template>

<script>
import '@/styles/index.scss'
export default {
	model: {
		event: 'change',
		prop: 'value'
	},
	props: {
		/** 绑定值 */
		value: {
			type: [Boolean, String, Number],
			default: false
		},

		/** 是否禁用 */
		isDisabled: {
			type: Boolean,
			default: false
		},

		/** 是否独立模式，独立模式下不受 u-select-group 影响 */
		isIsolate: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {}
	},

	inject: {
		/** @type {import('../u-select-group/types').USelectGroupProvide} */
		uSelectGroup: {
			from: 'uSelectGroup',
			default: null
		}
	},

	computed: {
		isTrueSelected() {
			if (!this.isIsolate && this.uSelectGroup) {
				return this.uSelectGroup.selectedList.includes(this.value)
			} else {
				return this.value
			}
		},

		isTrueDisabled() {
			return this.isDisabled || (!this.isIsolate && this.uSelectGroup && this.uSelectGroup.isDisabled)
		}
	},

	methods: {
		onClick() {
			if (this.isDisabled) return
			if (!this.isIsolate && this.uSelectGroup && this.uSelectGroup.isDisabled) return
			if (!this.isIsolate && this.uSelectGroup) {
				if (this.uSelectGroup.selectedList.includes(this.value)) {
					this.uSelectGroup.removeSelected(this.value)
				} else {
					this.uSelectGroup.addSelected(this.value)
				}
			} else {
				this.$emit('change', !this.value)
			}
		}
	}
}
</script>

<style scoped lang="scss">
.u-select-item {
	display: flex;
	align-items: center;
	padding: 30rpx;
	border-bottom: 1px solid var(--u-border-color);

	&:active {
		background-color: var(--u-active-color);
	}
}

.u-select-item-disabled {
	color: var(--u-disabled-color);
	background-color: var(--u-disabled-bg-color);

	&:active {
		background-color: var(--u-disabled-bg-color);
	}
}

.u-select-item-content {
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.u-select-item-icon {
	font-size: inherit;
}

.u-select-item-unselcted-icon {
	color: var(--u-select-item-unselcted-icon-color, #ccc);
	border-radius: 50%;
}

.u-select-item-selected-icon {
	color: var(--u-primary-color);
}
</style>
