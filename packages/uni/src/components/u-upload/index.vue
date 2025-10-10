<template>
	<view ref="uUpload" class="u-base u-border-box u-upload">
		<slot :chooseFile="chooseFile" :list="value" v-if="computedIsShow">
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
				<view class="u-upload-list-item u-border-box" v-for="(it, i) in value" :key="it.uuid" @click="priview(it, i)">
					<slot name="item" :item="it" :index="i">
						<view class="u-upload-item-content">{{ it.filename }}</view>
					</slot>
					<slot name="remove" :item="it" :index="i">
						<view
							v-if="!isDisabled || isDisabledShowRemoveIcon"
							class="u-iconfont icon-delete u-upload-remove-icon"
							:class="{ 'u-upload-is-disabled': isDisabled, 'u-upload-is-active': !isDisabled }"
							@click.stop.prevent="removeFile(it, i)"
						></view>
					</slot>
				</view>
			</view>
		</slot>
	</view>
</template>

<script>
import { createUUID, Path, WebChooseFile } from '@/utils'
const path = new Path()
// #ifdef WEB
const webChooseFile = new WebChooseFile()
// #endif
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

		/** 使用 web 原生 input 选择文件时的配置项(仅支持 web) */
		webChooseFileProps: {
			type: Object,
			default() {
				return {}
			}
		},

		/** 使用 uni-app 选择文件时的配置项(仅支持 web) */
		uniChooseFileProps: {
			type: Object,
			default() {
				return {}
			}
		},

		/** 使用微信选择文件时的配置项(仅支持微信) */
		wxChooseFileProps: {
			type: Object,
			default() {
				return {}
			}
		},

		/** 是否使用 web 原生 input 选择文件, 默认为 false, 使用 uni-app 选择文件 */
		isUseWebChooseFile: {
			type: Boolean,
			default: false
		},

		/** 上传文件数量限制, 该配置将成为 webChooseFileProps|uniChooseFileProps|wxChooseFileProps 的 count 默认配置, 默认为 1 */
		count: {
			type: Number,
			default: 1
		},

		/** 文件到达最大上限时是否显示上传控件, 默认为 true */
		isMaxCountShowUpload: {
			type: Boolean,
			default: true
		},

		/** 是否在选择文件后立即获取文件的 ArrayBuffer 数据, 默认为 false */
		immediateGetArrayBuffer: {
			type: Boolean,
			default: false
		},

		/** 文件过滤钩子函数, 返回值将作为选择的结果 */
		filter: {
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
		return {}
	},

	computed: {
		/** 剩余可选择数 */
		surplus() {
			let surplus = 0
			// #ifdef WEB
			if (this.isUseWebChooseFile) {
				surplus = (this.webChooseFileProps.count ?? this.count ?? 1) - this.value.length
			} else {
				surplus = (this.uniChooseFileProps.count ?? this.count ?? 1) - this.value.length
			}
			// #endif
			// #ifdef MP-WEIXIN
			surplus = (this.wxChooseFileProps.count ?? this.count ?? 1) - this.value.length
			// #endif
			return surplus
		},

		allowOperate() {
			return !this.isDisabled && this.surplus > 0
		},

		computedIsShow() {
			if (this.value.length < this.surplus) {
				return true
			}
			return this.isMaxCountShowUpload
		}
	},

	methods: {
		priview(it, i) {
			this.$emit('priview', it, i)
		},

		// #ifdef WEB
		async onWebFileChange(fileList) {
			let files = await Promise.all(
				fileList.map(async (fileInfo) => {
					return {
						...fileInfo,
						uuid: createUUID(),
						arrayBuffer: this.immediateGetArrayBuffer ? await fileInfo.file.arrayBuffer() : null
					}
				})
			)
			if (this.filter) {
				const result = await this.filter(files)
				if (!Array.isArray(result)) {
					throw new Error('filter 方法必须返回一个数组')
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
				originFiles.slice(0, this.surplus).map(async (file) => {
					const { ext, filename } = path.getNameInfo(file.name ?? file.path ?? '')
					return {
						uuid: createUUID(),
						file,
						ext,
						filename,
						size: file.size,
						type: file.type ?? this.wxChooseFileProps.type ?? 'all',
						arrayBuffer: this.immediateGetArrayBuffer ? await this.wxReadFileAsArrayBuffer(file.path) : null
					}
				})
			)
			if (this.filter) {
				const result = await this.filter(files)
				if (!Array.isArray(result)) {
					throw new Error('filter 方法必须返回一个数组')
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

		/** 选择文件 */
		async chooseFile() {
			if (!this.allowOperate) return
			// #ifdef WEB
			if (this.isUseWebChooseFile) {
				const files = await webChooseFile.chooseFile({
					...this.webChooseFileProps,
					count: this.surplus,
					packFile: true
				})
				this.onWebFileChange(files)
			} else {
				uni.chooseFile({
					...this.uniChooseFileProps,
					count: this.surplus,
					success: (res) => {
						if (this.uniChooseFileProps.success) {
							this.uniChooseFileProps.success(res)
						}

						this.onWebFileChange(res.tempFiles.slice(0, this.surplus).map((it) => webChooseFile.packFile(it)))
					}
				})
			}
			// #endif
			// #ifdef MP-WEIXIN
			wx.chooseMessageFile({
				type: 'all',
				...this.wxChooseFileProps,
				count: this.surplus,
				success: (res) => {
					if (this.wxChooseFileProps.success) {
						this.wxChooseFileProps.success(res)
					}
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
