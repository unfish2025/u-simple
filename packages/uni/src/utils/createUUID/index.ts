import { random } from '../random/index'

const _crypto: any = (globalThis as any)?.crypto
const hasRandomUUID: boolean = typeof _crypto?.randomUUID === 'function'

/**
 * 创建一个唯一标识符（UUID）
 * @returns {string} UUID 字符串
 */
export function createUUID(): string {
	if (hasRandomUUID) {
		return _crypto.randomUUID()
	}
	return 'mock-' + random.randomStr(16) + '-' + Date.now()
}
