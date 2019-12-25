import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_SET_STATE, RESET_QUIZ
} from "../actions/actionTypes";

const initialState = {
    quizes: [],
    loader: false,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: null,
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, loader: true
            };
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, loader: false, quizes: action.quizes
            };
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loader: false, error: action.error
            };
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loader: false, quiz: action.quiz
            };
        case QUIZ_SET_STATE:
            return {
                ...state, answerState: action.answerState, results: action.results
            };
        case FINISH_QUIZ:
            return {
                ...state, isFinished: true
            };
        case QUIZ_NEXT_QUESTION:
            return {
                ...state, activeQuestion: action.number, answerState: null
            };
        case RESET_QUIZ:
            return {
                ...state,
                results: {},
                isFinished: false,
                activeQuestion: 0,
                answerState: null,
            };
        default:
            return state
    }
}
