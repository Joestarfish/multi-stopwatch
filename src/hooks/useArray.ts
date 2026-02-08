import { useState, useCallback } from "react"


/* @see https://github.com/WebDevSimplified/React-Simplified-Beginner-Projects/blob/main/09-use-array-hook/after/src/useArray.js */
export function useArray<T>(initialValue: T[]) {
  const [array, setArray] = useState(initialValue)

  const push = useCallback((element: T) => {
    setArray(a => [...a, element])
  }, [])

  const replace = useCallback((index: number, newElement: T) => {
    setArray(a => {
      return [...a.slice(0, index), newElement, ...a.slice(index + 1)]
    })
  }, [])

  const filter = useCallback((callback: (value: T) => boolean) => {
    setArray(a => {
      return a.filter(callback)
    })
  }, [])

  const remove = useCallback((index: number) => {
    setArray(a => {
      return [...a.slice(0, index), ...a.slice(index + 1)]
    })
  }, [])

  const clear = useCallback(() => {
    setArray([])
  }, [])

  const reset = useCallback(() => {
    setArray(initialValue)
  }, [initialValue])

  return { array, set: setArray, push, replace, filter, remove, clear, reset }
}
