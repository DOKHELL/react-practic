import React, { Component } from "react";
import './QuizList.scss';
import { NavLink } from 'react-router-dom';
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizes} from "../../store/actions/quiz";

class QuizList extends Component {

    renderQuizes() {
        return this.props.quizes.map((quiz) => {

            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        Test {quiz.name}
                    </NavLink>
                </li>
            )
        })
    };

    componentDidMount() {
        this.props.fetchQuizes();
    }

    render() {
        console.log(this.props)
        return (
            <div className={'QuizList'}>
                <div>
                    <h1>Test-List</h1>
                    <ul>
                        { this.props.loader ? <Loader/> : this.renderQuizes() }
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loader: state.quiz.loader
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);