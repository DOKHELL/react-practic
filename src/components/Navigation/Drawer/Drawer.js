import React, {Component} from "react";
import './Drawer.scss';
import {NavLink} from 'react-router-dom';
import BackDrop from "../../UI/BackDrop/BackDrop";


class Drawer extends Component {

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={'active'}
                        onClick={this.props.backDropClick}
                    >
                        {link.label}
                    </NavLink>
                </li>
            )

        })
    }

    render() {
        const cls = [
            'Drawer',
            !this.props.isOpen ? 'close' : null
        ];
        const links = [
            {to: '/', label: 'Список тестов', exact: true},
        ];
        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: 'Создать тест', exact: false});
            links.push({to: '/quiz-todo', label: 'Создать список задач', exact: false});
            links.push({to: '/logout', label: 'Выйти', exact: false})
        } else {
            links.push({to: '/auth', label: 'Войти/Регистрация', exact: false})
        }
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks(links) }
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.backDropClick}/> : null}
            </React.Fragment>
        )
    }
}

export default Drawer;