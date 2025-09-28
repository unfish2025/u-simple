<template>
	<view>
		<u-carousel v-model="value">
			<u-carousel-item class="item">Item 1</u-carousel-item>
			<u-carousel-item class="item">Item 2</u-carousel-item>
			<u-carousel-item class="item">Item 3</u-carousel-item>
		</u-carousel>
		<view> index: {{ value }} </view>
	</view>
</template>

<script>
import UCarousel from '@/components/u-carousel/index.vue'
import UCarouselItem from '@/components/u-carousel-item/index.vue'
export default {
	components: { UCarousel, UCarouselItem },
	data() {
		return {
			value: 0
		}
	},

	methods: {
		getColor() {
			const colorList = [
				'#111827',
				'#0f172a',
				'#1f2937',
				'#1e293b',
				'#0a2342',
				'#2b3945',
				'#22303c',
				'#2f3e46',
				'#264653',
				'#133e4a',
				'#183a37',
				'#2b3a2e',
				'#2f1b12',
				'#3a1d1d',
				'#3b1f2b',
				'#2c2541'
			]
			return `background-color: ${colorList[Math.floor(Math.random() * colorList.length)]};`
		}
	}
}
</script>

<style scoped lang="scss">
.item {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 600rpx;
	color: #fff;
}

.item:nth-child(1) {
	background-color: red;
}

.item:nth-child(2) {
	background-color: green;
}

.item:nth-child(3) {
	background-color: blue;
}
</style>
