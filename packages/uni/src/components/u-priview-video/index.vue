<template>
	<view class="u-base u-border-box u-priview-video">
		<u-popup
			:visible="visible"
			:isClickClose="popupConfig.isClickClose"
			:direction="popupConfig.direction"
			:zIndex="popupConfig.zIndex"
			:isAnimation="popupConfig.isAnimation"
			:duration="popupConfig.duration"
			:timingFunction="popupConfig.timingFunction"
			:delay="popupConfig.delay"
			:maskProps="popupConfig.maskProps"
			@update:visible="$emit('update:visible', $event)"
			@maskOpen="$emit('maskOpen', $event)"
			@maskOpened="$emit('maskOpened', $event)"
			@maskClose="$emit('maskClose', $event)"
			@maskClosed="$emit('maskClosed', $event)"
			@maskAnimationend="$emit('maskAnimationend', $event)"
			@open="$emit('popupOpen', $event)"
			@opened="$emit('popupOpened', $event)"
			@close="$emit('popupClose', $event)"
			@closed="$emit('popupClosed', $event)"
			@popupAnimationend="$emit('popupAnimationend', $event)"
			@click="$emit('popupClick', $event)"
		>
			<u-carousel
				:threshold="carouselConfig.threshold"
				:isTransition="carouselConfig.isTransition"
				:isLoop="carouselConfig.isLoop"
				:duration="carouselConfig.duration"
				:isDisabled="carouselConfig.isDisabled"
				:value="value"
				@input="$emit('input', $event)"
				class="u-priview-video-carousel"
			>
				<u-carousel-item class="u-priview-video-carousel-item" v-for="(url, i) in urls" :key="i">
					<view @touchmove.native.stop.prevent @click.stop class="u-priview-video-item">
						<video
							:src="url"
							class="u-priview-video-item-video"
							:autoplay="videoConfig.autoplay"
							:loop="videoConfig.loop"
							:muted="videoConfig.muted"
							:initial-time="videoConfig.initialTime"
							:duration="videoConfig.duration"
							:controls="videoConfig.controls"
							:danmu-list="videoConfig.danmuList"
							:danmu-btn="videoConfig.danmuBtn"
							:enable-danmu="videoConfig.enableDanmu"
							:page-gesture="videoConfig.pageGesture"
							:direction="videoConfig.direction"
							:show-progress="videoConfig.showProgress"
							:show-fullscreen-btn="videoConfig.showFullscreenBtn"
							:show-play-btn="videoConfig.showPlayBtn"
							:show-center-play-btn="videoConfig.showCenterPlayBtn"
							:show-loading="videoConfig.showLoading"
							:enable-progress-gesture="videoConfig.enableProgressGesture"
							:object-fit="videoConfig.objectFit"
							:poster="videoConfig.poster"
							:show-mute-btn="videoConfig.showMuteBtn"
							:title="videoConfig.title"
							:play-btn-position="videoConfig.playBtnPosition"
							:mobilenet-hint-type="videoConfig.mobilenetHintType"
							:enable-play-gesture="videoConfig.enablePlayGesture"
							:auto-pause-if-navigate="videoConfig.autoPauseIfNavigate"
							:auto-pause-if-open-native="videoConfig.autoPauseIfOpenNative"
							:vslide-gesture="videoConfig.vslideGesture"
							:vslide-gesture-in-fullscreen="videoConfig.vslideGestureInFullscreen"
							:ad-unit-id="videoConfig.adUnitId"
							:poster-for-crawler="videoConfig.posterForCrawler"
							:codec="videoConfig.codec"
							:http-cache="videoConfig.httpCache"
							:play-strategy="videoConfig.playStrategy"
							:header="videoConfig.header"
							:is-live="videoConfig.isLive"
							@play="$emit('play', $event, url, i)"
							@pause="$emit('pause', $event, url, i)"
							@ended="$emit('ended', $event, url, i)"
							@timeupdate="$emit('timeupdate', $event, url, i)"
							@fullscreenchange="$emit('fullscreenchange', $event, url, i)"
							@waiting="$emit('waiting', $event, url, i)"
							@error="$emit('error', $event, url, i)"
							@progress="$emit('progress', $event, url, i)"
							@loadeddata="$emit('loadeddata', $event, url, i)"
							@loadstart="$emit('loadstart', $event, url, i)"
							@seeked="$emit('seeked', $event, url, i)"
							@seeking="$emit('seeking', $event, url, i)"
							@loadedmetadata="$emit('loadedmetadata', $event, url, i)"
							@fullscreenclick="$emit('fullscreenclick', $event, url, i)"
							@controlstoggle="$emit('controlstoggle', $event, url, i)"
						></video>
					</view>
				</u-carousel-item>
			</u-carousel>
			<slot name="other"></slot>
		</u-popup>
	</view>
</template>

<script>
import UPopup from '@/components/u-popup/index.vue'
import UCarousel from '@/components/u-carousel/index.vue'
import UCarouselItem from '@/components/u-carousel-item/index.vue'
export default {
	components: { UPopup, UCarousel, UCarouselItem },
	model: {
		event: 'input',
		prop: 'value'
	},
	props: {
		visible: {
			type: Boolean,
			default: false
		},

		urls: {
			type: Array,
			default() {
				return []
			}
		},

		value: {
			type: Number,
			default: 0
		},

		/** 视频配置项 */
		videoProps: {
			type: Object,
			default() {
				return {}
			}
		},

		popupProps: {
			type: Object,
			default() {
				return {}
			}
		},

		carouselProps: {
			type: Object,
			default() {
				return {}
			}
		}
	},
	data() {
		return {}
	},
	computed: {
		carouselConfig() {
			return {
				threshold: 60,
				isTransition: true,
				isLoop: false,
				duration: 300,
				isDisabled: false,
				...this.carouselProps
			}
		},

		popupConfig() {
			return {
				isClickClose: true,
				direction: 'center',
				zIndex: 1000,
				isAnimation: true,
				duration: 200,
				timingFunction: 'ease',
				delay: 0,
				maskProps: {},
				...this.popupProps
			}
		},

		videoConfig() {
			const config = {
				autoplay: false,
				muted: false,
				controls: true,
				danmuList: [],
				danmuBtn: false,
				enableDanmu: false,
				pageGesture: false,
				showProgress: true,
				showFullscreenBtn: true,
				showPlayBtn: true,
				showCenterPlayBtn: true,
				showLoading: true,
				enableProgressGesture: true,
				objectFit: 'contain',
				showMuteBtn: false,
				playBtnPosition: 'bottom',
				mobilenetHintType: 1,
				enablePlayGesture: false,
				autoPauseIfNavigate: true,
				autoPauseIfOpenNative: true,
				vslideGesture: false,
				vslideGestureInFullscreen: true,
				codec: 'hardware',
				httpCache: true,
				playStrategy: 0,
				header: {},
				isLive: false,
				...this.videoProps
			}
			return config
		}
	}
}
</script>

<style scoped lang="scss">
.u-priview-video-carousel {
	--u-carousel-height: 100%;
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 1001;
	align-items: center;
}

.u-priview-video-carousel-item {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}

.u-priview-video-item {
	position: absolute;
	top: 30%;
	left: 0;
	width: 100%;
}

.u-priview-video-item-video {
	display: block;
	width: 100%;
	height: 40vh;
}
</style>
