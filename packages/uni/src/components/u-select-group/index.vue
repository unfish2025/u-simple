<template>
	<view class="u-base u-select-item u-border-box">
		<slot></slot>
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
		value: {
			type: [Array, String, Number]
		},

		isDisabled: {
			type: Boolean,
			default: false
		},

		isMultiple: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			/** @type {import('./types').USelectGroupProvide} */
			uSelectGroup: {
				disabled: false,
				selectedList: [],
				addSelected: (value) => {
					if (!this.uSelectGroup.selectedList.includes(value)) {
						if (!this.isMultiple) {
							this.uSelectGroup.selectedList = []
						}
						this.uSelectGroup.selectedList.push(value)
						this.$emit('change', this.isMultiple ? this.uSelectGroup.selectedList : this.uSelectGroup.selectedList[0] || null)
					}
				},
				removeSelected: (value) => {
					const index = this.uSelectGroup.selectedList.indexOf(value)
					if (index !== -1) {
						this.uSelectGroup.selectedList.splice(index, 1)
						this.$emit('change', this.isMultiple ? this.uSelectGroup.selectedList : this.uSelectGroup.selectedList[0] || null)
					}
				}
			}
		}
	},

	provide() {
		return {
			uSelectGroup: this.uSelectGroup
		}
	},

	watch: {
		value: {
			immediate: true,
			handler(value) {
				if (Array.isArray(value)) {
					this.uSelectGroup.selectedList = value
				} else if (value === void 0 || value === null) {
					this.uSelectGroup.selectedList = []
				} else {
					this.uSelectGroup.selectedList = [value]
				}
			}
		},

		isDisabled: {
			immediate: true,
			handler(value) {
				this.uSelectGroup.isDisabled = value
			}
		}
	}
}
</script>

<style scoped lang="scss"></style>
