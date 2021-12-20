import PropTypes from 'prop-types';
import { useState } from 'react';

const EvaluationBox = ({ id, content }) => {
  //const [checked, setChecked] = useState(false);
  return (
    <li className="evaluation-problem">
      <label>
        <input type="checkbox" id="{id}" />
        {content}
      </label>
    </li>
  );
};

const Evaluation = ({ handleSubmit }) => {
  return (
    <div>
      <h3>Probleme melden</h3>
      <ul>
        <form onSubmit={handleSubmit}>
          <EvaluationBox id="correct-wrong" content="Die korrekt markierte Antwort ist tatsächlich falsch." />
          <EvaluationBox id="incorrect-right" content="Eine falsch markierte Antwort ist tatsächlich richtig." />
          <EvaluationBox id="incomprehensible" content="Die Frage ist unverständlich." />
          <EvaluationBox id="contains-answer" content="Die Frage enthält die Antwort." />
          <EvaluationBox id="grammar" content="Die Frage ist grammatikalisch falsch." />
          <EvaluationBox id="ontology" content="Wahrscheinlich liegt ein Fehler in der SNIK Ontologie zugrunde." />
          <EvaluationBox id="artificial" content="Die Frage klingt künstlich." />
          <EvaluationBox id="undidactic" content="Die Frage ist didaktisch nicht sinnvoll." />
          <textarea className="evaluation-area"></textarea>
          <input type="submit" value="Submit" />
        </form>
      </ul>
    </div>
  );
};

Evaluation.propTypes = {};

export default Evaluation;
