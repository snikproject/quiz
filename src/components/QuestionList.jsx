import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';

const QuestionList = ({ questions, handleAnswerClick, handleEnterPress }) => {
  return (
    <ul className="question-list">
      {questions.map(question => {
        return (
          <Question
            key={question.question.props.children.toString()+JSON.stringify(question.answers.map(a=>a.props.children))} // questions aren't unique but key must be
            //key={index++}
            //key={Math.random()}
            question={question.question}
            answers={question.answers}
            handleAnswerClick={handleAnswerClick}
            handleEnterPress={handleEnterPress}
          />
        );
      })}
    </ul>
  );
}

QuestionList.propTypes = {
  questions: PropTypes.array.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  handleEnterPress: PropTypes.func.isRequired
};

export default QuestionList;
