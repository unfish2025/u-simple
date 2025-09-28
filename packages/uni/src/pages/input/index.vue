<template>
	<view>
		<view>
			<view class="title">输入类型</view>
			<u-input v-model="textValue" type="password" placeholder="密码类型" />
			<u-input v-model="textValue" placeholder="文本类型" />
			<view>{{ textValue }}</view>
		</view>
		<view>
			<view class="title">禁用状态</view>
			<u-input placeholder="请输入" />
			<u-input is-disabled placeholder="请输入" />
		</view>
	</view>
</template>

<script>
import Vue from 'vue'
import UInput from '@/components/u-input/index.vue'
export default Vue.extend({
	components: { UInput },
	data() {
		return {
			textValue: ''
		}
	},
	methods: {}
})
</script>

<style scoped lang="scss">
.title,
.u-input {
	margin: 10rpx;
}
</style>
