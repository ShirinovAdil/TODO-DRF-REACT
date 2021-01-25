import React, {Component} from 'react';
import {Nav, NavItem, NavLink} from 'reactstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import LoginForm from "../auth/LoginForm";


class Header extends Component {

    constructor(props) {
        super(props);
    }

    ShowLogoutButton() {
        if (this.props.isAuthenticated) {
            return <NavLink style={{color: "red"}} href="#" onClick={this.props.handleLogout}>Logout</NavLink>
        }
    }

    render() {
        return (
                <div>
                    <Nav>
                        <NavItem>
                            <Link to="/login">Sign in</Link>
                        </NavItem>
                        <NavItem>
                            {this.ShowLogoutButton()}
                        </NavItem>
                    </Nav>
                </div>
        );
    }
}

export default Header;
