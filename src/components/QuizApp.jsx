import { Component, Fragment } from 'react';
import config from '../config';
import QUESTION_DATA from '../data/quiz-data-new';
import shuffle from '../helpers/shuffle';
import Modal from './Modal';
import Quiz from './Quiz';
import Results from './Results';
import TimeUpModal from './TimeUpModal';

class QuizApp extends Component {
  state = this.getInitialState();

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  getInitialState() {
    if (config.QUESTION_SECONDS > 0) setTimeout(() => this.timerStart(), 100); // state not defined yet
    const questionCount = config.MAX_QUESTION_COUNT === 0 ? QUESTION_DATA.length : Math.min(config.MAX_QUESTION_COUNT, QUESTION_DATA.length);
    let QUESTIONS = QUESTION_DATA;
    if (!config.DETERMINISTIC) shuffle(QUESTIONS);
    QUESTIONS = QUESTIONS.slice(0, questionCount);
    for (const q of QUESTIONS) {
      const correctAnswer = q.answers[q.correct];
      q.answers = shuffle(q.answers);
      q.correct = q.answers.indexOf(correctAnswer);
    }
    return {
      questions: QUESTIONS,
      questionCount: questionCount,
      userAnswers: QUESTIONS.map(() => {
        return {
          tries: 0,
          wrong: [],
          right: null
        };
      }),
      userEvals: QUESTIONS.map(() => ({})),
      step: 1,
      score: 0,
      clockCompletions: 0,
      modal: {
        state: 'hide',
        praise: '',
        points: ''
      },
      timeUpModal: {
        state: 'hide'
      }
    };
  }

  timerStart = () => {
    if (this.state.timerStep === this.state.step) {
      console.warn(`Timer for step ${this.state.step} already exists.`);
      return;
    }
    console.debug(`timer start for step ${this.state.step}`);
    const id = setTimeout(() => this.timerEnd(this.state.step), config.QUESTION_SECONDS * 1000);
    this.setState({ timerStep: this.state.step, timeUp: false, timerId: id });
    this.setState({ clockCompletions: this.state.clockCompletions + 1 });
  };

  timerCancel = () => {
    if (!this.state.timerId) {
      console.debug('no timer to cancel');
      return;
    }
    clearTimeout(this.state.timerId);
    console.debug('timer cancel');
    this.setState({ timeUp: false, timerId: null });
  };

  timerEnd = (step) => {
    if (!this.state.timerId) {
      console.debug(`timer cancelled for step ${step}`);
      return;
    }
    if (step !== this.state.step) {
      console.warn(`outdated timer for step ${step} cancelled.`);
      return;
    }
    this.setState({ timeUp: true });
    console.debug(`time is up for step ${step}`);
    this.showTimeUpModal();
    setTimeout(this.nextStep, 1500);
  };

  handleAnswerClick = (index) => {
    const { questions, step, userAnswers } = this.state;
    if (this.state.timeUp) {
      console.warn(`Handle Answer Click: Time is Up. Ignoring Input for Step ${step}`);
      return;
    } // prevent side effects from timer being shown while users answers
    if (questions.length === 0) return;

    const currentStep = step - 1;
    const userAnswer = userAnswers[currentStep];
    if (userAnswer.right !== null || userAnswer.wrong.includes(index)) return;

    const isCorrect = questions[0].correct === index;
    const tries = userAnswer.tries;
    const updatedUserAnswer = {
      ...userAnswer,
      tries: tries + 1
    };

    if (isCorrect) {
      updatedUserAnswer.right = index;
      this.timerCancel();
      setTimeout(() => this.showModal(tries), 200);
      setTimeout(() => this.setState({ modal: { state: 'hide' } }), 2000);

      if (!config.WAIT) setTimeout(this.nextStep, config.DELAY_MS);
    } else {
      updatedUserAnswer.wrong = [...userAnswer.wrong, index];
    }

    this.setState({
      userAnswers: userAnswers.map((answer, answerIndex) => (answerIndex === currentStep ? updatedUserAnswer : answer))
    });
  };

  handleEnterPress = (index) => (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleAnswerClick(index);
    }
  };

  handleKeyDown = (event) => {
    if (event.repeat || event.ctrlKey || event.metaKey || event.altKey) return;

    const target = event.target;
    if (target.isContentEditable || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') return;

    const { questions, step, questionCount } = this.state;
    if (questions.length === 0 || step > questionCount) return;
    if (!/^[a-d]$/i.test(event.key)) return;

    const index = event.key.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
    if (index >= questions[0].answers.length) return;

    event.preventDefault();
    this.handleAnswerClick(index);
  };

  handleEvalChange = (inputValues) => {
    const { step, userEvals } = this.state;
    const currentStep = step - 1;
    userEvals[currentStep] = inputValues;

    this.setState({ userEvals: userEvals });
  };

  showModal = (tries) => {
    let praise;
    let points;

    switch (tries) {
      case 0: {
        praise = '1st Try!';
        points = '+23';
        break;
      }
      case 1: {
        praise = '2nd Try!';
        points = '+11';
        break;
      }
      case 2: {
        praise = '3rd Try';
        points = '+5';
        break;
      }
      default: {
        praise = 'Last Try';
        points = '+0';
      }
    }

    this.setState({
      modal: {
        state: 'show',
        praise,
        points
      }
    });
  };

  showTimeUpModal = () => {
    this.setState({
      timeUpModal: {
        state: 'show'
      }
    });
  };

  nextStep = () => {
    const { questions, userAnswers, step, score } = this.state;
    const restOfQuestions = questions.slice(1);
    const currentStep = step - 1;
    const tries = userAnswers[currentStep].tries;

    this.setState({
      step: step + 1,
      score: this.updateScore(tries, score),
      questions: restOfQuestions,
      modal: { state: 'hide' },
      timeUpModal: { state: 'hide' }
    });
    if (restOfQuestions.length > 0 && config.QUESTION_SECONDS > 0) this.timerStart();
  };

  updateScore(tries, score) {
    switch (tries) {
      case 1:
        return score + 23;
      case 2:
        return score + 11;
      case 3:
        return score + 5;
      default:
        return score + 0;
    }
  }

  restartQuiz = () => {
    this.setState(this.getInitialState());
    console.log('Restarted');
  };

  render() {
    const { step, questions, userAnswers, userEvals, questionCount, score, modal, timeUpModal } = this.state;

    if (step >= questionCount + 1) {
      return <Results score={score} restartQuiz={this.restartQuiz} userAnswers={userAnswers} userEvals={userEvals} />;
    } else
      return (
        <Fragment>
          <Quiz
            state={this.state}
            step={step}
            questions={questions}
            questionCount={questionCount}
            score={score}
            handleAnswerClick={this.handleAnswerClick}
            handleEnterPress={this.handleEnterPress}
            handleEvalChange={this.handleEvalChange}
            handleNext={this.nextStep}
          />
          {modal.state === 'show' && <Modal modal={modal} />}
          {timeUpModal.state === 'show' && <TimeUpModal modal={timeUpModal} />}
        </Fragment>
      );
  }
}

export default QuizApp;
