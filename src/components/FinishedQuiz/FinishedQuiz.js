import React from "react";
import './FinishedQuiz.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'

const FinishedQuiz = props => {
    return (
        <div className={'FinishedQuiz'}>
            <ul>
                { props.quiz.map((quizItem, index) => {

                    const cls = [
                        'icon',
                        props.results[quizItem.id] !== 'error' ? 'success' : 'error',
                    ];
                    const ico = [
                        props.results[quizItem.id] === 'success' ? faCheck : faTimes
                    ];
                    return (
                        <li key={index}>
                            <strong>{index+1}.</strong>
                            {quizItem.question}
                            <FontAwesomeIcon
                                icon={ico.join()}
                                className={cls.join(' ')}

                            />
                        </li>
                    )
                })}
            </ul>

            <p>Right {''} из {''}</p>
            <div>
                <button>Replace</button>
            </div>
        </div>
    )
}
export default FinishedQuiz;