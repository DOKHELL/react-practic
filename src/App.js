import React, {Component} from 'react';
import Layout from "./hoc/layout/layout";
import {Route, Switch, withRouter} from 'react-router-dom';
import QuizList from "./containers/QuizList/QuizList";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import Quiz from './containers/Quiz/Quiz';
import {connect} from "react-redux";
import {Redirect} from 'react-router-dom';
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./store/actions/auth";
import QuizTodo from "./containers/QuizTodo/QuizTodo";

class App extends Component {
    componentDidMount() {
        this.props.autoLogin()

    }

    render() {

        let routes = (
            <Switch>
                <Route path="/auth" component={Auth} />
                <Route path="/quiz/:id" component={Quiz} />
                <Route path="/" exact component={QuizList} />
                {/*<Redirect to={'/auth'} />*/}
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path="/quiz-creator" component={QuizCreator} />
                    <Route path="/quiz/:id" component={Quiz} />
                    <Route path="/quiz-todo" component={QuizTodo} />
                    <Route path='/logout' component={Logout}/>
                    <Route path="/" exact component={QuizList} />
                    {/*<Redirect to={'/'} />*/}
                </Switch>
            );
        }
        return (
            <Layout>
                { routes }
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
