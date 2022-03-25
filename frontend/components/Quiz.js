import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  fetchQuiz,
  postAnswer,
  selectAnswer
} from './../state/action-creators'

export function Quiz(props) {
  const {
    fetchQuiz,
    postAnswer,
    selectAnswer,
    selectedAnswer,
    quiz
  } = props

  useEffect(() => {
    if (quiz.loading) fetchQuiz()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    postAnswer(quiz.quiz_id, selectedAnswer.answer_id)
  }

  return (
    <div id="wrapper">
      {
        !quiz.loading ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
            {
                quiz.answers.map(answer => (
                  <div key={answer.answer_id}
                    id={answer.answer_id}
                    className={`answer ${answer.answer_id === selectedAnswer.answer_id ? 'selected' : ''}`}
                    >
                    {answer.text}
                    <button onClick={() => selectAnswer(answer.answer_id)}>
                      {answer.answer_id === selectedAnswer.answer_id ? 'SELECTED' : 'SELECT'}
                    </button>
                  </div>
                ))
            } 
            </div>

            <button id="submitAnswerBtn"
              onClick={handleSubmit}
              disabled={selectedAnswer.answer_id !== quiz.answers[0].answer_id && selectedAnswer.answer_id !== quiz.answers[1].answer_id}
            >Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    selectedAnswer: state.selectedAnswer
  }
}

export default connect(mapStateToProps, { fetchQuiz, postAnswer, selectAnswer })(Quiz)