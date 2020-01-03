import React, {Component} from "react";
import './Auth.scss';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {connect} from "react-redux";
import {auth} from "../../store/actions/auth";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите коректный емайл!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Введите коректный пароль!',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    loginHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        );
    };

    registerHandler = () => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        );
    };

    submitHandler = (e) => {
        e.preventDefault();
    };

    validateControl(value, validation) {
        if(!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = validateEmail(value) && isValid;
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid;
        }

        return isValid
    }

    OnChangeHandler = (e, controlName) => {
        const formControls = { ...this.state.formControls };
        const control = { ...formControls[controlName] };
        control.value = e.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach(name => {
           isFormValid = formControls[name].valid && isFormValid
        });

        this.setState({
            formControls, isFormValid
        })
    };

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    label={control.label}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={(e) => this.OnChangeHandler(e, controlName)}
                />
            )
        })
    }

    render() {
        return (
            <div className={'Auth'}>
                <div>
                    <h1>Вход / Регистрация</h1>
                    <form className={'AuthForm'} onSubmit={this.submitHandler}>
                        { this.renderInputs() }
                        <Button onClick={this.loginHandler}
                                type='btn-success'
                                disabled={!this.state.isFormValid}
                        >Войти</Button>
                        <Button onClick={this.registerHandler}
                                type='primary'
                                disabled={!this.state.isFormValid}
                        >Зарегистрироваться</Button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email,password,isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);