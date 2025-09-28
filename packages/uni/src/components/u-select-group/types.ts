export interface USelectGroupProvide {
	isDisabled: boolean
	selectedList: (string | number)[]
	addSelected: (value: string | number) => void
	removeSelected: (value: string | number) => void
}
