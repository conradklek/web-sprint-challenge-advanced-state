import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  console.log(props)

  const {
    form,
    inputChange,
    postQuiz,
  } = props

  const onChange = evt => {
    inputChange(evt.target.id, evt.target.value)
  }

  const onSubmit = evt => {
    evt.preventDefault()
    postQuiz(form.newQuestion, form.newTrueAnswer, form.newFalseAnswer)
    document.getElementById('newQuestion').value = ''
    document.getElementById('newTrueAnswer').value = ''
    document.getElementById('newFalseAnswer').value = ''
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} id="newQuestion" placeholder="Enter question" value={
        form.newQuestion
      }/>
      <input maxLength={50} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" 
        value={form.newTrueAnswer}
      />
      <input maxLength={50} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer"
        value={form.newFalseAnswer}
      />
      <button id="submitNewQuizBtn"
        disabled={!form.newQuestion.trim().length || !form.newTrueAnswer.trim().length || !form.newFalseAnswer.trim().length}
      >Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
