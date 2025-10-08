<template>
	<view class="container">
		<view>
			<view class="title">单图片上传</view>
			<UUploadImage v-model="fileList1" @input="onChange"></UUploadImage>
		</view>
		<view>
			<view class="title">多图片上传</view>
			<UUploadImage v-model="fileList2" :count="3" @input="onChange"></UUploadImage>
		</view>
		<view>
			<view class="title">禁止操作</view>
			<UUploadImage v-model="fileList2" :count="3" isDisabled @input="onChange"></UUploadImage>
		</view>
		<view>
			<view class="title">到达上限不展示上传控件</view>
			<UUploadImage v-model="fileList3" :isMaxCountShowUpload="false" @input="onChange"></UUploadImage>
		</view>
		<view>
			<view class="title">从相册选图</view>
			<UUploadImage v-model="fileList4" :count="3" @input="onChange" :sourceType="['album']"></UUploadImage>
		</view>
		<view>
			<view class="title">使用相机</view>
			<UUploadImage v-model="fileList5" :count="3" @input="onChange" :sourceType="['camera']"></UUploadImage>
		</view>
		<view>
			<view class="title">web 原生input 控件, 到达上限不展示上传控件</view>
			<UUploadImage v-model="fileList6" :isMaxCountShowUpload="false" isUseWebChooseFile @input="onChange"></UUploadImage>
		</view>
		<view>
			<view class="title">web 原生input 控件, 从相册选图</view>
			<UUploadImage v-model="fileList7" :count="3" isUseWebChooseFile :sourceType="['album']" @input="onChange"></UUploadImage>
		</view>
		<view>
			<view class="title">web 原生input 控件, 使用相机</view>
			<UUploadImage v-model="fileList8" :count="3" isUseWebChooseFile :sourceType="['camera']" @input="onChange"></UUploadImage>
		</view>
		<view>
			<view class="title">微信小程序使用聊天会话选择</view>
			<UUploadImage v-model="fileList9" :count="3" isUseWxChooseMessageFile @input="onChange"></UUploadImage>
		</view>
	</view>
</template>

<script>
import UUploadImage from '@/components/u-upload-image/index.vue'
export default {
	components: { UUploadImage },
	data() {
		return {
			fileList1: [],
			fileList2: [],
			fileList3: [],
			fileList4: [],
			fileList5: [],
			fileList6: [],
			fileList7: [],
			fileList8: [],
			fileList9: []
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
