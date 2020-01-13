import React, {Component} from "react";
import './Quiz.scss';
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, resetQuizHundler} from "../../store/actions/quiz";

class Quiz extends Component {


    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }
    componentWillUnmount() {
        this.props.resetQuizHundler()
    }
    render() {
        return (
            <div className={'Quiz'}>
                <div className={'QuizWrapper'}>
                    <h1>Answer please...</h1>
                    {
                        this.props.loader || !this.props.quiz ? <Loader /> :
                            (this.props.isFinished ? <FinishedQuiz
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    resetQuiz={this.props.resetQuizHundler}
                                /> :
                                <ActiveQuiz
                                    question={this.props.quiz[this.props.activeQuestion].question}
                                    answers={this.props.quiz[this.props.activeQuestion].answer}
                                    onAnswerClick={this.props.quizAnswerClick}
                                    quizLength={this.props.quiz.length}
                                    answerNumber={this.props.activeQuestion + 1}
                                    state={this.props.answerState}
                                />)
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loader: state.quiz.loader
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        resetQuizHundler: () => dispatch(resetQuizHundler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);