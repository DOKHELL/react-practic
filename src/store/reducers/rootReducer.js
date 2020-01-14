import {combineReducers} from 'redux';
import quizReducer from "./quiz";
import createReducer from "./create";
import authReducer from "./auth";
import todoReducer from "./todo";

export default combineReducers({
    quiz: quizReducer,
    create: createReducer,
    auth: authReducer,
    todo: todoReducer,
})