import type { ChooseFileOptions, ChooseInputEvent } from './types'
import Bus from '@yishu/event'
import { Path } from '../path'

const path = new Path()
export class WebChooseFile {
	/**
	 * 生成一个完整的配置
	 * @param op 配置
	 * @returns 完整配置
	 */
	createOptions(op: ChooseFileOptions = {}) {
		const { count = Infinity, accept = '*/*', multiple, capture } = op
		return { count, accept, multiple, capture }
	}

	/**
	 * 生成一个文件选择 input 元素及操作方法
	 * - 使用 appendToBody 后需要手动 remove, 以免造成内存泄漏
	 * @param op 配置
	 * @returns 文件选择 input 元素及操作方法
	 */
	createInput(op?: ChooseFileOptions) {
		const options = this.createOptions(op)
		const input = document.createElement('input')
		input.style.display = 'none'
		input.type = 'file'
		input.accept = options.accept
		input.multiple = options.multiple ?? options.count > 1
		if (options.capture) {
			input.capture = options.capture
		}

		const bus = new Bus<ChooseInputEvent>()
		const onChange = (event: Event) => {
			if (bus.has('choose')) {
				const files = Array.from(input.files || [])
				bus.emit('choose', files.slice(0, options.count), files, event)
			}
		}
		input.addEventListener('change', onChange)

		return {
			/** input 元素 */
			input,
			/** 事件总线 */
			bus,
			/** 将 input 元素添加到 body */
			appendToBody() {
				document.body.appendChild(input)
			},
			/** 移除 input 元素, 同时会重置 input 值 */
			remove() {
				input.value = ''
				input.remove()
			},
			/** 重置 input 值 */
			reset() {
				input.value = ''
			}
		}
	}

	/**
	 * 包装 file 以获取更多信息
	 * @param file File 对象
	 * @returns 包装后的对象
	 */
	packFile(file: File) {
		const { filename, ext } = path.getNameInfo(file.name)
		return {
			file,
			name: file.name,
			size: file.size,
			type: file.type,
			filename,
			ext
		}
	}

	/**
	 * 选择文件
	 * - 基于 createInput 和 packFile 方法
	 * @param op 配置
	 * @returns File 列表或包装后的 File 列表
	 */
	async chooseFile(op: ChooseFileOptions & { packFile: true }): Promise<ReturnType<WebChooseFile['packFile']>[]>
	async chooseFile(op?: ChooseFileOptions & { packFile?: false | undefined }): Promise<File[]>
	async chooseFile(op?: ChooseFileOptions & { packFile?: boolean }): Promise<File[] | ReturnType<WebChooseFile['packFile']>[]> {
		return new Promise<File[] | ReturnType<WebChooseFile['packFile']>[]>((resolve) => {
			const ctx = this.createInput(op)
			ctx.bus.on('choose', (files) => {
				if (op?.packFile) {
					resolve(files.map((file) => this.packFile(file)))
				} else {
					resolve(files)
				}
			})
			ctx.appendToBody()
			ctx.input.click()
			Promise.resolve().then(() => {
				ctx.remove()
			})
		})
	}

	/**
	 * 选择图片
	 * @param op 配置
	 * @returns File 列表或包装后的 File 列表
	 */
	async chooseImage(op: Omit<ChooseFileOptions, 'accept'> = {}) {
		return this.chooseFile({ ...op, accept: 'image/*' })
	}

	/**
	 * 选择视频
	 * @param op 配置
	 * @returns File 列表或包装后的 File 列表
	 */
	async chooseVideo(op: Omit<ChooseFileOptions, 'accept'> = {}) {
		return this.chooseFile({ ...op, accept: 'video/*' })
	}
}
