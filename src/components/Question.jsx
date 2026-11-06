import PropTypes from 'prop-types';
import Answer from './Answer';
import Evaluation from './Evaluation';

const Question = ({ question, answers, userAnswer, handleAnswerClick, handleEnterPress, handleEvalChange, handleNext }) => {
  const wrongAnswers = userAnswer?.wrong ?? [];
  const rightAnswer = userAnswer?.right ?? null;

  return (
    <li className="question">
      <h2 className="question-title">
        <span>{question}</span>
      </h2>
      <ul className="question-answers" tabIndex="-1">
        {answers.map((answer, index) => {
          const status = rightAnswer === index ? 'right' : wrongAnswers.includes(index) ? 'wrong' : '';
          return (
            <Answer
              key={answer}
              answer={answer}
              status={status}
              disabled={rightAnswer !== null}
              handleAnswerClick={() => handleAnswerClick(index)}
              handleEnterPress={handleEnterPress(index)}
            />
          );
        })}
      </ul>
      <Evaluation handleEvalChange={handleEvalChange} handleNext={handleNext}></Evaluation>
    </li>
  );
};

Question.propTypes = {
  question: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  userAnswer: PropTypes.object,
  handleAnswerClick: PropTypes.func.isRequired,
  handleEnterPress: PropTypes.func.isRequired,
  handleEvalChange: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired
};

export default Question;
