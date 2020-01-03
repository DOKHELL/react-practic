import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "../actions/actionTypes";

const initialState = {
    quiz: [],
    testName: null,
};

export default function createReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            if (action.name) {
                return {
                    ...state,
                    quiz: [...state.quiz, action.item],
                    testName: action.name
                };
            } else {
                return {
                    ...state,
                    quiz: [...state.quiz, action.item]
                };
            }

        case RESET_QUIZ_CREATION:
            return {
                ...state, quiz: []
            };
        default:
            return state
    }
}