import { useEffect } from "react"
import { UserAnswer } from "../models/types"

interface Props {
  answers: UserAnswer[]
}

export function AnswersSummary({ answers }: Props) {
  useEffect(() => {
    history.pushState({}, "", window.location.origin)
  }, [])
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <main className="min-w-[45%] min-h-[20rem] max-h-[20rem] overflow-y-auto border border-soft_gray bg-soft_gray/30 rounded flex flex-col justify-between mx-4">
        <div className="sticky top-0 backdrop-blur-sm">
          <h3 className="font-semibold p-4">Tus respuestas</h3>
          <hr className="border-soft_gray" />
        </div>
        <div className="flex flex-col gap-2 p-4">
          {answers.map(({ answer, question }) => {
            return (
              <div key={question.id}>
                <span className="text-xl">{question.texto}</span>
                <p
                  className={`text-yellow-500 mt-2 text-lg ${
                    answer < 3 && "!text-red-500"
                  }`}
                >
                  {answer} {Array(answer).fill("★")}
                </p>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
