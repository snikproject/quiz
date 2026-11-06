import PropTypes from 'prop-types';

const Answer = ({ answer, status, disabled, handleAnswerClick, handleEnterPress }) => {
  const className = ['question-answer', status, disabled ? 'disabled' : ''].filter(Boolean).join(' ');

  return (
    <li className={className} onClick={handleAnswerClick} onKeyDown={handleEnterPress} tabIndex={disabled ? -1 : 0}>
      <span>{answer}</span>
    </li>
  );
};

Answer.propTypes = {
  answer: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['', 'right', 'wrong']),
  disabled: PropTypes.bool,
  handleAnswerClick: PropTypes.func.isRequired,
  handleEnterPress: PropTypes.func.isRequired
};

export default Answer;
