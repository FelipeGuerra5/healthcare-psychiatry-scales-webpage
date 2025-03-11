import Styles from '../App.module.css'
import { useState, useEffect } from 'react'
import { scale, question } from '../models/scale'

type Props = {
    params: {
        sicad: scale
    }
}

export default function Question(params: Props) {
    const [sicad, setSicad] = useState(params.params.sicad)
    const [currentQuestionId, setCurrentQuestionId] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(sicad.questions[currentQuestionId])
    const [sum, setSum] = useState(0)


    useEffect(() => {
        setCurrentQuestion(sicad.questions[currentQuestionId])
    }, [currentQuestionId])

    const handleQuestionType = (currentQuestion: question) => {
        if (currentQuestion.type === 'radio') {


            return (
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
                            Proxima questão
                        </button>
                        <button
                            type="button"
                            onClick={() => handleFinishScale()}
                        > Finalizar Questionário</button>
                    </div>
                </>
            )
        } else if (currentQuestion.type === 'text') {
            return (
                <>
                    <div className={Styles.questionTitle} key={currentQuestion.id}>
                        {currentQuestion.title}
                        <textarea
                            name="nurseDiagnosis"
                            id={currentQuestion.id.toString()}
                            placeholder='Insira o seu diagnóstico aqui.'
                            onChange={(e) => { currentQuestion.textarea = e.target.value }}
                        ></textarea>
                        <button
                            type="button"
                            onClick={() => handleNextQuestion()}
                        >
                            Proxima questão
                        </button>
                        <button
                            type="button"
                            onClick={() => handleFinishScale()}
                        > Finalizar Questionário</button>
                    </div>
                </>
            )
        }
    }


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
            if (currentQuestion.textarea) console.log(`Curret question text Area: ${currentQuestion.textarea}`)
            const newQuestionId = currentQuestionId + 1
            setCurrentQuestionId(newQuestionId)
            setCurrentQuestion(sicad.questions[newQuestionId])
        }
    }

    const handleFinishScale = () => {

        if (currentQuestionId === sicad.questions.length - 1) {
            sicad.sum = currentQuestion.chosenValue ? sum + currentQuestion.chosenValue : sum

            const minimal = sicad.classification.minimal.range.max
            const highDepending = sicad.classification.highDepending.range.min

            if (sicad.sum <= minimal) {
                sicad.result = sicad.classification.minimal
            } else if (sicad.sum > minimal && sicad.sum < highDepending) {
                sicad.result = sicad.classification.intermediate
            } else if (sicad.sum >= highDepending) {
                sicad.result = sicad.classification.highDepending
            }

            console.log(
                `Sicad Result: ${sicad.result.description}, 
                Score: ${sicad.sum}, 
                range: ${sicad.classification.minimal.range.min} 
                - ${sicad.classification.minimal.range.max}`
            )
            console.log(sicad)
        }

        if (sicad.diagnosis) {
            console.log('Diagnóstico:' + sicad.diagnosis)
            // displayDiagnosisTextArea()
        }
    }


    return (
        <>
            <section className={Styles.container}>
                <h1>{sicad.name}</h1>
                <h2>{sicad.description}</h2>
                <p>Pontuação Total: {sum}</p>

                <div className={Styles.questions}>
                    {handleQuestionType(currentQuestion)}
                </div>
            </section>
        </>
    )
}