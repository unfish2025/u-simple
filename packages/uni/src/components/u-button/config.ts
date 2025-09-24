import type { UButtonType, UButtonSize } from './types'
export const typeEmun: Record<UButtonType, string> = {
	primary: 'primary',
	success: 'success',
	warning: 'warning',
	danger: 'danger',
	info: 'info'
} as const

export const sizeEnum: Record<UButtonSize, UButtonSize> = {
	small: 'small',
	normal: 'normal',
	large: 'large',
    mini: 'mini'
} as const

export const typeToColorEnum: Record<UButtonType, string> = {
	primary: '#5578fa',
	success: '#23AC63',
	warning: '#FF980F',
	danger: '#F55252',
	info: '#B3BCC6'
} as const
