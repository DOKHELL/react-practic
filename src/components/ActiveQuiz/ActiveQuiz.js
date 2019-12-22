import React from "react";
import './ActiveQuiz.scss';
import AnswerList from "./AnswerList/AnswerList";

const ActiveQuiz = props => (
    <div className={'ActiveQuiz'}>
        <p className={'Question'}>
            <span>
                <strong>{props.question}</strong>
            </span>
            <small>{props.answerNumber} из {props.quizLength}</small>
        </p>
        <AnswerList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
        />
    </div>
);

export default ActiveQuiz;