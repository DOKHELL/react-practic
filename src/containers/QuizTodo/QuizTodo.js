import React, {Component} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import './QuizTodo.scss';
import TodoInput from "../../components/UI/TodoInput/TodoInput";
import TodoList from "../../components/TodoList/TodoList";
import Button from "../../components/UI/Button/Button";
import Overlay from "../../components/UI/Overlay/Overlay";


class QuizTodo extends Component {
    state = {
        todos: [],
        value: '',
        helperIsVisible: false
    };
    onChangeHandler = (e) => {
        this.setState({
            value: e.target.value
        })
    };

    KeyHandler = (e) => {
        if (e.keyCode === 13) {
            this.addTodoItem(e.target.value)
        }
    };

    addTodoItem = (value) => {
        const todos = [...this.state.todos];
        todos.push(value);
        this.setState({
            todos: todos,
            value: ''
        })

    };

    clearInput = () => {
        this.setState({
            todos: []
        })
    };
    HelpInfoShower = () => {
        this.setState({
            helperIsVisible: !this.state.helperIsVisible
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
                        value={this.state.value}
                        placeholder={'Добавить список'}
                        onKeyUp={this.KeyHandler}
                        onChange={this.onChangeHandler}
                    />
                    <TodoList todos={this.state.todos}/>
                    <div className={'todo-buttons'}>
                        <Button
                            type={'todo-button'}
                            disabled={false}
                            onClick={this.addTodoItem}
                        >
                            Отправить на Email
                        </Button>
                        <Button
                            type={'todo-button'}
                            disabled={false}
                            onClick={this.clearInput}
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
            </div>
            )
    }
}

export default QuizTodo;