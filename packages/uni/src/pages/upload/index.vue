<template>
	<view class="container">
		<view>
			<view class="title">单文件上传</view>
			<UUpload v-model="fileList1" @input="onChange"></UUpload>
		</view>
		<view>
			<view class="title">多文件上传</view>
			<UUpload v-model="fileList2" :count="3" @input="onChange"></UUpload>
		</view>
		<view>
			<view class="title">禁止操作</view>
			<UUpload v-model="fileList2" isDisabled></UUpload>
		</view>
		<view>
			<view class="title">使用原生 web 上传器多文件上传</view>
			<UUpload v-model="fileList3" isUseWebChooseFile :count="2" :webChooseFileProps="{ count: 3 }" @input="onChange"></UUpload>
		</view>
		<view>
			<view class="title">使用 count 文件上传</view>
			<UUpload v-model="fileList4" :count="3" @input="onChange"></UUpload>
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
			fileList2: [],
			fileList3: [],
			fileList4: []
		}
	},

	methods: {
		onChange(e) {
			console.log('onChange', e)
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
