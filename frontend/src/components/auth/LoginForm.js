import axios from "axios";
import React from "react";
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Col, NavLink
} from "reactstrap";

class LoginForm extends React.Component {
  state = {
    username: "",
    password: "",
    wrongCredentials: true
  };

  handle_change = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState((prevstate) => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  showLoginErrorMsg = () => {
    if(this.props.loginError){
      return <h5 style={
        {color:"#96260f",
        textAlign:"center",
        paddingTop:10}
      }>Wrong Credentials</h5>
    }
  }

  render() {
    return (
      <Container>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Form md="3" onSubmit={(e) => {
            this.props.handle_login(e, this.state);
            this.setState({
              username: "",
              password: ""
            });
          }
        }>
          <h1 style={{textAlign:"center", color:"white"}}>Log in</h1>
          {this.showLoginErrorMsg()}
          <FormGroup>
            <Label for="loginUsernameField" style={{color:"white"}}>Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              id="loginUsernameField"  
              value={this.state.username}
              onChange={(e)=>this.handle_change(e)}
            />
          </FormGroup>

          <FormGroup>
            <Label for="loginPasswordField" style={{color:"white"}}>Password</Label>
            <Input
              type="password"
              name="password"
              id="loginPasswordField"
              placeholder="Enter your password"
              value={this.state.password}
              onChange={(e)=>this.handle_change(e)}
            />
          </FormGroup>

          <Button className="btn btn-dark btn-lg btn-block" type="submit" >
            Log in
          </Button>
        </Form>
        </Col>
      </Container>
    );
  }
}

export default LoginForm;
