export type UButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type UButtonSize = 'large' | 'normal' | 'small' | 'mini'

export interface ButtonStyle {
	backgroundColor?: string
	color?: string
	'--u-button-type-color'?: string
	'--u-button-active-type-color'?: string
}
