import { Fragment, Component } from 'react';
import Quiz from './Quiz';
import Modal from './Modal';
import TimeUpModal from './TimeUpModal';
import Results from './Results';
import shuffle from '../helpers/shuffle';
import QUESTION_DATA from '../data/quiz-data';
import config from '../config';

class QuizApp extends Component {
  state = this.getInitialState();

  getInitialState() {
    if (config.QUESTION_SECONDS > 0) setTimeout(() => this.timerStart(), 100); // state not defined yet
    const questionCount =
      config.MAX_QUESTION_COUNT === 0
        ? QUESTION_DATA.length
        : Math.min(config.MAX_QUESTION_COUNT, QUESTION_DATA.length);
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
          tries: 0
        };
      }),
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
      console.warn('Timer for step ' + this.state.step + ' already exists.');
      return;
    }
    console.debug('timer start for step ' + this.state.step);
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
      console.debug('timer cancelled for step ' + step);
      return;
    }
    if (step !== this.state.step) {
      console.warn('outdated timer for step ' + step + 'cancelled.');
      return;
    }
    this.setState({ timeUp: true });
    console.debug('time is up for step ' + step);
    this.showTimeUpModal();
    setTimeout(this.nextStep, 1500);
  };

  handleAnswerClick = (index) => (e) => {
    const { questions, step, userAnswers } = this.state;
    if (this.state.timeUp) {
      console.warn('Handle Answer Click: Time is Up. Ignoring Input for Step ' + step);
      return;
    } // prevent side effects from timer being shown while users answers

    const isCorrect = questions[0].correct === index;
    const currentStep = step - 1;
    const tries = userAnswers[currentStep].tries;
    if (isCorrect && e.target.nodeName === 'LI') {
      this.timerCancel();
      // Prevent other answers from being clicked after correct answer is clicked
      e.target.parentNode.style.pointerEvents = 'none';

      e.target.classList.add('right');

      userAnswers[currentStep] = {
        tries: tries + 1
      };

      this.setState({
        userAnswers: userAnswers
      });

      setTimeout(() => this.showModal(tries), 750);

      setTimeout(this.nextStep, 1500);
    } else if (e.target.nodeName === 'LI') {
      e.target.style.pointerEvents = 'none';
      e.target.classList.add('wrong');

      userAnswers[currentStep] = {
        tries: tries + 1
      };

      this.setState({
        userAnswers: userAnswers
      });
    }
  };

  handleEnterPress = (index) => (e) => {
    if (e.keyCode === 13) {
      this.handleAnswerClick(index)(e);
    }
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
    const { step, questions, userAnswers, questionCount, score, modal, timeUpModal } = this.state;

    if (step >= questionCount + 1) {
      return <Results score={score} restartQuiz={this.restartQuiz} userAnswers={userAnswers} />;
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
          />
          {modal.state === 'show' && <Modal modal={modal} />}
          {timeUpModal.state === 'show' && <TimeUpModal modal={timeUpModal} />}
        </Fragment>
      );
  }
}

export default QuizApp;
