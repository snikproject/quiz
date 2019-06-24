import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Quiz from './Quiz';
import Modal from './Modal';
import TimeUpModal from './TimeUpModal';
import Results from './Results';
import shuffle from '../helpers/shuffle';
import QUESTION_DATA from '../data/quiz-data';

class QuizApp extends Component {
  state = this.getInitialState(this.props.totalQuestions);

  static propTypes = {
    totalQuestions: PropTypes.number.isRequired
  };

  getInitialState(totalQuestions) {
    for(let i=0;i<1;i++) setTimeout(()=>this.timeUp(),1000);
    totalQuestions = Math.min(totalQuestions, QUESTION_DATA.length);
    const QUESTIONS = shuffle(QUESTION_DATA).slice(0, totalQuestions);
    for(const q of QUESTIONS)
    {
     const correctAnswer = q.answers[q.correct];
     q.answers=shuffle(q.answers);
     q.correct=q.answers.indexOf(correctAnswer);
    }
    return {
      questions: QUESTIONS,
      totalQuestions: totalQuestions,
      userAnswers: QUESTIONS.map(() => {
        return {
          tries: 0
        }
      }),
      step: 1,
      score: 0,
      modal: {
        state: 'hide',
        praise: '',
        points: ''
      },
      timeUpModal: {
        state: 'hide',
      }

    };
  }

  handleAnswerClick = (index) => (e) => {
    const { questions, step, userAnswers } = this.state;
    const isCorrect = questions[0].correct === index;
    const currentStep = step - 1;
    const tries = userAnswers[currentStep].tries;

    if (isCorrect && e.target.nodeName === 'LI') {
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

      setTimeout(this.nextStep, 2750);
    }

    else if (e.target.nodeName === 'LI') {
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


  timeUp = () => {
    console.log("Time Is Up");
/*
    const { questions, step, userAnswers } = this.state;
    const currentStep = step - 1;
    const tries = userAnswers[currentStep].tries;
    */
    setTimeout(() => this.showTimeUpModal(), 750);
    setTimeout(this.nextStep, 2750);
    /*

    const isCorrect = questions[0].correct === index;
    const currentStep = step - 1;

    userAnswers[currentStep] = {
        tries: tries + 1
      };
*/

/*    const { questions, step, userAnswers } = this.state;
    const currentStep = step - 1;
    const tries = userAnswers[currentStep].tries;

  //    e.target.classList.add('right');
      setTimeout(() => this.showModal(tries), 750);

  */
  //this.nextStep();

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
        state: 'show',
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
      modal: {
        state: 'hide'
      }
    });
  };

  updateScore(tries, score) {
    switch (tries) {
      case 1: return score + 23;
      case 2: return score + 11;
      case 3: return score + 5;
      default: return score + 0;
    }
  }

  restartQuiz = () => {
    this.setState({
      ...this.getInitialState(this.props.totalQuestions)
    });
  };

  render() {
    const { step, questions, userAnswers, totalQuestions, score, modal, timeUpModal } = this.state;

    if (step >= totalQuestions + 1) {
      return (
        <Results
          score={score}
          restartQuiz={this.restartQuiz}
          userAnswers={userAnswers}
        />
      );
    } else return (
      <Fragment>
        <Quiz
          step={step}
          questions={questions}
          totalQuestions={totalQuestions}
          score={score}
          handleAnswerClick={this.handleAnswerClick}
          handleEnterPress={this.handleEnterPress}
        />
        { modal.state === 'show' && <Modal modal={modal} /> && <TimeUpModal timeUpModal={timeUpModal} /> }
      </Fragment>
    );
  }
}

export default QuizApp;
