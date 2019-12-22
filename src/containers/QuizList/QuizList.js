import React, { Component } from "react";
import './QuizList.scss';
import { NavLink } from 'react-router-dom';
import Loader from "../../components/UI/Loader/Loader";
import axios from '../../axios/axios-quiz';

class QuizList extends Component {

    state = {
        quizes: [],
        loader: true,
    };

    renderQuizes() {
        return this.state.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>
                        Test {quiz.name}
                    </NavLink>
                </li>
            )
        })
    };

    async componentDidMount() {
        try {
            const response = await axios.get('/quizes.json');
            const quizes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test ${index + 1}`
                })
            });

            this.setState({
                quizes,
                loader: false,
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={'QuizList'}>
                <div>
                    <h1>Test-List</h1>
                    <ul>
                        { this.state.loader ? <Loader/> : this.renderQuizes() }
                    </ul>
                </div>
            </div>
        )
    }
}

export default QuizList;