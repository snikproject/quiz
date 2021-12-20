import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';
import Evaluation from './Evaluation';

function handleSubmit(x) {
  console.log(x);
  return false;
}

const Question = ({ question, answers, handleAnswerClick, handleEnterPress }) => {
  return (
    <li className="question">
      <h2 className="question-title" tabIndex="0">
        {question}
      </h2>
      <ul className="question-answers" tabIndex="-1">
        {answers.map((answer, index) => {
          return (
            <Answer
              //key={JSON.stringify(answer.props.children)}
              key={index}
              answer={answer}
              handleAnswerClick={handleAnswerClick(index)}
              handleEnterPress={handleEnterPress(index)}
            />
          );
        })}
      </ul>
      <Evaluation handleSubmit={handleSubmit}></Evaluation>
    </li>
  );
};

Question.propTypes = {
  question: PropTypes.element.isRequired,
  answers: PropTypes.array.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  handleEnterPress: PropTypes.func.isRequired
};

export default Question;
