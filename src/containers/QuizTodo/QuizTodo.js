import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './QuizTodo.scss';
import TodoInput from "../../components/UI/TodoInput/TodoInput";
import TodoList from "../../components/TodoList/TodoList";
import Button from "../../components/UI/Button/Button";
import Overlay from "../../components/UI/Overlay/Overlay";
import {connect} from "react-redux";
import { checkLocalStorage, changeValue, KeyHandler, resetTodos, sendEmail} from "../../store/actions/todo";
import EmailFormTodo from "../../components/EmailFormTodo/EmailFormTodo";


class QuizTodo extends Component {
    state = {
        helperIsVisible: false,
        EmailSenderIsVisible: false
    };
  componentDidMount() {
     this.props.checkLocalStorage()
    }
    HelpInfoShower = () => {
        this.setState({
            helperIsVisible: !this.state.helperIsVisible
        })
    };
    ShowEmailForm = () => {
        this.setState({
            EmailSenderIsVisible: !this.state.EmailSenderIsVisible
        })
    };

    render() {
        return (
            <div className={'todo-wrapper'}>
                <div className={'todo'}>
                    <h1 className={'todo-title'}>Мои списки дел
                        <FontAwesomeIcon
                            icon={faPencilAlt}
                        />
                    </h1>
                    <TodoInput
                        value={this.props.value}
                        placeholder={'Добавить список'}
                        onKeyUp={this.props.KeyHandler}
                        onChange={this.props.changeValue}
                        invalid={this.props.invalid}
                    />
                    <TodoList
                        todos={this.props.todos}
                        сlick={this.test}
                    />
                    <div className={'todo-buttons'}>
                        <Button
                            type={'todo-button'}
                            disabled={false}
                            onClick={this.ShowEmailForm}
                        >
                            Отправить на Email
                        </Button>
                        <Button
                            type={'todo-button'}
                            disabled={false}
                            onClick={this.props.resetTodos}
                        >
                            Очистить
                        </Button>
                        <Button
                            type={'todo-button'}
                            disabled={false}
                            onClick={this.HelpInfoShower}
                        >
                            Справка
                        </Button>
                    </div>
                </div>
                <Overlay
                    visible={this.state.helperIsVisible}
                    onClick={this.HelpInfoShower}
                />
                <EmailFormTodo
                    visible={this.state.EmailSenderIsVisible}
                    onClick={this.props.sendEmail}
                    close={this.ShowEmailForm}
                />
            </div>
            )
    }
}
function mapStateToProps(state) {
    return {
        todos: state.todo.todos,
        value: state.todo.value,
        helperIsVisible: state.todo.helperIsVisible,
        invalid: state.todo.invalid
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changeValue: (e) => dispatch(changeValue(e)),
        KeyHandler: (e) => dispatch(KeyHandler(e)),
        checkLocalStorage: () => dispatch(checkLocalStorage()),
        resetTodos: () => dispatch(resetTodos()),
        sendEmail: () => dispatch(sendEmail())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizTodo);