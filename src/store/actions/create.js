import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function createQuizQuestion(item, name) {
    if (name) {
        return {
            type: CREATE_QUIZ_QUESTION,
            item,
            name
        }
    } else {
        return {
            type: CREATE_QUIZ_QUESTION,
            item
        }
    }

}
export function ResetQuizCreation() {
    return {
        type: RESET_QUIZ_CREATION,
    }
}
export function finishCreateQuiz() {
    return async (dispatch, getState) => {
        const data = [getState().create.quiz, getState().create.testName];
        await axios.post('/quizes.json', data);
        dispatch(ResetQuizCreation())
    }
}