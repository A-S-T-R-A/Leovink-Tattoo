import { /* MutableRefObject */ useCallback, useRef } from "preact/hooks"

export function useDebounce(callback: (...args: any[]) => void, delay: number) {
    const timer = useRef() as any

    return useCallback(
        (...args: any[]) => {
            if (timer.current) {
                clearTimeout(timer.current)
            }
            timer.current = setTimeout(() => {
                callback(...args)
            }, delay)
        },
        [callback, delay]
    )
}
