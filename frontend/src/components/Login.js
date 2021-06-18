import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Container, FormControl } from "react-bootstrap";
import Navbar from './Navbar';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  async componentDidMount(){
    await axios.get("/logout");
  }

  submitHandler = async (e) => {
    e.preventDefault();
    let response = await axios.post("/login", this.state);
    if (response.data === "nouser") {
      console.log("error");
    } else {
      this.props.history.push("/blogs");
    }
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
      <Navbar authpage="true"/>
        <Container style={{maxWidth:450 , marginTop:100}}>
          <form onSubmit={this.submitHandler}>
            <FormControl style={{borderBottomLeftRadius:0 , borderBottomRightRadius:0}}
              name="username"
              onChange={this.changeHandler}
              type="text"
              placeholder="username"
              className="username"
            />
            <FormControl style={{borderTopLeftRadius:0 , borderTopRightRadius:0}}
              name="password"
              onChange={this.changeHandler}
              type="password"
              placeholder="password"
              className="password"
            /><br/>
            <Button type="submit">Login</Button>
          </form><br/>
          <Link to="/register">
            <Button>SignUp?</Button>
          </Link>
        </Container>
      </div>
    );
  }
}

export default Login;
