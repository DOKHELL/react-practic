import axios from "../../axios/axios-quiz";
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FINISH_QUIZ, QUIZ_NEXT_QUESTION,
    QUIZ_SET_STATE, RESET_QUIZ
} from "./actionTypes";

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart()); // start
        try {
            const response = await axios.get('/quizes.json');
            const quizes = [];
            for (let key in response.data) {
                quizes.push({
                    id: key,
                    name: response.data[key][1]
                });
            }
            dispatch(fetchQuizesSuccess(quizes)) //success
        } catch (error) {
            dispatch(fetchQuizesError(error)) //error
        }
    }
}
export function fetchQuizById(quizId) {
    console.log(quizId)
    return async dispatch => {
        dispatch(fetchQuizesStart()); // start
        try {
            const response = await axios.get(`/quizes/${quizId}/0.json`);
            const quiz = response.data;
            dispatch(fetchQuizSuccess(quiz));
        } catch (error) {
            dispatch(fetchQuizesError(error)) //error
        }
    }
}
export function quizAnswerClick(answerId) {
    return (dispatch, getState) => {
        const state = getState().quiz;
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quiz[state.activeQuestion];
        const results = state.results;
        if (question.rightAnswer === answerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({[answerId]: 'success'}, results));

            const timeout = window.setTimeout(() => {
                if (isQuizFinish(state)) {
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({[answerId]: 'error'}, results));
        }
    }

}
export function isQuizFinish(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}
export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }

}
export function finishQuiz() {
    return {
        type: FINISH_QUIZ,
    }
}
export function quizNextQuestion(number) {
    return {
        type: QUIZ_NEXT_QUESTION,
        number
    }
}
export function fetchQuizSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz
    }
}
export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START,
    }
}
export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes,
    }
}
export function fetchQuizesError(error) {
    return {
        type: FETCH_QUIZES_ERROR,
        error
    }
}
export function resetQuizHundler() {
    return {
        type: RESET_QUIZ,
    }
}