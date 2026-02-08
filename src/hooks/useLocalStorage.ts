import { useEffect, useState } from "react"

/* @see https://github.com/WebDevSimplified/React-Simplified-Beginner-Projects/blob/main/10-use-local-storage-hook/after/src/useLocalStorage.js */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key)
    if (localValue == null) {
      if (typeof initialValue === "function") {
        return initialValue()
      } else {
        return initialValue
      }
    } else {
      return JSON.parse(localValue)
    }
  })

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [value, key])

  return [value, setValue]
}
