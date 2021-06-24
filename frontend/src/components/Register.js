import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Container, FormControl } from "react-bootstrap";
import Navbar from "./Navbar";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      username: "",
      password: "",
    };
  }

  submitHandler = async (e) => {
    e.preventDefault();
    let response = await axios.post("/register", this.state);
    if (response.data === "error") {
      console.log("error in signup");
    } else {
      this.props.history.push("/login");
    }
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async componentDidMount(){
      await axios.get("/logout");
  }

  render() {
    return (
      <div>
      <Navbar authpage="true"/>
        <Container style={{maxWidth:450 , marginTop:100}}>
          <form onSubmit={this.submitHandler} style={{ maxWidth: 450 }}>
            <FormControl style={{borderBottomLeftRadius:0 , borderBottomRightRadius:0}}
              name="name"
              onChange={this.changeHandler}
              type="text"
              placeholder="Full Name"
              className="name"
            />
            <FormControl style={{borderBottomLeftRadius:0 , borderBottomRightRadius:0 , borderTopLeftRadius:0 , borderTopRightRadius:0}}
              name="email"
              onChange={this.changeHandler}
              type="text"
              placeholder="Email"
              className="email"
            />
            <FormControl style={{borderBottomLeftRadius:0 , borderBottomRightRadius:0, borderTopLeftRadius:0 , borderTopRightRadius:0}}
              name="username"
              onChange={this.changeHandler}
              type="text"
              placeholder="Username"
              className="username"
            />
            <FormControl style={{borderTopLeftRadius:0 , borderTopRightRadius:0}}
              name="password"
              onChange={this.changeHandler}
              type="password"
              placeholder="Password"
              className="password"
            />
            <br />
            <Button type="submit">SignUp</Button>
          </form>
          <br/>
          <Link to="/login">
            <Button>Already Have an Account? Login</Button>
          </Link>
        </Container>
      </div>
    );
  }
}

export default Login;
