import React, {Component} from "react";
import Modal from "./components/todo/Modal";
import axios from "axios";
import {Card, Button, CardTitle, CardFooter, CardText, Row, Col, Nav, NavItem, NavLink} from 'reactstrap';
import LoginForm from './components/auth/LoginForm.js';
import Header from './components/global/Header.js';
import Todo from './components/todo/Todo.js';
import {
    Switch,
    Route,
    Redirect,
    Link
} from "react-router-dom";

import {withRouter} from "react-router-dom";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: localStorage.getItem('token') ? true : false,
            loginError: false,
            viewCompleted: false,
            activeItem: {
                title: "",
                body: "",
                done: false,
            },
            todoList: [],
        };
    }


    handle_app_login = (e, data) => {
        e.preventDefault();
        axios
            .post(
                "http://localhost:8000/api-token-auth/",
                {
                    username: data.username,
                    password: data.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((apiReturnData) => {
                if (apiReturnData.data.token) {
                    localStorage.setItem("token", apiReturnData.data.token);
                    this.setState({isAuthenticated: true, loginError: false}, () => {
                        console.log("Should load tasks");
                        this.props.history.push("/");
                    })
                } else {
                    console.log("No token");
                }
            }).catch((err) => this.setState({loginError: true}));

    };


    handle_logout = () => {
        localStorage.removeItem("token");
        this.setState({isAuthenticated: false, todoList: []})
        console.log("Should empty tasks");

    }


    render() {
        return (
            <main className="content">
                <Header isAuthenticated={this.state.isAuthenticated} handleLogout={this.handle_logout}/>
                <Switch>
                    <Route path="/login">
                        <LoginForm handle_login={this.handle_app_login} loginError={this.state.loginError} />
                    </Route>

                    <Route exact path="/" >
                        <Todo isAuthenticated={this.state.isAuthenticated} todoList={this.state.todoList} />
                    </Route>
                </Switch>
            </main>
        );
    }
}

export default withRouter(App);
