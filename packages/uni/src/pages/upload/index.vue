<template>
	<view class="container">
		<view>
			<view class="title">单文件上传</view>
			<UUpload v-model="fileList1"></UUpload>
		</view>
		<view>
			<view class="title">多文件上传</view>
			<UUpload v-model="fileList2" :limit="10" isWebMultiple></UUpload>
		</view>
		<view>
			<view class="title">禁止操作</view>
			<UUpload v-model="fileList2" :limit="10" isWebMultiple isDisabled></UUpload>
		</view>
	</view>
</template>

<script>
import UUpload from '@/components/u-upload/index.vue'
export default {
	components: { UUpload },
	data() {
		return {
			fileList1: [],
			fileList2: []
		}
	}
}
</script>

<style scoped lang="scss">
.container {
	padding: 20rpx;
}

.title {
	padding: 20rpx 0;
}
</style>
