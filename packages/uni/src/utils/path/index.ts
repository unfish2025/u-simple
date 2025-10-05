export class Path {
	/**
	 * 获取文件扩展名
	 * @param path 文件路径
	 * @returns 文件扩展名(含点号), 如无扩展名则返回空字符串
	 */
	getExt(path: string): string {
		const index = path.lastIndexOf('.')
		return index !== -1 ? path.substring(index) : ''
	}

	/**
	 * 获取文件名
	 * @param path 文件路径
	 * @returns 文件名(含扩展名)
	 */
	getNameByPath(path: string): string {
		const index = path.lastIndexOf('/')
		return index !== -1 ? path.substring(index + 1) : path
	}

	/**
	 * 获取文件名(不含扩展名)
	 * @param name 文件名
	 */
	getNameInfo(name: string) {
		const ext = this.getExt(name)
		const filename = ext ? name.substring(0, name.length - ext.length) : name
		return {
			ext,
			filename
		}
	}
}
