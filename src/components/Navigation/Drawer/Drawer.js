import React, {Component} from "react";
import './Drawer.scss';
import {NavLink} from 'react-router-dom';
import BackDrop from "../../UI/BackDrop/BackDrop";

const links = [
    {to: '/', label: 'List', exact: true},
    {to: '/auth', label: 'SingIn', exact: false},
    {to: '/quiz-creator', label: 'Create test', exact: false},
];

class Drawer extends Component {

    renderLinks() {
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
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        { this.renderLinks() }
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.backDropClick}/> : null}
            </React.Fragment>
        )
    }
}

export default Drawer;