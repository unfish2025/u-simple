<template>
	<view ref="uUpload" class="u-base u-border-box u-upload">
		<slot :chooseFile="chooseFile" :list="value">
			<view
				class="u-upload-add-container u-border-box"
				:class="{ 'u-upload-is-disabled': !allowOperate, 'u-upload-is-active': allowOperate }"
				@click="chooseFile"
			>
				<view class="u-iconfont icon-upload"></view>
			</view>
		</slot>
		<slot name="list" :list="value">
			<view class="u-upload-list-container u-border-box">
				<view class="u-upload-list-item u-border-box" v-for="(it, i) in value" :key="it.uuid">
					<slot name="item" :item="it" :index="i">
						<view class="u-upload-item-content">{{ it.filename }}</view>
					</slot>
					<slot name="remove" :item="it" :index="i">
						<view
							v-if="!isDisabled || isDisabledShowRemoveIcon"
							class="u-iconfont icon-delete u-upload-remove-icon"
							:class="{ 'u-upload-is-disabled': isDisabled, 'u-upload-is-active': !isDisabled }"
							@click="removeFile(it, i)"
						></view>
					</slot>
				</view>
			</view>
		</slot>
	</view>
</template>

<script>
import { createUUID, Path } from '@/utils'
const path = new Path()
export default {
	/** 兼容 uniapp bug v-model 只能为 input 和 value */
	model: {
		prop: 'value',
		event: 'input'
	},

	props: {
		/** 上传文件列表, 每一项是一个对象, 应包含 uuid, file, ext, filename, arrayBuffer 等字段 */
		value: {
			type: Array,
			default() {
				return []
			}
		},

		/** 上传文件数量限制, 默认为 1 */
		limit: {
			type: Number,
			default: 1
		},

		/** web 端文件是否支持多选, 默认为 false */
		isWebMultiple: {
			type: Boolean,
			default: false
		},

		/** web 端文件类型限制, 默认为空字符串 */
		webAccept: {
			type: String,
			default: ''
		},

		/** 微信小程序端文件类型限制, 默认为空数组 */
		wxAllowExt: {
			type: Array,
			default() {
				return []
			}
		},

		/** 是否在选择文件后立即获取文件的 ArrayBuffer 数据, 默认为 false */
		immediateGetArrayBuffer: {
			type: Boolean,
			default: false
		},

		/** 选择文件钩子函数, 返回值将作为选择的结果 */
		choose: {
			type: Function
		},

		/** 上传文件钩子函数, 返回值将作为结果 */
		upload: {
			type: Function
		},

		/** 移除文件钩子函数, 返回 true/false 决定是否移除 */
		remove: {
			type: Function
		},

		/** 是否禁用上传功能, 默认为 false */
		isDisabled: {
			type: Boolean,
			default: false
		},

		/** 是否在禁用时显示移除图标, 默认为 false */
		isDisabledShowRemoveIcon: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
			input: null
		}
	},

	computed: {
		allowOperate() {
			return !this.isDisabled && this.value.length < this.limit
		}
	},

	methods: {
		// #ifdef WEB
		async onWebFileChange(e) {
			const originFiles = e.target.files ? Array.from(e.target.files) : []
			this.input.value = null
			let files = await Promise.all(
				originFiles.slice(0, this.limit - this.value.length).map(async (file) => {
					const { ext, filename } = path.getNameInfo(file.name)
					return {
						uuid: createUUID(),
						file,
						ext,
						filename,
						arrayBuffer: this.immediateGetArrayBuffer ? await file.arrayBuffer() : null
					}
				})
			)
			if (this.choose) {
				const result = await this.choose(files)
				if (!Array.isArray(result)) {
					throw new Error('choose 方法必须返回一个数组')
				}
				files = result
			}
			if (this.upload) {
				const result = await this.upload(files)
				if (!Array.isArray(result)) {
					throw new Error('upload 方法必须返回一个数组')
				}
				files = result
			}

			this.$emit('input', [...this.value, ...files])
		},
		// #endif

		// #ifdef MP-WEIXIN
		wxReadFileAsArrayBuffer(path) {
			return new Promise((resolve, reject) => {
				fs.readFile({
					filePath: path,
					encoding: null,
					success: (res) => resolve(res.data),
					fail: reject
				})
			})
		},

		async onWxFileChange(res) {
			const originFiles = res.tempFiles
			let files = await Promise.all(
				originFiles.slice(0, this.limit - this.value.length).map(async (file) => {
					const { ext, filename } = path.getNameInfo(file.name)
					return {
						uuid: createUUID(),
						file,
						ext,
						filename,
						arrayBuffer: this.immediateGetArrayBuffer ? await this.wxReadFileAsArrayBuffer(file.path) : null
					}
				})
			)
			if (this.choose) {
				const result = await this.choose(files)
				if (!Array.isArray(result)) {
					throw new Error('choose 方法必须返回一个数组')
				}
				files = result
			}
			if (this.upload) {
				const result = await this.upload(files)
				if (!Array.isArray(result)) {
					throw new Error('upload 方法必须返回一个数组')
				}
				files = result
			}

			this.$emit('input', [...this.value, ...files])
		},
		// #endif

		async chooseFile() {
			if (!this.allowOperate) return
			// #ifdef WEB
			this.input.click()
			// #endif
			// #ifdef MP-WEIXIN
			const tempFiles = wx.chooseMessageFile({
				count: this.limit - this.value.length,
				type: 'all',
				extension: this.wxAllowExt.length ? this.wxAllowExt : void 0,
				success: (res) => {
					this.onWxFileChange(res)
				}
			})
			// #endif
		},

		removeFile(item, index) {
			if (this.isDisabled) return
			if (this.remove) {
				const result = this.remove(item, index, this.value)
				if (!result) {
					return
				}
			}
			this.$emit(
				'input',
				this.value.filter((_, i) => i !== index)
			)
		}
	},

	mounted() {
		// #ifdef WEB
		const input = document.createElement('input')
		input.type = 'file'
		input.style.display = 'none'
		this.input = input
		input.accept = this.webAccept
		input.multiple = this.isWebMultiple
		input.addEventListener('change', this.onWebFileChange.bind(this))
		this.$refs.uUpload.$el.appendChild(input)
		// #endif
	},

	watch: {
		// #ifdef WEB
		isWebMultiple(value) {
			this.input.multiple = value
		},

		webAccept(value) {
			this.input.accept = value
		}
		// #endif
	}
}
</script>

<style scoped lang="scss">
.u-upload {
	--u-upload-height: 160rpx;
	--u-upload-add-icon-font-size: 60rpx;
}

.u-upload-add-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: var(--u-upload-height);
	border: 1px dashed var(--u-placeholder-color);
	border-radius: 6rpx;
	font-size: var(--u-upload-add-icon-font-size);
	color: var(--u-placeholder-color);
	cursor: pointer;
	transition: color 0.2s, border-color 0.2s;

	&.u-upload-is-active:active {
		border-color: var(--u-primary-color);
		color: var(--u-primary-color);
	}

	&.u-upload-is-disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background-color: var(--u-disabled-bg-color);
	}
}

.u-upload-list-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
	border-bottom: 1px solid var(--u-placeholder-color);
	border-left: 1px solid var(--u-placeholder-color);
	border-right: 1px solid var(--u-placeholder-color);

	&:first-child {
		margin-top: 10rpx;
		border-top: 1px solid var(--u-placeholder-color);
		border-top-left-radius: 6rpx;
		border-top-right-radius: 6rpx;
	}

	&:last-child {
		border-bottom-left-radius: 6rpx;
		border-bottom-right-radius: 6rpx;
	}
}

.u-upload-item-content {
	flex: 1;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

.u-upload-remove-icon {
	cursor: pointer;

	&.u-upload-is-active:active {
		color: var(--u-danger-color);
	}

	&.u-upload-is-disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
}
</style>
