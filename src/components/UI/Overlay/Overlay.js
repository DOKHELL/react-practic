import React from "react";
import './Overlay.scss'

const Overlay = props => {
    let cls = ['overlay'];
    if ( props.visible ) {
        cls.push('height')
    }
    return (
        <div className={cls.join(' ')}>
            <i onClick={props.onClick} className="closeTips">&times;</i>
            <ul className="tips">
                <li>Для добавления списка дел напишите текст в поле ввода и нажмите Ввод(Enter) на клавиатуре</li>
                <li>Чтобы удалить один пункт, наведите на него и нажмите на значок корзины</li>
                <li>Чтобы удалить все списки дел, нажмите "Очистить"</li>
                <li>Нажмите "Сохранить", чтобы сохранить список дел на потом</li>
            </ul>
        </div>
    )
};

export default Overlay;