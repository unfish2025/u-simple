<template>
	<view>
		<view>
			<view class="title">按钮类型</view>
			<u-button type="primary">主要按钮</u-button>
			<u-button type="success">成功按钮</u-button>
			<u-button type="danger">危险按钮</u-button>
			<u-button type="warning">警告按钮</u-button>
			<u-button type="info">信息按钮</u-button>
			<u-button type="#008c8c">自定义按钮</u-button>
		</view>
		<view>
			<view class="title">禁用状态</view>
			<u-button @click="log('正常按钮')">正常按钮</u-button>
			<u-button @click="log('禁用按钮')" isDisabled>禁用按钮</u-button>
		</view>
		<view>
			<view>不同尺寸</view>
			<u-button size="large">large</u-button>
			<u-button size="normal">normal</u-button>
			<u-button size="small">small</u-button>
			<u-button size="mini">mini</u-button>
		</view>
		<view>
			<view class="title">朴素按钮</view>
			<u-button isPlain type="primary">主要按钮</u-button>
			<u-button isPlain type="success">成功按钮</u-button>
			<u-button isPlain type="danger">危险按钮</u-button>
			<u-button isPlain type="warning">警告按钮</u-button>
			<u-button isPlain type="info">信息按钮</u-button>
			<u-button isPlain type="#008c8c">自定义按钮</u-button>
		</view>
	</view>
</template>

<script>
import Vue from 'vue'
import UButton from '@/components/u-button/index.vue'
export default Vue.extend({
	components: { UButton },
	data() {
		return {}
	},
	methods: {
		log(msg) {
			uni.showToast({
				title: msg
			})
		}
	}
})
</script>

<style lang="scss">
.title,
.u-button {
	margin: 10rpx;
}
</style>
