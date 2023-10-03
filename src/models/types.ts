export interface Question {
  id: number
  texto: string
  valoracion: number
}

export interface UserAnswer {
  answer: number
  question: Question
}
