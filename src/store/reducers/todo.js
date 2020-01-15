import {
    ADD_TODO_TO_LIST,
    CHANGE_VALUE,
    CHANGE_VALUE_EMAIL,
    INVALID_VALUE,
    RESET_ALL_TODOS,
    RESET_VALUE_TODO
} from "../actions/actionTypes";

const initialState = {
    todos: [],
    value: '',
    helperIsVisible: false,
    invalid: false,
    email: ''
};


export default function todoReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO_TO_LIST:
            return {
                ...state, todos: action.todos, invalid: false
            };
        case CHANGE_VALUE:
            return {
                ...state, value: action.value
            };
        case RESET_VALUE_TODO:
            return {
                ...state, value: '', invalid: false
            };
        case RESET_ALL_TODOS:
            return {
                ...state, todos: [], invalid: false
            };
        case INVALID_VALUE:
            return {
                ...state, invalid: true
            };
        case CHANGE_VALUE_EMAIL:
            return {
                ...state, email: action.value
            };
        default:
            return state
    }
}
