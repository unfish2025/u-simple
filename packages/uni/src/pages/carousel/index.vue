<template>
	<view>
		<view class="container">
			<view> 默认: {{ value }} </view>
			<u-carousel v-model="value">
				<u-carousel-item class="item">Item 1</u-carousel-item>
				<u-carousel-item class="item">Item 2</u-carousel-item>
				<u-carousel-item class="item">Item 3</u-carousel-item>
			</u-carousel>
		</view>
		<view class="container">
			<view> 无缝: {{ value }} </view>
			<u-carousel v-model="value" isLoop>
				<u-carousel-item class="item">Item 1</u-carousel-item>
				<u-carousel-item class="item">Item 2</u-carousel-item>
				<u-carousel-item class="item">Item 3</u-carousel-item>
			</u-carousel>
		</view>
		<view class="container">
			<view> 禁用 {{ value }}</view>
			<u-carousel v-model="value" isDisabled>
				<template #default>
					<u-carousel-item class="item">Item 1</u-carousel-item>
					<u-carousel-item class="item">Item 2</u-carousel-item>
					<u-carousel-item class="item">Item 3</u-carousel-item>
				</template>
			</u-carousel>
		</view>
		<view class="container">
			<u-carousel v-model="value">
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
	options: {
		styleIsolation: 'shared'
	},
	components: { UCarousel, UCarouselItem },
	data() {
		return {
			value: 0
		}
	}
}
</script>

<style lang="scss">
.item {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 600rpx;
	color: #fff;
	// 编译成小程序, 小程序自身问题, 所以需要样式穿透, web 端是不需要的
	::v-deep {
		.u-carousel-item {
			width: 750rpx !important;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}

// 编译成小程序, 小程序自身问题, 所以需要样式穿透, web 端是不需要的
.item:nth-child(1) {
	::v-deep {
		.u-carousel-item {
			background-color: red;
		}
	}
}

.item:nth-child(2) {
	::v-deep {
		.u-carousel-item {
			background-color: green;
		}
	}
}

.item:nth-child(3) {
	::v-deep {
		.u-carousel-item {
			background-color: blue;
		}
	}
}

.container {
	margin-bottom: 20rpx;
}
</style>
