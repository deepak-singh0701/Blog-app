import React, { Component } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { Container, FormControl , Button } from "react-bootstrap";

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      img: "",
      content: "",
      usersName: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  async componentDidMount() {
    const data = await axios.get("/isloggedin");
    this.isloggedin(data);
  }

  submitHandler = async (e) => {
    e.preventDefault();
    const data = await axios.post("/blogs", this.state);
    this.isloggedin(data);
    this.props.history.push("/blogs");
  };
  async isloggedin(fetcheddata) {
    if (fetcheddata.data === "loginfirst") {
      this.props.history.push("/login");
    } else {
      const user = await axios.get("/isloggedin");
      this.setState({ usersName: user.data.name });
    }
  }

  render() {
    return (
      <div>
      <Navbar usersName={this.state.usersName}/>
      <Container style={{maxWidth:450 , marginTop:40}}>
       <form onSubmit={this.submitHandler}>
                <br />
                <FormControl
                    type="text"
                    name="author"
                    onChange={this.changeHandler}
                    placeholder="Author"
                />
                <br/>
                <FormControl
                    type="text"
                    name="img"
                    onChange={this.changeHandler}
                    placeholder="Image"
                />
                <br/>
                <FormControl as="textarea"
                    type="text"
                    name="content" cols={3} rows={7}
                    onChange={this.changeHandler}
                    placeholder="Your Content Goes Here"

                ></FormControl>
                <br/>
                <Button type="submit">Submit</Button>

            </form>
            </Container>
      </div>
    );
  }
}
export default New;
