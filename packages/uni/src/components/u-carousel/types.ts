export interface UCarouselProvide {
	orderMap: Record<string, number>
	add: (value: string) => void
	remove: (value: string) => void
}
