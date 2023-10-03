import { useEffect, useState } from "react"

export const useLocalStorage = <K>(key: string) => {
  const [data, setData] = useState<K | null>(null)

  const saveInStorage = <T>(data: T) => {
    window.localStorage.setItem(key, JSON.stringify(data))
  }

  useEffect(() => {
    const getDataFromLocalStorage = window.localStorage.getItem(key)

    if (getDataFromLocalStorage) setData(JSON.parse(getDataFromLocalStorage))
  }, [])

  return {
    data,
    saveInStorage,
  }
}
