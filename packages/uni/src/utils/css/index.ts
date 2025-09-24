interface RgbObject {
	r: number
	g: number
	b: number
}
interface RgbaObject extends RgbObject {
	a: number
}

export class Css {
	/**
	 * 将 hex 颜色转换为 rgba 颜色
	 * @param hex hex 颜色, 例如 #fff, #ffffff, #ffffffff
	 * @param alpha alpha 通道, 默认为 1
	 * @returns rgba 颜色字符串
	 */
	hexToRgba(hex: string, alpha: number = 1): `rgba(${number}, ${number}, ${number}, ${number})` {
		if (!this.isHex(hex)) throw new Error('Invalid hex color')
		const { r, g, b } = this._hexToRgbObject(hex)!
		alpha = this._clamp(alpha, 0, 1)
		return `rgba(${r}, ${g}, ${b}, ${this._round(alpha, 3)})`
	}

	/**
	 * 将 hex 颜色转换为 rgb 颜色
	 * @param hex #fff/#ffffff/#ffffffff
	 * @returns rgb(r,g,b)
	 * @throws Error 当格式非法
	 */
	hexToRgb(hex: string): `rgb(${number}, ${number}, ${number})` {
		if (!this.isHex(hex)) throw new Error('Invalid hex color')
		const { r, g, b } = this._hexToRgbObject(hex)!
		return `rgb(${r}, ${g}, ${b})`
	}

	/**
	 * 将 rgba 字符串转换为 hex 颜色
	 * @param rgba rgba 颜色, 例如 rgba(255, 0, 0, 0.5)
	 * @returns #rrggbb 或 #rrggbbaa
	 * @throws Error 当格式非法
	 */
	rgbaToHex(rgba: string): `#${string}` {
		const obj = this._parseRgba(rgba)
		if (!obj) throw new Error('Invalid rgba color')
		const { r, g, b, a } = obj
		// 若透明度 <1 保留 8 位 hex (#rrggbbaa)，否则返回 #rrggbb
		const toHex = (n: number) => n.toString(16).padStart(2, '0')
		if (a < 1) {
			return `#${toHex(r)}${toHex(g)}${toHex(b)}${toHex(Math.round(a * 255))}`
		}
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`
	}

	/**
	 * 将 rgb 字符串转换为 hex 颜色
	 * @param rgb rgb 颜色, 例如 rgb(255, 0, 0)
	 * @returns #rrggbb
	 * @throws Error 当格式非法
	 */
	rgbToHex(rgb: string): `#${string}` {
		const obj = this._parseRgb(rgb)
		if (!obj) throw new Error('Invalid rgb color')
		const { r, g, b } = obj
		const toHex = (n: number) => n.toString(16).padStart(2, '0')
		return `#${toHex(r)}${toHex(g)}${toHex(b)}`
	}

	/**
	 * 将 rgba -> rgb (丢弃 alpha)
	 * @param rgba rgba 字符串
	 * @returns rgb 字符串
	 * @throws Error 当格式非法
	 */
	rgbaToRgb(rgba: string): `rgb(${number}, ${number}, ${number})` {
		const obj = this._parseRgba(rgba)
		if (!obj) throw new Error('Invalid rgba color')
		const { r, g, b } = obj
		return `rgb(${r}, ${g}, ${b})`
	}

	/**
	 * 将 rgb -> rgba (追加 alpha)
	 * @param rgb rgb 字符串
	 * @param alpha 0~1 之间数字
	 * @returns rgba 字符串
	 * @throws Error 当格式非法
	 */
	rgbToRgba(rgb: string, alpha: number = 1): `rgba(${number}, ${number}, ${number}, ${number})` {
		const obj = this._parseRgb(rgb)
		if (!obj) throw new Error('Invalid rgb color')
		alpha = this._clamp(alpha, 0, 1)
		const { r, g, b } = obj
		return `rgba(${r}, ${g}, ${b}, ${this._round(alpha, 3)})`
	}

	/**
	 * 变暗颜色
	 * @param color 支持 hex / rgb / rgba
	 * @param amount 百分比 0~100
	 * @param mode relative: 相对当前亮度, absolute: 直接减 L
	 * @returns 变换后的颜色字符串 (保留原 alpha 判断)
	 * @throws Error 当颜色非法
	 */
	colorDarken(
		color: string,
		amount: number,
		mode: 'relative' | 'absolute' = 'relative'
	): `rgb(${number}, ${number}, ${number})` | `rgba(${number}, ${number}, ${number}, ${number})` {
		return this._adjustLightness(color, amount, 'darken', mode)
	}

	/**
	 * 变亮颜色
	 * @param color 支持 hex / rgb / rgba
	 * @param amount 百分比 0~100
	 * @param mode relative: 相对当前亮度, absolute: 直接加 L
	 * @returns 变换后的颜色字符串
	 * @throws Error 当颜色非法
	 */
	colorLighten(
		color: string,
		amount: number,
		mode: 'relative' | 'absolute' = 'relative'
	): `rgb(${number}, ${number}, ${number})` | `rgba(${number}, ${number}, ${number}, ${number})` {
		return this._adjustLightness(color, amount, 'lighten', mode)
	}

	/**
	 * 判断是否是受支持的颜色格式(hex/rgb/rgba)
	 */
	isColor(color: string): boolean {
		return this.isHex(color) || this.isRgb(color) || this.isRgba(color)
	}

	/** 判断是否是 hex 颜色 (#fff/#ffffff/#ffffffff) */
	isHex(color: string): boolean {
		return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(color.trim())
	}

	/** 判断是否是 rgb 颜色 */
	isRgb(color: string): boolean {
		return /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.test(color.trim())
	}

	/** 判断是否是 rgba 颜色 */
	isRgba(color: string): boolean {
		return /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*((0|1)(\.\d+)?|0?\.\d+)\s*\)$/.test(color.trim())
	}

	/**
	 * 数值裁剪
	 * @param n 输入值
	 * @param min 最小值
	 * @param max 最大值
	 * @returns 被限制在 [min, max] 内的数值
	 */
	private _clamp(n: number, min: number, max: number) {
		return Math.min(Math.max(n, min), max)
	}
	/**
	 * 按精度四舍五入
	 * @param n 数值
	 * @param precision 小数位 (默认 2)
	 */
	private _round(n: number, precision: number = 2) {
		const p = 10 ** precision
		return Math.round(n * p) / p
	}

	/**
	 * hex 转为 RGB 对象
	 * @param hex #rgb / #rrggbb / #rrggbbaa (忽略 alpha)
	 * @returns { r, g, b } 或 null (非法格式)
	 */
	private _hexToRgbObject(hex: string): RgbObject | null {
		if (!this.isHex(hex)) return null
		let h = hex.slice(1)
		if (h.length === 3) {
			h = h
				.split('')
				.map((ch) => ch + ch)
				.join('')
		}
		if (h.length === 8) {
			return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }
		}
		return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) }
	}

	/**
	 * 解析 rgb() 字符串
	 * @param str rgb( r, g, b )
	 * @returns RgbObject 或 null
	 */
	private _parseRgb(str: string): RgbObject | null {
		if (!this.isRgb(str)) return null
		const m = str.match(/\d{1,3}/g)!
		const [r, g, b] = m.map((v) => this._clamp(parseInt(v, 10), 0, 255))
		return { r, g, b }
	}

	/**
	 * 解析 rgba() 字符串
	 * @param str rgba(r,g,b,a)
	 * @returns RgbaObject 或 null
	 */
	private _parseRgba(str: string): RgbaObject | null {
		if (!this.isRgba(str)) return null
		const m = str.match(/\d{1,3}|(?:\d*\.\d+)/g)! // numbers including floats
		const r = this._clamp(parseInt(m[0], 10), 0, 255)
		const g = this._clamp(parseInt(m[1], 10), 0, 255)
		const b = this._clamp(parseInt(m[2], 10), 0, 255)
		const a = this._clamp(parseFloat(m[3]), 0, 1)
		return { r, g, b, a }
	}

	/**
	 * 调整颜色亮度
	 * @param color 颜色字符串 (hex/rgb/rgba)
	 * @param amount 0~100 百分比
	 * @param type darken | lighten
	 * @param mode relative: 相对; absolute: 绝对
	 * @returns 变换后的颜色
	 * @internal 上层使用 colorDarken/colorLighten
	 * @throws Error 当颜色格式非法
	 */
	private _adjustLightness(
		color: string,
		amount: number,
		type: 'darken' | 'lighten',
		mode: 'relative' | 'absolute'
	): `rgb(${number}, ${number}, ${number})` | `rgba(${number}, ${number}, ${number}, ${number})` {
		amount = this._clamp(amount, 0, 100)
		let rgba: RgbaObject | null = null
		if (this.isHex(color)) {
			const rgbObj = this._hexToRgbObject(color)!
			rgba = { ...rgbObj, a: 1 }
		} else if (this.isRgb(color)) {
			const rgbObj = this._parseRgb(color)!
			rgba = { ...rgbObj, a: 1 }
		} else if (this.isRgba(color)) {
			rgba = this._parseRgba(color)
		} else {
			throw new Error('Invalid color format')
		}
		if (!rgba) throw new Error('Invalid color format')
		let { r, g, b, a } = rgba
		// 转换到 HSL 调整 lightness
		const { h, s, l } = this._rgbToHsl(r, g, b)
		let newL: number
		if (mode === 'relative') {
			if (type === 'darken') newL = l * (1 - amount / 100)
			else newL = l + (1 - l) * (amount / 100)
		} else {
			// absolute: 直接在 0-100% 空间加减
			if (type === 'darken') newL = l - amount / 100
			else newL = l + amount / 100
		}
		newL = this._clamp(newL, 0, 1)
		const { r: nr, g: ng, b: nb } = this._hslToRgb(h, s, l !== newL ? newL : l)
		return a === 1 ? `rgb(${nr}, ${ng}, ${nb})` : `rgba(${nr}, ${ng}, ${nb}, ${this._round(a, 3)})`
	}

	/**
	 * RGB 转 HSL
	 * @returns { h: 0-1, s:0-1, l:0-1 }
	 */
	private _rgbToHsl(r: number, g: number, b: number) {
		r /= 255
		g /= 255
		b /= 255
		const max = Math.max(r, g, b),
			min = Math.min(r, g, b)
		let h = 0,
			s = 0
		const l = (max + min) / 2
		if (max !== min) {
			const d = max - min
			s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
			switch (max) {
				case r:
					h = (g - b) / d + (g < b ? 6 : 0)
					break
				case g:
					h = (b - r) / d + 2
					break
				case b:
					h = (r - g) / d + 4
					break
			}
			h /= 6
		}
		return { h, s, l }
	}

	/**
	 * HSL 转 RGB
	 * @param h 0-1
	 * @param s 0-1
	 * @param l 0-1
	 */
	private _hslToRgb(h: number, s: number, l: number) {
		if (s === 0) {
			const val = Math.round(l * 255)
			return { r: val, g: val, b: val }
		}
		const hue2rgb = (p: number, q: number, t: number) => {
			if (t < 0) t += 1
			if (t > 1) t -= 1
			if (t < 1 / 6) return p + (q - p) * 6 * t
			if (t < 1 / 2) return q
			if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
			return p
		}
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s
		const p = 2 * l - q
		const r = hue2rgb(p, q, h + 1 / 3)
		const g = hue2rgb(p, q, h)
		const b = hue2rgb(p, q, h - 1 / 3)
		return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) }
	}
}
