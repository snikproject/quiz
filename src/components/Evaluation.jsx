/** A controlled form in a functional component. This allows the state to be updated on change, without requiring submit.
 * See <https://medium.com/swlh/building-controlled-forms-using-functional-components-in-react-965d033a89bd>. */

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

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

const Evaluation = ({ handleEvalChange }) => {
  const [inputValues, setInputValues] = useState({});
  useEffect(() => handleEvalChange(inputValues), [inputValues]);

  const handleChange = ({ target: { name, value } }) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  return (
    <div>
      <h3>Probleme melden</h3>
      <ul>
        <form>
          <EvaluationBox handleChange={handleChange} name="correct-wrong" content="Die korrekt markierte Antwort ist tatsächlich falsch." />
          <EvaluationBox handleChange={handleChange} name="incorrect-right" content="Eine falsch markierte Antwort ist tatsächlich richtig." />
          <EvaluationBox handleChange={handleChange} name="incomprehensible" content="Die Frage ist unverständlich." />
          <EvaluationBox handleChange={handleChange} name="contains-answer" content="Die Frage enthält die Antwort." />
          <EvaluationBox handleChange={handleChange} name="grammar" content="Die Frage ist grammatikalisch falsch." />
          <EvaluationBox handleChange={handleChange} name="ontology" content="Wahrscheinlich liegt ein Fehler in der SNIK Ontologie zugrunde." />
          <EvaluationBox handleChange={handleChange} name="artificial" content="Die Frage klingt künstlich." />
          <EvaluationBox handleChange={handleChange} name="undidactic" content="Die Frage ist didaktisch nicht sinnvoll." />
          <textarea className="evaluation-area" name="evaluation-area" onChange={handleChange}></textarea>
          <button type="button" disabled="true">
            Weiter
          </button>
        </form>
      </ul>
    </div>
  );
};

Evaluation.propTypes = {};

export default Evaluation;
