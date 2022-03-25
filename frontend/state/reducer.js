// ❗ You don't need to add extra reducers to achieve MVP

import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE, MOVE_COUNTERCLOCKWISE, SET_QUIZ_INTO_STATE, SET_SELECTED_ANSWER, SET_INFO_MESSAGE, INPUT_CHANGE, RESET_FORM } from './action-types'

const initialWheelState = 0
function wheel(state = initialWheelState, action) {
  switch (action.type) {
    case MOVE_CLOCKWISE:
      return state === 5 ? 0 : state + 1
    case MOVE_COUNTERCLOCKWISE:
      return state === 0 ? 5 : state - 1
    default:
      return state
  }
}

const initialQuizState = {
  quiz_id: 'rFlfQ',
  question: 'What is a promise?',
  answers: [{
    answer_id: 'YwHr1',
    text: 'A value representing a future result'
  }, {
    answer_id: 'k7R-a',
    text: 'Something like a blue teapot'
  }],
  loading: true
}

function quiz(state = initialQuizState, action) {
  switch (action.type) {
    case SET_QUIZ_INTO_STATE:
      return {
        ...state,
        ...action.payload,
        loading: false
      }
    default:
      return state
  }
}

const initialSelectedAnswerState = {
  answer_id: 'YwHr1'
}
function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type) {
    case SET_SELECTED_ANSWER:
      return {
        answer_id: action.payload
      }
    default:
      return state
  }
}

const initialMessageState = ''
function infoMessage(state = initialMessageState, action) {
  switch (action.type) {
    case SET_INFO_MESSAGE:
      return action.payload
    default:
      return state
  }
}

const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
function form(state = initialFormState, action) {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    case RESET_FORM:
      return {
        ...state,
        newQuestion: '',
        newTrueAnswer: '',
        newFalseAnswer: '',
      }
    default:
      return state
  }
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
