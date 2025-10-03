/**
 * 生成指定范围内的随机整数
 * @param min 最小值
 * @param max 最大值
 * @returns 随机整数
 */
export function random(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 生成指定长度的随机字符串
 * @param length 字符串长度
 * @param strList 字符串列表
 * @returns 随机字符串
 */
random.randomStr = function (length: number, strList = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789') {
	let result = ''
	for (let i = 0; i < length; i++) {
		result += strList.charAt(random(0, strList.length - 1))
	}
	return result
}
