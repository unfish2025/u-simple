<template>
	<view>
		<u-button @click="toButton" :is-border-radius="false">按钮组件</u-button>
		<u-button @click="toInput" :is-border-radius="false">输入框组件</u-button>
		<u-button @click="toMask" :is-border-radius="false">遮罩组件</u-button>
		<u-button @click="toPopup" :is-border-radius="false">弹窗组件</u-button>
		<u-button @click="toSelectItem" :is-border-radius="false">选择项组件</u-button>
		<u-button @click="toSelectGroup" :is-border-radius="false">选择组组件</u-button>
		<u-button @click="toCarousel" :is-border-radius="false">轮播组件</u-button>
		<u-button @click="toUpload" :is-border-radius="false">文件上传组件</u-button>
		<u-button @click="toUploadImage" :is-border-radius="false">图片上传组件</u-button>
	</view>
</template>

<script>
import Vue from 'vue'
import UButton from '@/components/u-button'
export default Vue.extend({
	components: { UButton },
	data() {
		return {}
	},

	methods: {
		toButton() {
			uni.navigateTo({
				url: '/pages/button/index'
			})
		},

		toInput() {
			uni.navigateTo({
				url: '/pages/input/index'
			})
		},

		toMask() {
			uni.navigateTo({
				url: '/pages/mask/index'
			})
		},

		toPopup() {
			uni.navigateTo({
				url: '/pages/popup/index'
			})
		},

		toSelectItem() {
			uni.navigateTo({
				url: '/pages/select-item/index'
			})
		},

		toSelectGroup() {
			uni.navigateTo({
				url: '/pages/select-group/index'
			})
		},

		toCarousel() {
			uni.navigateTo({
				url: '/pages/carousel/index'
			})
		},

		toUpload() {
			uni.navigateTo({
				url: '/pages/upload/index'
			})
		},

		toUploadImage() {
			uni.navigateTo({
				url: '/pages/upload-image/index'
			})
		}
	}
})
</script>

<style lang="scss">
.u-button {
	width: 750rpx;
	margin-bottom: 20rpx;
}
</style>
