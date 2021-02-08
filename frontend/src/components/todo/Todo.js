import React, {Component} from "react";
import Modal from "./Modal";
import axios from "axios";
import {Card, Button, CardTitle, CardFooter, CardText} from 'reactstrap';


class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: this.props.isAuthenticated,
            viewCompleted: false,
            activeItem: {
                title: "",
                body: "",
                done: false,
            },
            todoList: [],
        }
    }

    preLoader = () => {
        // Show text when not logged in
        if (this.state.todoList.length <= 0) {
            return <h3>You should login first...</h3>
        }
    }

    componentDidMount() {
        this.refreshList();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isAuthenticated: nextProps.isAuthenticated}, () => {
            this.refreshList();
        });
    }

    refreshList = () => {
        // Refresh the todoList by retrieving todos from the api
        if (this.state.isAuthenticated) {
            axios
                .get("http://localhost:8000/api/v1/todo/tasks/",
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': "Token " + localStorage.getItem('token'),
                        }
                    }
                )
                .then((res) => this.setState({todoList: res.data}))
                .catch((err) => console.log(err));
        } else {
            this.setState({todoList: []});
        }
    };


    displayCompleted = (status) => {
        // What tasks u wanna view? Completed or not? sets the state according to user choice
        if (status) {
            return this.setState({viewCompleted: true});
        }
        return this.setState({viewCompleted: false});
    };


    renderTabList = () => {
        // Show two clickable tabs to choose between done and not done tasks
        return (
            <div className="my-5 tab-list">
                <span onClick={() => this.displayCompleted(true)} className={this.state.viewCompleted ? "active" : ""}>
                  Complete
                </span>

                <span onClick={() => this.displayCompleted(false)} className={this.state.viewCompleted ? "" : "active"}>
                    Incomplete
                </span>
            </div>
        );
    };

    renderItems = () => {
        // return todoList objects as a bootstrap card
        const {viewCompleted} = this.state;
        const newItems = this.state.todoList.filter(
            (item) => item.done === viewCompleted
        );
        return newItems.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <Card body>
                        <CardTitle tag="h5">
                      <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`}
                            title={item.title}>
                        {item.title}
                      </span>
                        </CardTitle>

                        <CardText>
                            {item.body}
                        </CardText>

                        <span style={{marginBottom: "10px"}}>
                      <button onClick={() => this.editItem(item)}
                              className="btn btn-secondary mr-2"> {" "}Edit{" "}</button>
                      <button onClick={() => this.handleDelete(item)}
                              className="btn btn-danger">{" "}Delete{" "}</button>
                    </span>

                        <CardFooter className="text-muted">By {item.author}</CardFooter>
                    </Card>
                </li>
        ));
    };

    toggle = () => {
        this.setState({modal: !this.state.modal});
    };


    createItem = () => {
        const item = {title: "", body: "", completed: false};
        this.setState({activeItem: item, modal: !this.state.modal});
    };

    editItem = (item) => {
        this.setState({activeItem: item, modal: !this.state.modal});
    };

    handleDelete = (item) => {
        // Handle task deletion
        axios
            .delete(`http://localhost:8000/api/v1/todo/tasks/${item.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Token " + localStorage.getItem('token'),
                }
            })
            .then((res) => this.refreshList());
    };

    handleSubmit = (item) => {
        // Handle task creation or update if exists
        this.toggle();
        if (item.id) {
            axios
                .put(`http://localhost:8000/api/v1/todo/tasks/${item.id}/`, {
                    title: item.title,
                    body: item.body,
                    category: "Home",
                    done: item.done
                }, {
                    auth: {
                        username: 'user1',
                        password: 'user1'
                    }
                })
                .then((res) => this.refreshList());
            return;
        }
        axios
            .post("http://localhost:8000/api/v1/todo/tasks/", {
                title: item.title,
                body: item.body,
                category: "Home",
                done: item.done
            }, {
                auth: {
                    username: 'user1',
                    password: 'user1'
                }
            })
            .then((res) => this.refreshList());
    };

    render() {
        return (
            <main className="content">
                <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
                <div className="row ">
                    <div className="col-md-6 col-sm-10 mx-auto p-0">
                        <div className="card p-3">
                            <div className="">
                                <button onClick={this.createItem} className="btn btn-primary">
                                    Add task
                                </button>
                            </div>
                            {this.renderTabList()}
                            <ul className="list-group list-group-flush">
                                {this.preLoader()}
                                {this.renderItems()}
                            </ul>
                        </div>
                    </div>
                </div>
                {this.state.modal ? (
                    <Modal
                        activeItem={this.state.activeItem}
                        toggle={this.toggle}
                        onSave={this.handleSubmit}
                    />
                ) : null}
            </main>

        );
    }
}

export default Todo;
