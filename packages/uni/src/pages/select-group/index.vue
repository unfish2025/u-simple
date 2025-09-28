<template>
	<view>
		<view>
			<view class="title">单选</view>
			<view class="result">结果: {{ list1Result }}</view>
			<u-select-group v-model="list1Result">
				<u-select-item v-for="item in list1" :key="item.id" :value="item.id">{{ item.name }}</u-select-item>
			</u-select-group>
		</view>
		<view>
			<view class="title">多选</view>
			<view class="result">结果: {{ list2Result }}</view>
			<u-select-group is-multiple v-model="list2Result">
				<u-select-item v-for="item in list2" :key="item.id" :value="item.id">{{ item.name }}</u-select-item>
			</u-select-group>
		</view>
		<view>
			<view class="title">组禁用</view>
			<u-select-group is-disabled>
				<u-select-item v-for="item in list1" :key="item.id" :value="item.id">{{ item.name }}</u-select-item>
			</u-select-group>
		</view>
		<view>
			<view class="title">选项禁用</view>
			<u-select-group>
				<u-select-item v-for="item in list2" :key="item.id" :value="item.id" :isDisabled="item.isDisabled">{{ item.name }}</u-select-item>
			</u-select-group>
		</view>
	</view>
</template>

<script>
import Vue from 'vue'
import uSelectGroup from '@/components/u-select-group/index.vue'
import USelectItem from '@/components/u-select-item/index.vue'
export default Vue.extend({
	components: { USelectItem, uSelectGroup },
	data() {
		return {
			list1Result: 1,
			list2Result: [2],
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

<style scoped lang="scss">
.title,
.result {
	margin: 10rpx;
}
</style>
