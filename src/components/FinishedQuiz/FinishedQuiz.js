import React from "react";
import './FinishedQuiz.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from "../UI/Button/Button";

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
                <Button
                    type={'btn-success'}
                >
                    in all list test
                </Button>
            </div>
        </div>
    )
}
export default FinishedQuiz;