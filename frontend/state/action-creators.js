// ❗ You don't need to add extra action creators to achieve MVP

import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM } from './action-types'
import axios from 'axios'

export function moveClockwise() {
  return {
    type: MOVE_CLOCKWISE
  }
}

export function moveCounterClockwise() {
  return {
    type: MOVE_COUNTERCLOCKWISE
  }
}

export function selectAnswer(id) {
  return {
    type: SET_SELECTED_ANSWER,
    payload: id
  }
}

export function setMessage(message) {
  return {
    type: SET_INFO_MESSAGE,
    payload: message
  }
}

export function setQuiz(quiz) {
  return {
    type: SET_QUIZ_INTO_STATE,
    payload: quiz
  }
}

export function inputChange(name, value) {
  return {
    type: INPUT_CHANGE,
    payload: {
      name,
      value
    }
  }
}

export function resetForm() {
  return {
    type: RESET_FORM
  }
}

export function fetchQuiz() {
  return function (dispatch) {
    axios.get('http://localhost:9000/api/quiz/next')
      .then(function (response) {
        dispatch(setQuiz(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export function postAnswer(quizId, answerId) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/answer', { quiz_id: quizId, answer_id: answerId })
      .then(function (response) {
        console.log(response)
        dispatch(selectAnswer(''))
        dispatch(setMessage(response.data.message))
        dispatch(fetchQuiz())
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

export function postQuiz(questionText, trueAnswerText, falseAnswerText) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/quiz/new', { question_text: questionText, true_answer_text: trueAnswerText, false_answer_text: falseAnswerText })
      .then(function (response) {
        console.log(response)
        dispatch(setMessage(`Congrats: "${questionText}" is a great question!`))
        dispatch(resetForm())
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
