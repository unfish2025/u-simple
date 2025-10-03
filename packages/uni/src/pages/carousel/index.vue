<template>
	<view>
		<view>
			<view> index: {{ value }} </view>
			<u-carousel v-model="value" isLoop>
				<u-carousel-item class="item">Item 1</u-carousel-item>
				<u-carousel-item class="item">Item 2</u-carousel-item>
				<u-carousel-item class="item">Item 3</u-carousel-item>
			</u-carousel>
		</view>
		<view>
			<view> index: {{ value }} </view>
			<u-carousel v-model="value" isLoop>
				<template #default>
					<u-carousel-item class="item">Item 1</u-carousel-item>
					<u-carousel-item class="item">Item 2</u-carousel-item>
					<u-carousel-item class="item">Item 3</u-carousel-item>
				</template>
				<template #other>
					<view>other slot</view>
				</template>
			</u-carousel>
		</view>
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
