<template>
	<view>
		<u-button class="btn" type="primary" @click="visible = true">预览视频</u-button>
		<u-priview-video
			:visible.sync="visible"
			v-model="index"
			:urls="['https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4']"
		></u-priview-video>
	</view>
</template>

<script>
import UButton from '@/components/u-button/index.vue'
import UPriviewVideo from '@/components/u-priview-video/index.vue'
export default {
	components: { UButton, UPriviewVideo },
	data() {
		return {
			visible: false,
			index: 0
		}
	}
}
</script>

<style scoped lang="scss">
.btn {
	margin: 20px;
}
</style>
