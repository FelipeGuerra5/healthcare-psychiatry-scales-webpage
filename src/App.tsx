import { useState, useEffect } from 'react'
import Styles from './App.module.css'
import sicadData from './models/sicad.json'
import { scale } from './models/scale'

function App() {
  const sicadScale = sicadData as scale
  const [sicad, setSicad] = useState(sicadScale)
  const [currentQuestionId, setCurrentQuestionId] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(sicad.questions[currentQuestionId])
  const [sum, setSum] = useState(0)

  console.log(sicad)

  useEffect(() => {
    setCurrentQuestion(sicad.questions[currentQuestionId])
  }, [currentQuestionId])

  const handleAnswer = (questionId: number, answerValue: number): void => {
    const answeredQuestion = sicad.questions.find((question) => question.id === questionId)
    const index = sicad.questions.indexOf(answeredQuestion!)
    answeredQuestion!.chosenValue = answerValue

    const newQuestions = sicad.questions
    newQuestions.splice(index, 1, answeredQuestion!)

    console.log(newQuestions[0].chosenValue)

    const newSicad = sicad
    newSicad.questions = newQuestions
    setSicad(newSicad)
  }

  const handleNextQuestion = (): void => {
    if (
      currentQuestion.chosenValue
      && currentQuestionId < sicad.questions.length - 1
    ) {
      setSum(sum + currentQuestion.chosenValue)
      const newQuestionId = currentQuestionId + 1
      setCurrentQuestionId(newQuestionId)
      setCurrentQuestion(sicad.questions[newQuestionId])
    }
  }

  return (
    <>
      <section className={Styles.container}>
        <h1>{sicad.name}</h1>
        <h2>{sicad.description}</h2>
        <p>Total sum: {sum}</p>

        <div className={Styles.questions}>
          {
            <>
              <div className={Styles.questionTitle} key={currentQuestion.id}>
                {currentQuestion.title}
                <div className={Styles.possibleAnswers}>
                  {currentQuestion.possibleAnswer.map((answer) => {
                    return (
                      <div key={answer.value}>
                        <input
                          type="radio"
                          id={answer.level}
                          name={currentQuestion.id.toString()}
                          value={answer.level}
                          onChange={() => handleAnswer(currentQuestion.id, answer.value)}
                        />
                        <label htmlFor={answer.level}>
                          {answer.description}
                        </label>
                      </div>
                    )
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => handleNextQuestion()}
                >
                  Next question
                </button>
              </div>
            </>
          }
        </div>
      </section>
    </>
  )
}

export default App