/** A controlled form in a functional component. This allows the state to be updated on change, without requiring submit.
 * See <https://medium.com/swlh/building-controlled-forms-using-functional-components-in-react-965d033a89bd>. */

import PropTypes from 'prop-types';
import { useState } from 'react';

const Evaluation = ({}) => {
  const [inputValues, setInputValues] = useState({});

  const handleChange = ({ target: { name, value } }) => {
    setInputValues({
      ...inputValues,
      [name]: value
    });
    console.log(name, value);
    console.log(inputValues);
  };

  const EvaluationBox = ({ name, content }) => {
    //const [checked, setChecked] = useState(false);
    return (
      <li className="evaluation-problem">
        <label>
          <input type="checkbox" name={name} onChange={handleChange} />
          {content}
        </label>
      </li>
    );
  };

  return (
    <div>
      <h3>Probleme melden</h3>
      <ul>
        <form>
          <EvaluationBox name="correct-wrong" content="Die korrekt markierte Antwort ist tatsächlich falsch." />
          <EvaluationBox name="incorrect-right" content="Eine falsch markierte Antwort ist tatsächlich richtig." />
          <EvaluationBox name="incomprehensible" content="Die Frage ist unverständlich." />
          <EvaluationBox name="contains-answer" content="Die Frage enthält die Antwort." />
          <EvaluationBox name="grammar" content="Die Frage ist grammatikalisch falsch." />
          <EvaluationBox name="ontology" content="Wahrscheinlich liegt ein Fehler in der SNIK Ontologie zugrunde." />
          <EvaluationBox name="artificial" content="Die Frage klingt künstlich." />
          <EvaluationBox name="undidactic" content="Die Frage ist didaktisch nicht sinnvoll." />
          <textarea className="evaluation-area" name="evaluation-area" onChange={handleChange}></textarea>
        </form>
      </ul>
    </div>
  );
};

Evaluation.propTypes = {};

export default Evaluation;
