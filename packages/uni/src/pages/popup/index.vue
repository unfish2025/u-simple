<template>
	<view>
		<view>
			<view class="title">嵌入内容</view>
			<u-button @click="popupVisible = true">打开弹窗 {{ popupVisible }}</u-button>
			<u-popup :visible.sync="popupVisible">
				<view class="container" @click.stop>
					<u-input placeholder="我是输入框"></u-input>
				</view>
			</u-popup>
		</view>
		<view>
			<view class="title">中间</view>
			<u-button @click="popupVisibleCenter = true">打开弹窗 {{ popupVisibleCenter }}</u-button>
			<u-popup :visible.sync="popupVisibleCenter">
				<view class="container" @click.stop>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi cupiditate dicta deleniti soluta aspernatur, optio eum quasi nobis,
					laboriosam consequuntur enim numquam voluptate sint aperiam iste, blanditiis maxime dolores! Saepe, adipisci ullam pariatur vel
					repellendus repudiandae libero corrupti doloribus odio, veniam maiores repellat quisquam! Sit veritatis corporis, et quo ex sunt
					repudiandae vel dolorum adipisci voluptatem, iusto delectus voluptas odit magni eligendi ipsa autem quam doloremque? Rerum
					repellendus esse, voluptates libero assumenda consectetur, mollitia qui maiores, dolorum commodi dolores. Laborum quas saepe, a
					fuga ut doloribus temporibus culpa eaque eum consequuntur cupiditate ex perferendis, veritatis odio, atque earum sed? Accusamus.
				</view>
			</u-popup>
		</view>
		<view>
			<view class="title">上边</view>
			<u-button @click="popupVisibleTop = true">打开弹窗 {{ popupVisibleTop }}</u-button>
			<u-popup :visible.sync="popupVisibleTop" direction="top">
				<view class="container" @click.stop>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi cupiditate dicta deleniti soluta aspernatur, optio eum quasi nobis,
					laboriosam consequuntur enim numquam voluptate sint aperiam iste, blanditiis maxime dolores! Saepe, adipisci ullam pariatur vel
					repellendus repudiandae libero corrupti doloribus odio, veniam maiores repellat quisquam! Sit veritatis corporis, et quo ex sunt
					repudiandae vel dolorum adipisci voluptatem, iusto delectus voluptas odit magni eligendi ipsa autem quam doloremque? Rerum
					repellendus esse, voluptates libero assumenda consectetur, mollitia qui maiores, dolorum commodi dolores. Laborum quas saepe, a
					fuga ut doloribus temporibus culpa eaque eum consequuntur cupiditate ex perferendis, veritatis odio, atque earum sed? Accusamus.
				</view>
			</u-popup>
		</view>
		<view>
			<view class="title">下边</view>
			<u-button @click="popupVisibleBottom = true">打开弹窗 {{ popupVisibleBottom }}</u-button>
			<u-popup :visible.sync="popupVisibleBottom" direction="bottom">
				<view class="container" @click.stop>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi cupiditate dicta deleniti soluta aspernatur, optio eum quasi nobis,
					laboriosam consequuntur enim numquam voluptate sint aperiam iste, blanditiis maxime dolores! Saepe, adipisci ullam pariatur vel
					repellendus repudiandae libero corrupti doloribus odio, veniam maiores repellat quisquam! Sit veritatis corporis, et quo ex sunt
					repudiandae vel dolorum adipisci voluptatem, iusto delectus voluptas odit magni eligendi ipsa autem quam doloremque? Rerum
					repellendus esse, voluptates libero assumenda consectetur, mollitia qui maiores, dolorum commodi dolores. Laborum quas saepe, a
					fuga ut doloribus temporibus culpa eaque eum consequuntur cupiditate ex perferendis, veritatis odio, atque earum sed? Accusamus.
				</view>
			</u-popup>
		</view>
		<view>
			<view class="title">左边</view>
			<u-button @click="popupVisibleLeft = true">打开弹窗 {{ popupVisibleLeft }}</u-button>
			<u-popup :visible.sync="popupVisibleLeft" direction="left">
				<view class="container" @click.stop>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi cupiditate dicta deleniti soluta aspernatur, optio eum quasi nobis,
					laboriosam consequuntur enim numquam voluptate sint aperiam iste, blanditiis maxime dolores! Saepe, adipisci ullam pariatur vel
					repellendus repudiandae libero corrupti doloribus odio, veniam maiores repellat quisquam! Sit veritatis corporis, et quo ex sunt
					repudiandae vel dolorum adipisci voluptatem, iusto delectus voluptas odit magni eligendi ipsa autem quam doloremque? Rerum
					repellendus esse, voluptates libero assumenda consectetur, mollitia qui maiores, dolorum commodi dolores. Laborum quas saepe, a
					fuga ut doloribus temporibus culpa eaque eum consequuntur cupiditate ex perferendis, veritatis odio, atque earum sed? Accusamus.
				</view>
			</u-popup>
		</view>
		<view>
			<view class="title">右边</view>
			<u-button @click="popupVisibleRight = true">打开弹窗 {{ popupVisibleRight }}</u-button>
			<u-popup :visible.sync="popupVisibleRight" direction="right">
				<view class="container" @click.stop>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi cupiditate dicta deleniti soluta aspernatur, optio eum quasi nobis,
					laboriosam consequuntur enim numquam voluptate sint aperiam iste, blanditiis maxime dolores! Saepe, adipisci ullam pariatur vel
					repellendus repudiandae libero corrupti doloribus odio, veniam maiores repellat quisquam! Sit veritatis corporis, et quo ex sunt
					repudiandae vel dolorum adipisci voluptatem, iusto delectus voluptas odit magni eligendi ipsa autem quam doloremque? Rerum
					repellendus esse, voluptates libero assumenda consectetur, mollitia qui maiores, dolorum commodi dolores. Laborum quas saepe, a
					fuga ut doloribus temporibus culpa eaque eum consequuntur cupiditate ex perferendis, veritatis odio, atque earum sed? Accusamus.
				</view>
			</u-popup>
		</view>
	</view>
</template>

<script>
import Vue from 'vue'
import UMask from '@/components/u-mask/index.vue'
import UButton from '@/components/u-button/index.vue'
import UInput from '@/components/u-input/index.vue'
import UPopup from '@/components/u-popup/index.vue'
export default Vue.extend({
	components: { UMask, UButton, UInput, UPopup },
	data() {
		return {
			popupVisible: false,
			popupVisibleCenter: false,
			popupVisible3: false,
			popupVisibleTop: false,
			popupVisibleBottom: false,
			popupVisibleLeft: false,
			popupVisibleRight: false
		}
	},
	methods: {}
})
</script>

<style scoped lang="scss">
.title,
.u-button {
	margin: 10rpx;
}

.container {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 90%;
	box-sizing: border-box;
	padding: 40rpx;
	background-color: #fff;
	border-radius: 8rpx;
	max-height: 200rpx;
	overflow: auto;
	overscroll-behavior: contain;
}
</style>
