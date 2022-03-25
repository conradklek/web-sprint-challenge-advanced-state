import React from 'react'
import { connect } from 'react-redux'
import {
  moveCounterClockwise,
  moveClockwise
} from './../state/action-creators'

export const Wheel = (props) =>{
  const {
    moveCounterClockwise,
    moveClockwise,
    wheel
  } = props

  let arr = [0, 1, 2, 3, 4, 5]
  
  const handleClockwiseClick = () => {
    moveClockwise()
  }

  const handleCounterClockwiseClick = () => {
    moveCounterClockwise()
  }

  return (
    <div id="wrapper">
      <div id="wheel">
        {arr.map((item, index) => {
          return (
            <div key={index} className={wheel === item ? 'cog active' : 'cog'} style={{ "--i": item }}>
              {wheel === item ? 'B' : ''}
            </div>
          )
        })}
      </div>
      <div id="keypad">
        <button id="counterClockwiseBtn" onClick={handleCounterClockwiseClick}>Counter clockwise</button>
        <button id="clockwiseBtn" onClick={handleClockwiseClick}>Clockwise</button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    wheel: state.wheel
  }
}

export default connect(mapStateToProps, { moveCounterClockwise, moveClockwise })(Wheel)