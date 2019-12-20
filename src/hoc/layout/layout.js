import React, {Component} from "react";
import './Layout.scss';
import MenuToggle from "../../components/Navigation/MenuToggle/MenuToggle";
import Drawer from "../../components/Navigation/Drawer/Drawer";

class Layout extends Component {

    state = {
        menu: false
    };

    toggleMenuHandler = () => {
        this.setState({
            menu: !this.state.menu
        })
    };
    BackDropHandler = () => {
        this.setState({
            menu: false
        })
    };

    render() {
        return (
            <div className={'Layout'}>
                <Drawer backDropClick={this.BackDropHandler} isOpen={this.state.menu}/>
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

export default Layout;