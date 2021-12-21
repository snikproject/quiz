import React, { useState } from 'react';
import PropTypes from 'prop-types';
import tally from '../helpers/tally';

const Results = ({ userAnswers, userEvals, score, restartQuiz }) => {
  const triesTotal = tally(userAnswers);
  const oneTry = triesTotal[1] && (
    <div>
      <strong>{triesTotal[1]}</strong> on the first try.
    </div>
  );
  const twoTries = triesTotal[2] && (
    <div>
      <strong>{triesTotal[2]}</strong> on the second try.
    </div>
  );
  const threeTries = triesTotal[3] && (
    <div>
      <strong>{triesTotal[3]}</strong> on the third try.
    </div>
  );
  const fourTries = triesTotal[4] && (
    <div>
      <strong>{triesTotal[4]}</strong> on the fourth try.
    </div>
  );

  const [enabled, setEnabled] = useState(true);

  setTimeout(() => {
    //const URL = "https://script.google.com/macros/s/AKfycby1cMM4wAPJqdmAFy-lOIWIYiACdo23XnvJN0Xt/exec";
    const URL = 'https://script.google.com/macros/s/AKfycbyk9fYzcIVugmaaXbpyXf2PjbqjGl1u0Y_NKMRC6KgAzS2zmS2J7mZgV7IG1_dDcyXj/exec';
    const form = document.forms['submit-to-google'];
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      fetch(URL, { method: 'POST', redirect: 'follow', body: new FormData(form) })
        .then((response) => {
          console.log('Success!', response);
          setEnabled(false);
        })
        .catch((error) => console.error('Error!', error.message));
    });
  }, 100);

  const div = (
    <div className="results-container">
      <h2>Quiz Results</h2>
      <div>You answered...</div>
      {oneTry}
      {twoTries}
      {threeTries}
      {fourTries}
      <div className="results-total">
        Your Total Score is <strong>{score}</strong>.
      </div>
      <a onClick={restartQuiz}>Restart Quiz</a>
      <form name="submit-to-google">
        name:
        <input type="text" name="name" />
        <input type="hidden" name="score" value={score} />
        <input type="hidden" name="userAnswers" value={JSON.stringify(userAnswers.map((x) => x.tries))} />
        <input type="hidden" name="userEval" value={JSON.stringify(userEvals)} />
        <input disabled={!enabled} type="submit" value="Submit Score" />
      </form>
    </div>
  );
  return div;
};

Results.propTypes = {
  userAnswers: PropTypes.array.isRequired,
  score: PropTypes.number.isRequired,
  restartQuiz: PropTypes.func.isRequired
};

export default Results;
