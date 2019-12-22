import React, {Component} from "react";
import './Quiz.scss';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from "../../components/UI/Loader/Loader";
import axios from '../../axios/axios-quiz';

class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [],
        loading: true
    };
    onAnswerHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;
        if (question.rightAnswer === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results,
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinish()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results,
            })
        }
    };
    isQuizFinish() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }
    resetQuizHundler = () => {
        this.setState({
            results: {},
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
        })
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`);
            const quiz = response.data;

            this.setState({
                quiz,
                loading: false
            });
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={'Quiz'}>
                <div className={'QuizWrapper'}>
                    <h1>Answer please...</h1>
                    {
                        this.state.loading ? <Loader /> :
                            (this.state.isFinished ? <FinishedQuiz
                                    results={this.state.results}
                                    quiz={this.state.quiz}
                                    resetQuiz={this.resetQuizHundler}
                                /> :
                                <ActiveQuiz
                                    question={this.state.quiz[this.state.activeQuestion].question}
                                    answers={this.state.quiz[this.state.activeQuestion].answer}
                                    onAnswerClick={this.onAnswerHandler}
                                    quizLength={this.state.quiz.length}
                                    answerNumber={this.state.activeQuestion + 1}
                                    state={this.state.answerState}
                                />)
                    }
                </div>
            </div>
        )
    }
}

export default Quiz;