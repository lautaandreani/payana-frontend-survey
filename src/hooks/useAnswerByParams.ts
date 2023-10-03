import { useEffect } from "react"

export const useAnswerByParams = ({
  currentIndex,
  rating,
}: {
  currentIndex: number
  rating: number
}) => {
  const params = new URLSearchParams(window.location.search)
  const ratingByParam = Number(params.get("rating"))
  const questionIdByParam = Number(params.get("questionId"))

  useEffect(() => {
    window.history.pushState(
      null,
      "",
      `?questionId=${currentIndex}&rating=${rating}`,
    )
  }, [rating, currentIndex])

  const clearParams = () => history.pushState({}, "", window.location.origin)

  return {
    ratingByParam,
    questionIdByParam,
    clearParams,
  }
}
