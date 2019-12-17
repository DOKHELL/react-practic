import React, {Component} from "react";
import './Quiz.scss';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";


class Quiz extends Component {
    state = {
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
        ]
    };
    onAnswerHandler = (answerId) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];

        if (question.rightAnswerId === answerId) {
            this.setState({
                answerState: {[answerId]: 'success'}
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinish()) {
                    alert('Finish Test')
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            this.setState({
                answerState: {[answerId]: 'error'},
            })
        }
    };
    isQuizFinish() {
        return this.state.activeQuestion + 1 === this.state.quiz.length;
    }

    render() {
        return (
            <div className={'Quiz'}>
                <div className={'QuizWrapper'}>
                    <h1>Answer please...</h1>
                        <ActiveQuiz
                            question={this.state.quiz[this.state.activeQuestion].question}
                            answers={this.state.quiz[this.state.activeQuestion].answers}
                            onAnswerClick={this.onAnswerHandler}
                            quizLength={this.state.quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />
                </div>
            </div>
        )
    }
}

export default Quiz;