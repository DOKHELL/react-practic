import React from "react";
import './FinishedQuiz.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from "../UI/Button/Button";
import { Link } from 'react-router-dom';

const FinishedQuiz = props => {

    const totalRight = Object.keys(props.results).reduce((total, key) => {
        if(props.results[key] === 'success') {
            total++
        }
        return total;
    }, 0);
    return (
        <div className={'FinishedQuiz'}>
            <ul>
                { props.quiz.map((quizItem, index) => {

                    const cls = [
                        'icon',
                        props.results[quizItem.id] !== 'error' ? 'success' : 'error',
                    ];
                    const ico = [
                        props.results[quizItem.id] !== 'error' ? faCheck : faTimes
                    ];
                    return (
                        <li key={index}>
                            <strong>{index+1}.</strong>
                            {quizItem.question}
                            <FontAwesomeIcon
                                icon={ico[0]}
                                className={cls.join(' ')}
                            />
                        </li>
                    )
                })}
            </ul>
            <p>Right {totalRight} из {props.quiz.length}</p>
            <div>
                <Button
                    onClick={props.resetQuiz}
                    type={'primary'}
                >
                    restart
                </Button>
                <Link to={'/'}>
                    <Button
                        type={'btn-success'}
                    >Go to all list test
                    </Button>
                </Link>
            </div>
        </div>
    )
}
export default FinishedQuiz;