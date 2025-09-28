<template>
	<view>
		<view>
			<view class="title">基础使用</view>
			<u-button @click="maskVisible1 = true">打开遮罩 {{ maskVisible1 }}</u-button>
			<u-mask :visible.sync="maskVisible1"></u-mask>
		</view>
		<view>
			<view class="title">嵌入内容</view>
			<u-button @click="maskVisible2 = true">打开遮罩 {{ maskVisible2 }}</u-button>
			<u-mask :visible.sync="maskVisible2">
				<view class="container" @click.stop>
					<u-input placeholder="我是输入框"></u-input>
				</view>
			</u-mask>
		</view>
		<view>
			<view class="title">内容滚动</view>
			<u-button @click="maskVisible3 = true">打开遮罩 {{ maskVisible3 }}</u-button>
			<u-mask :visible.sync="maskVisible3">
				<view class="container" @click.stop>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi cupiditate dicta deleniti soluta aspernatur, optio eum quasi nobis,
					laboriosam consequuntur enim numquam voluptate sint aperiam iste, blanditiis maxime dolores! Saepe, adipisci ullam pariatur vel
					repellendus repudiandae libero corrupti doloribus odio, veniam maiores repellat quisquam! Sit veritatis corporis, et quo ex sunt
					repudiandae vel dolorum adipisci voluptatem, iusto delectus voluptas odit magni eligendi ipsa autem quam doloremque? Rerum
					repellendus esse, voluptates libero assumenda consectetur, mollitia qui maiores, dolorum commodi dolores. Laborum quas saepe, a
					fuga ut doloribus temporibus culpa eaque eum consequuntur cupiditate ex perferendis, veritatis odio, atque earum sed? Accusamus.
				</view>
			</u-mask>
		</view>
	</view>
</template>

<script>
import Vue from 'vue'
import UMask from '@/components/u-mask/index.vue'
import UButton from '@/components/u-button/index.vue'
import UInput from '@/components/u-input/index.vue'
export default Vue.extend({
	components: { UMask, UButton, UInput },
	data() {
		return {
			maskVisible1: false,
			maskVisible2: false,
			maskVisible3: false
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
}
</style>
