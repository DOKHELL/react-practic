import React, {Component} from "react";
import './QuizCreator.scss';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {createControl} from "../../form/formFramework";

function createOptionControl(number) {
    return createControl({
        label: `Variation ${number}`,
        errorMessage: 'Question cant was empty!',
        id: number,
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Enter question',
            errorMessage: 'Question cant was empty!',
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        quiz: [],
        formControls: createFormControls()
    };

    submitHandler = (e) => {
        e.preventDefault();
    };

    addQuestionHandler = () => {

    };

    createQuestionHandler = () => {

    };

    changeHandler = (value, controlName) => {

    };

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]

            return (
                <Input
                    key={index}
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    touched={control.touched}
                    errorMessage={control.errorMessage}
                    onChange={e => this.changeHandler(e.target.value, controlName)}
                />
            )
        })
    };

    render() {
        return (
            <div className={'QuizCreator'}>
                <div>
                    <h1>Create Test</h1>

                    <form onSubmit={this.submitHandler}>
                        { this.renderInputs() }
                        <select>

                        </select>

                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                        >Add question
                        </Button>
                        <Button
                            type='success'
                            onClick={this.createQuestionHandler}
                        >Create test
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

export default QuizCreator;