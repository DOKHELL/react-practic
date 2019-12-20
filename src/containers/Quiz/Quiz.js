import React, {Component} from "react";
import './Quiz.scss';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'


class Quiz extends Component {
    state = {
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        quiz: [
            {
                question: 'How color sun ?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: 'red', id: 1},
                    {text: 'yellow', id: 2},
                    {text: 'black', id: 3},
                    {text: 'green', id: 4}
                ]
            },
            {
                question: 'How year create Foto ?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: '1978', id: 1},
                    {text: '1764', id: 2},
                    {text: '1923', id: 3},
                    {text: '1846', id: 4}
                ]
            },
            {
                question: 'How year create Foto ?',
                rightAnswerId: 3,
                id: 3,
                answers: [
                    {text: '1978', id: 1},
                    {text: '1764', id: 2},
                    {text: '1923', id: 3},
                    {text: '1846', id: 4}
                ]
            },
            {
                question: 'How year create Foto ?',
                rightAnswerId: 3,
                id: 4,
                answers: [
                    {text: '1978', id: 1},
                    {text: '1764', id: 2},
                    {text: '1923', id: 3},
                    {text: '1846', id: 4}
                ]
            },
            {
                question: 'How year create Foto ?',
                rightAnswerId: 3,
                id: 5,
                answers: [
                    {text: '1978', id: 1},
                    {text: '1764', id: 2},
                    {text: '1923', id: 3},
                    {text: '1846', id: 4}
                ]
            },
        ]
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

        if (question.rightAnswerId === answerId) {
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
    }

    render() {
        return (
            <div className={'Quiz'}>
                <div className={'QuizWrapper'}>
                    <h1>Answer please...</h1>
                    {
                        this.state.isFinished ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                resetQuiz={this.resetQuizHundler}
                            /> :
                            <ActiveQuiz
                                question={this.state.quiz[this.state.activeQuestion].question}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                onAnswerClick={this.onAnswerHandler}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz;