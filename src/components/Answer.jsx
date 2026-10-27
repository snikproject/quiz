import PropTypes from 'prop-types';

const Answer = ({ answer, handleAnswerClick, handleEnterPress }) => {
  return (
    <li className="question-answer" tabIndex="0" onClick={handleAnswerClick} onKeyDown={handleEnterPress}>
      <span>{answer}</span>
    </li>
  );
};

Answer.propTypes = {
  answer: PropTypes.string.isRequired,
  handleAnswerClick: PropTypes.func.isRequired,
  handleEnterPress: PropTypes.func.isRequired
};

export default Answer;
