/** A controlled form in a functional component. This allows the state to be updated on change, without requiring submit.
 * See <https://medium.com/swlh/building-controlled-forms-using-functional-components-in-react-965d033a89bd>. */

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import config from '../config';

const EvaluationBox = ({ name, content, handleChange }) => {
  const [checked, setChecked] = useState(false);

  const boxHandleChange = (event) => {
    handleChange({ target: { name, value: !checked } });
    setChecked(!checked);
  };

  return (
    <li className="evaluation-problem">
      <label>
        <input type="checkbox" name={name} onChange={boxHandleChange} checked={checked} />
        {content}
      </label>
    </li>
  );
};

const Evaluation = ({ handleEvalChange, handleNext }) => {
  const [inputValues, setInputValues] = useState({});
  useEffect(() => handleEvalChange(inputValues), [inputValues]);

  const handleChange = ({ target: { name, value } }) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <div>
      <h4>Report Problem</h4>
      <ul className="evaluation-list">
        <form>
          <EvaluationBox handleChange={handleChange} name="correct-wrong" content="The correctly marked answer is actually wrong." />
          <EvaluationBox handleChange={handleChange} name="incorrect-right" content="An incorrectly marked answer is actually correct." />
          <EvaluationBox handleChange={handleChange} name="incomprehensible" content="The question is incomprehensible." />
          <EvaluationBox handleChange={handleChange} name="contains-answer" content="The question contains the answer." />
          <EvaluationBox handleChange={handleChange} name="grammar" content="The question is grammatically incorrect." />
          <EvaluationBox handleChange={handleChange} name="ontology" content="There is an error in the SNIK ontology." />
          <EvaluationBox handleChange={handleChange} name="artificial" content="The question sounds artificial." />
          <EvaluationBox handleChange={handleChange} name="undidactic" content="The question is not didactically useful." />
          <textarea className="evaluation-area" name="evaluation-area" onChange={handleChange}></textarea>
          {config.WAIT && (
            <button type="button" onClick={handleNext}>
              Continue
            </button>
          )}
        </form>
      </ul>
    </div>
  );
};

Evaluation.propTypes = {};

export default Evaluation;
