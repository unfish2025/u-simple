<template>
	<view>
		<view>
			<view class="title">基础使用</view>
			<u-select-item v-for="item in list1" :key="item.id" v-model="item.value">{{ item.name }}</u-select-item>
		</view>
		<view>
			<view class="title">禁用</view>
			<u-select-item v-for="item in list2" :key="item.id" v-model="item.value" :isDisabled="item.isDisabled">
				{{ item.name }}
			</u-select-item>
		</view>
	</view>
</template>

<script>
import Vue from 'vue'
import USelectItem from '@/components/u-select-item/index.vue'
export default Vue.extend({
	components: { USelectItem },
	data() {
		return {
			list1: [
				{ id: 1, name: '选项1', value: false },
				{ id: 2, name: '选项2', value: false },
				{ id: 3, name: '选项3', value: false }
			],
			list2: [
				{ id: 1, name: '选项1', value: false },
				{ id: 2, name: '禁用', value: false, isDisabled: true }
			]
		}
	},
	methods: {}
})
</script>

<style lang="scss">
.title {
	margin: 10rpx;
}
</style>
