export interface ChooseFileOptions {
	/** 有效数量, 多余部分自动截取掉, 默认为 `Infinity` */
	count?: number
	/** 文件类型, 默认为 \*\/\* */
	accept?: string
	/** 是否多选, 未显示设置将根据 count 自动计算, count 大于 1 则为 true */
	multiple?: boolean
	/** 指定使用设备的某个硬件进行拍摄或录制, 可选值有
	 * - `user` 前置摄像头
	 * - `environment` 后置摄像头
	 * - `user,environment` 浏览器自行决定使用哪个
	 * - 不设置该属性时由浏览器自行决定(一般会使用图库)
	 */
	capture?: 'user' | 'environment' | 'user,environment'
}

export type ChooseInputEvent = {
	/**
	 * 选择文件
	 * @param files 选择的文件列表
	 * @param originFiles 原始文件列表
	 * @param event 事件对象
	 * @returns
	 */
	choose: (files: File[], originFiles: File[], event: Event) => void
}
