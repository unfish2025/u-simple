import Bus from '@yishu/event'

export type EventType = {
	add: (uuid: string, onChangeHandler: (offsetX: number) => void) => void
	remove: (uuid: string) => void
}

export interface UCarouselProvide {
	bus: Bus<EventType>
}
