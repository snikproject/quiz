import PropTypes from 'prop-types';

const EvaluationBox = ({ content}) => {
  return (
    <li className="evaluation-problem"><label><input type="checkbox"></input>{content}</label></li>
  );
}

const Evaluation = ({ }) => {
  return (
    <div>
    <h3>Probleme melden</h3>
    <ul>
      <EvaluationBox content="Die korrekt markierte Antwort ist tatsächlich falsch."/>
      <EvaluationBox content="Eine falsch markierte Antwort ist tatsächlich richtig."/>
      <EvaluationBox content="Die Frage ist unverständlich."/>
      <EvaluationBox content="Die Frage enthält die Antwort."/>
      <EvaluationBox content="Die Frage ist grammatikalisch falsch."/>
      <EvaluationBox content="Wahrscheinlich liegt ein Fehler in der SNIK Ontologie zugrunde."/>
      <EvaluationBox content="Die Frage klingt künstlich."/>
      <EvaluationBox content="Die Frage ist didaktisch nicht sinnvoll."/>
      <textarea className="evaluation-area"></textarea>
    </ul>
    </div>
    /*
    <li className="question">
      <h2 className="question-title" tabIndex="0">
        {question}
      </h2>
      <ul className="question-answers" tabIndex="-1">
      </ul>
    </li>
    */
  );
};

Evaluation.propTypes = {
};

export default Evaluation;
