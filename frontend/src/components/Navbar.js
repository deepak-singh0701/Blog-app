import React, { Component } from "react";
import { Navbar, Nav ,Button} from "react-bootstrap";
import "./Navbar.css";

class Navigation extends Component {
    constructor(props){
        super(props);
        this.state={};
    }
  render() {

    function profile(name) {
      if (name.authpage !== "true"){
        if (name.usersName === "") {
            
          return <div>
              <Nav.Link href="/login">Login</Nav.Link>;
          </div>
        } else {
          console.log(name);
          return (
            <div>
            <Nav.Link bsPrefix="custom" href="/blogs/new"><Button>+ Add Your Blog</Button></Nav.Link>
              <Nav.Link
                bsPrefix="custom"
                href="/user/profile">Hey {name.usersName}!
              </Nav.Link>
              <Nav.Link bsPrefix="custom" href="/login">
                Logout
              </Nav.Link>
            </div>
          );
        }
    }
    else{
        return <Nav.Link href="/blogs">Home</Nav.Link>;
    }
    }

    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Brand href="/blogs">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
            {profile(this.props)}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
