import React from "react";
import Button from "../UI/Button/Button";
import '../UI/Overlay/Overlay.scss';
import TodoInput from "../UI/TodoInput/TodoInput";

const EmailFormTodo = props => {
    let cls = ['overlayEmail'];
    if ( props.visible ) {
        cls.push('height')
    }
    return (
            <div className={cls.join(' ')}>
                <a className="closeEmailForm">&times;</a>
                <form name="EmailForm">
                    <TodoInput
                        type={'email'}
                        placeholder={'Введите емайл для отправки'}

                    />
                    <Button
                        className="sendEmail"
                        type={'todo-button'}
                        disabled={false}
                        onClick={props.onClick}
                    >Отправить</Button>
                </form>
            </div>
    )
}

export default EmailFormTodo;