import React, {Component} from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';

import {
    Link
} from "react-router-dom";


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            setIsOpen: false
        }
    }

    toggle = () => this.state.setIsOpen(!this.state.isOpen);

    ShowLoginOrLogoutButton() {
        if (this.props.isAuthenticated) {
            return <Link style={{color: "red", paddingLeft: "10px", textDecoration: "none"}} onClick={this.props.handleLogout}>Logout</Link>
        }
        else{
            return <Link style={{paddingLeft: "10px", textDecoration: "none"}} to="/login">Login</Link>
        }
    }

    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">Todo</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                {this.ShowLoginOrLogoutButton()}
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;
