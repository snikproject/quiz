import React from 'react';
import PropTypes from 'prop-types';
import QuestionList from './QuestionList';
import ReactCountdownClock from 'react-countdown-clock';
import config from '../config';

const Quiz = ({ step, questions, questionCount, score, handleAnswerClick, handleEnterPress, state }) => {
  return (
    <div className="wrapper">
      <header>
        <div className="question-count">
          <h2>Question</h2>
          <div className="question-number">{step}</div>
          <div className="description">
            of <span>{questionCount}</span>
          </div>
        </div>
        <div>
          {config.QUESTION_SECONDS > 0 && (
            <ReactCountdownClock
              seconds={config.QUESTION_SECONDS}
              key={state.clockCompletions}
              color="#000"
              alpha={0.9}
              size={180}
            />
          )}
        </div>
        <h1>SNIK Quiz</h1>
        <div className="score-container">
          <h2>Score</h2>
          <div className="score">{score}</div>
          <div className="description">points</div>
        </div>
      </header>

      <div className="questions">
        <QuestionList questions={questions} handleAnswerClick={handleAnswerClick} handleEnterPress={handleEnterPress} />
      </div>
    </div>
  );
};

Quiz.propTypes = {
  state: PropTypes.object.isRequired,
  step: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  questionCount: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  handleEnterPress: PropTypes.func.isRequired
};

export default Quiz;
