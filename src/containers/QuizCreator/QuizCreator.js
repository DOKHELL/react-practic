import React, {Component} from "react";
import './QuizCreator.scss';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Select from "../../components/UI/Select/Select";
import {connect} from "react-redux";
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";


function createOptionControl(number) {
    return createControl({
        label: `Вариант ответа ${number}`,
        errorMessage: 'Поле не может быть пустым!',
        id: number,
    }, {required: true})
}

function createFormControls() {
    return {
        testName: createControl({
            label: 'Введите название теста',
            errorMessage: 'Поле не может быть пустым!',
        }, {required: true}),
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Поле не может быть пустым!',
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
        testName: null
    };

    submitHandler = (e) => {
        e.preventDefault();
    };

    addQuestionHandler = (e) => {
        e.preventDefault();
        const {testName, question, option1, option2, option3, option4} = this.state.formControls;
        const questionItem = {
            question: question.value,
            rightAnswer: this.state.rightAnswerId,
            id: this.props.quiz.length + 1,
            answer: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        };
        if (this.state.testName) {
            this.props.createQuizQuestion(questionItem);
        } else {
            const name = testName.value;
            this.setState({
                testName: name,
            });
            this.props.createQuizQuestion(questionItem, name);
        }
        const formControls = createFormControls();
        delete formControls.testName;
         this.setState({
             isFormValid: false,
             rightAnswerId: 1,
             formControls: formControls
         });
    };

    createQuestionHandler = e => {
        e.preventDefault();

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
            testName: null
        });
        this.props.finishCreateQuiz()
    };

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };

        control.value = value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    };
    onSelectHandler = e => {
        this.setState({
            rightAnswerId: +e.target.value,
        })
    };

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
                <React.Fragment key={index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={e => this.changeHandler(e.target.value, controlName)}
                    />
                    { index === 1 ? <hr/> : null }
                </React.Fragment>
            )
        })
    };

    render() {
        return (
            <div className={'QuizCreator'}>
                <div>
                    <h1>Создание теста</h1>

                    <form onSubmit={this.submitHandler}>
                        { this.renderInputs() }

                        <Select
                            label={'Выберите правильный номер ответа'}
                            value={this.state.rightAnswerId}
                            onChange={this.onSelectHandler}
                            options={[
                                {text: '1', value: '1'},
                                {text: '2', value: '2'},
                                {text: '3', value: '3'},
                                {text: '4', value: '4'},
                            ]}
                        />

                        <Button
                            type='primary'
                            onClick={this.addQuestionHandler}
                            disabled={!this.state.isFormValid}
                        >Добавить вопрос в тест
                        </Button>
                        <Button
                            type='btn-success'
                            onClick={this.createQuestionHandler}
                            disabled={this.props.quiz.length < 2}
                        >Создать тест
                        </Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        quiz: state.create.quiz
    }
}
function mapDispatchToProps(dispatch) {
    return {
        createQuizQuestion: (item, name) => dispatch(createQuizQuestion(item, name)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);