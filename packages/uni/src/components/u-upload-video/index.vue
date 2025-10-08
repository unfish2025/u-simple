<template>
	<view ref="uUpload" class="u-base u-border-box u-upload-video">
		<view class="u-upload-video-list-item u-border-box" v-for="(it, i) in value" :key="it.uuid" @click="priview(it, i)">
			<slot name="item" :item="it" :index="i">
				<video :src="it.url" class="u-upload-video-item-content-video" @error="$emit('error', $event)" @load="$emit('load', $event)"></video>
			</slot>
			<slot name="remove" :item="it" :index="i">
				<view
					v-if="!isDisabled || isDisabledShowRemoveIcon"
					class="u-iconfont icon-close u-upload-video-remove-icon"
					:class="{ 'u-upload-video-is-disabled': isDisabled, 'u-upload-video-is-active': !isDisabled }"
					@click="removeFile(it, i)"
				></view>
			</slot>
		</view>
		<slot :chooseFile="chooseFile" :list="value" v-if="computedIsShow">
			<view
				class="u-upload-video-add-container u-border-box"
				:class="{ 'u-upload-video-is-disabled': !allowOperate, 'u-upload-video-is-active': allowOperate }"
				@click="chooseFile"
			>
				<view class="u-iconfont icon-album"></view>
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

		/** 是否开启图片预览, 默认为 true */
		isPriview: {
			type: Boolean,
			default: true
		},

		/** 图片预览配置项, 具体参考 uniapp uni.previewImage 接口 */
		priviewProps: {
			type: Object,
			default() {
				return {}
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

		/** 使用微信聊天会话选择文件时的配置项(仅支持微信) */
		wxMessageChooseFileProps: {
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

		/** 是否使用微信聊天会话选择文件, 默认为 false, 使用 uni-app 选择文件 */
		isUseWxChooseMessageFile: {
			type: Boolean,
			default: false
		},

		/** 上传文件数量限制, 该配置将成为 webChooseFileProps|uniChooseFileProps|wxChooseFileProps 的 count 默认配置, 默认为 1 */
		count: {
			type: Number,
			default: 1
		},

		/** album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项, 使用该配置后将自动转换为 webChooseFileProps 支持的 capture */
		sourceType: {
			type: Array,
			default() {
				return ['album', 'camera']
			}
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
			// #ifdef WEB
			tempUrlList: []
			// #endif
		}
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
			if (this.isUseWxChooseMessageFile) {
				surplus = (this.wxMessageChooseFileProps.count ?? this.count ?? 1) - this.value.length
			} else {
				surplus = (this.uniChooseFileProps.count ?? this.count ?? 1) - this.value.length
			}
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
			if (!this.isPriview) {
				return
			}

			uni.previewImage({
				urls: this.value.map((item) => item.url),
				current: it.url
			})
		},

		// #ifdef WEB
		async onWebFileChange(fileList) {
			let files = await Promise.all(
				fileList.map(async (fileInfo) => {
					return {
						...fileInfo,
						uuid: createUUID(),
						url: fileInfo.file.path ? fileInfo.file.path : URL.createObjectURL(new Blob([fileInfo.file], { type: fileInfo.file.type })),
						arrayBuffer: this.immediateGetArrayBuffer ? await fileInfo.file.arrayBuffer() : null
					}
				})
			)
			files.forEach((it) => this.tempUrlList.push(it.url))
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

			this.clearTempUrl([...this.value, ...files])
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
						url: file.path,
						size: file.size,
						type: file.type ?? this.wxMessageChooseFileProps.type ?? 'image',
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

		/** 选择文件 */
		async chooseFile() {
			if (!this.allowOperate) return
			// #ifdef WEB
			if (this.isUseWebChooseFile) {
				/** @type {import('@/utils/chooseFile/types').ChooseFileOptions['capture']} */
				let capture = void 0
				if (this.sourceType.includes('album') && this.sourceType.includes('camera')) {
					capture = void 0
				} else if (this.sourceType.includes('album')) {
					capture = void 0
				} else if (this.sourceType.includes('camera')) {
					capture = 'environment'
				} else {
					capture = void 0
				}
				const files = await webChooseFile.chooseFile({
					capture,
					...this.webChooseFileProps,
					count: this.surplus,
					accept: 'image/*',
					packFile: true
				})
				this.onWebFileChange(files)
			} else {
				uni.chooseImage({
					sourceType: this.sourceType,
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
			if (this.isUseWxChooseMessageFile) {
				wx.chooseMessageFile({
					type: 'image',
					...this.wxMessageChooseFileProps,
					count: this.surplus,
					success: (res) => {
						if (this.wxMessageChooseFileProps.success) {
							this.wxMessageChooseFileProps.success(res)
						}
						this.onWxFileChange(res)
					}
				})
			} else {
				uni.chooseImage({
					sourceType: this.sourceType,
					...this.uniChooseFileProps,
					count: this.surplus,
					success: (res) => {
						if (this.uniChooseFileProps.success) {
							this.uniChooseFileProps.success(res)
						}
						this.onWxFileChange(res)
					}
				})
			}
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
		},

		// #ifdef WEB
		clearTempUrl(relativeValue = this.value) {
			const waitClearUrlList = []
			this.tempUrlList.forEach((url) => {
				if (!relativeValue.find((item) => item.url === url)) {
					waitClearUrlList.push(url)
				}
			})
			waitClearUrlList.forEach((url) => {
				URL.revokeObjectURL(url)
			})
			this.tempUrlList = this.tempUrlList.filter((url) => !waitClearUrlList.includes(url))
		}
		// #endif
	},

	beforeDestroy() {
		// #ifdef WEB
		this.clearTempUrl()
		// #endif
	},

	watch: {
		// #ifdef WEB
		value: {
			immediate: true,
			deep: true,
			handler() {
				this.clearTempUrl()
			}
		}
		// #endif
	}
}
</script>

<style scoped lang="scss">
.u-upload-video {
	--u-upload-video-width: 160rpx;
	--u-upload-video-height: 160rpx;
	--u-upload-video-add-icon-font-size: 60rpx;
	--u-upload-video-gap: 10rpx;
	--u-upload-border-radius: 6rpx;
	--u-upload-border-remove-icon-width: 28rpx;
	--u-upload-border-remove-icon-height: 28rpx;
	--u-upload-border-remove-icon-border-radius: 0 0 0 24rpx;
	--u-upload-border-remove-icon-font-size: 20rpx;
	display: flex;
	flex-wrap: wrap;
	gap: var(--u-upload-video-gap);
}

.u-upload-video-add-container {
	display: flex;
	justify-content: center;
	align-items: center;
	width: var(--u-upload-video-width);
	height: var(--u-upload-video-height);
	border: 1px dashed var(--u-placeholder-color);
	border-radius: var(--u-upload-border-radius);
	font-size: var(--u-upload-video-add-icon-font-size);
	color: var(--u-placeholder-color);
	cursor: pointer;
	transition: color 0.2s, border-color 0.2s;

	&.u-upload-video-is-active:active {
		border-color: var(--u-primary-color);
		color: var(--u-primary-color);
	}

	&.u-upload-video-is-disabled {
		opacity: 0.6;
		cursor: not-allowed;
		background-color: var(--u-disabled-bg-color);
	}
}

.u-upload-video-list-item {
	position: relative;
	width: var(--u-upload-video-width);
	height: var(--u-upload-video-height);
	border: 1px solid var(--u-placeholder-color);
	border-radius: var(--u-upload-border-radius);
	overflow: hidden;
}

.u-upload-video-item-content-image {
	width: 100%;
	height: 100%;
	display: block;
}

.u-upload-video-remove-icon {
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	width: var(--u-upload-border-remove-icon-width);
	height: var(--u-upload-border-remove-icon-height);
	background-color: rgba(0, 0, 0, 0.6);
	border-radius: var(--u-upload-border-remove-icon-border-radius);
	font-size: var(--u-upload-border-remove-icon-font-size);
	cursor: pointer;
	color: #fff;

	&.u-upload-video-is-active:active {
		color: var(--u-danger-color);
	}

	&.u-upload-video-is-disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
}
</style>
