import { useEffect, useState } from "react"
import { preguntas as questions } from "../db.json"
import { Question, UserAnswer } from "./models/types"
import { AnswersSummary } from "./components/answers-summary"
import { useAnswerByParams } from "./hooks/useAnswerByParams"
import { useLocalStorage } from "./hooks/useLocalStorage"

function App() {
  const { data, saveInStorage } = useLocalStorage<UserAnswer[]>("answers")
  const [rating, setRating] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [saveAnswers, setSaveAnswers] = useState<UserAnswer[] | null>(data)
  const [isFinished, setIsFinished] = useState<boolean | null>(null)

  const { questionIdByParam, ratingByParam } = useAnswerByParams({
    currentIndex,
    rating,
  })

  const handleStarClick = (index: number) => setRating(index + 1)

  const handleUserAnswers = ({ question }: { question: Question }) => {
    saveAnswers === null
      ? setSaveAnswers([{ answer: rating, question }])
      : setSaveAnswers([...saveAnswers, { answer: rating, question }])
  }

  const onClickNextQuestion = ({ question }: { question: Question }) => {
    if (rating === 0) return
    if (currentIndex === questions.length - 1) {
      handleUserAnswers({ question })
      setIsFinished(true)
      return
    }
    setCurrentIndex((prev) => prev + 1)
    handleUserAnswers({ question })
  }

  useEffect(() => {
    setSaveAnswers(data)
  }, [data])

  useEffect(() => {
    setCurrentIndex(questionIdByParam)
    setRating(ratingByParam)
  }, [])

  useEffect(() => {
    const isReplyAnswer = saveAnswers?.some(
      (saveAnswer) => saveAnswer.question.id === currentIndex,
    )
    if (isReplyAnswer) {
      setRating(0)
      saveInStorage(saveAnswers)
    }
  }, [currentIndex])

  if (isFinished && saveAnswers !== null) {
    return <AnswersSummary answers={saveAnswers} />
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <main className="min-w-[45%] p-4 min-h-[20rem] border border-soft_gray bg-soft_gray/30 rounded flex flex-col justify-between mx-4">
        <section className="flex flex-col gap-2">
          <h3 className="text-gray-300">Pregunta {currentIndex} de 4</h3>
          <p className="text-3xl font-bold">{questions[currentIndex].texto}</p>

          <div className="flex gap-2 w-full mt-4">
            {Array.from({ length: questions[currentIndex].valoracion }).map(
              (_, index) => (
                <span
                  key={index}
                  className={`text-5xl text-[#424242] cursor-pointer ${
                    index < rating && "!text-yellow-500 hover:text-yellow-500"
                  }`}
                  onClick={() => handleStarClick(index)}
                >
                  {index < rating ? "★" : "☆"}
                </span>
              ),
            )}
          </div>
          {!!rating && (
            <small>
              Tu valoración <b>{rating}</b>
            </small>
          )}
        </section>

        <section className="w-full flex justify-end">
          <button
            className="py-2 px-6 disabled:bg-soft_gray transition disabled:cursor-not-allowed disabled:text-gray-500/50 disabled:border-none bg-trasparent border border-soft_gray text-white hover:bg-soft_gray rounded"
            disabled={rating === 0}
            onClick={() =>
              onClickNextQuestion({ question: questions[currentIndex] })
            }
          >
            Continuar
          </button>
        </section>
      </main>
    </div>
  )
}

export default App
