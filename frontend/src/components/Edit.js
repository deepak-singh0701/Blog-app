import React, { Component } from "react";
import axios from "axios";
import Navbar from "./Navbar";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author: "",
      img: "",
      content: "",
      usersName:''
    };
  }

  async componentDidMount() {
    let blog = await axios.get(`/blogs/${this.props.match.params.id}/edit`);
    this.isloggedin(blog);
    blog = blog.data;
    this.setState({
      author: blog.author,
      img: blog.img,
      content: blog.content,
    });
  }

  async isloggedin(fetcheddata) {
    if (fetcheddata.data === "loginfirst") {
      this.props.history.push("/login");
    }
    else{
        const user = await axios.get("/isloggedin")
        this.setState({usersName:user.data.name});
    }
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = async (e) => {
    e.preventDefault();
     await axios.patch(
      `/blogs/${this.props.match.params.id}`,
      this.state
    );
    this.props.history.push(`/blogs/${this.props.match.params.id}`);
  };

  render() {
    return (
      <div>
      <Navbar usersName={this.state.usersName}/>
        <form onSubmit={this.submitHandler}>
          <label htmlFor="author">Author</label>
          <br />
          <input
            type="text"
            name="author"
            onChange={this.changeHandler}
            placeholder="Author"
            value={this.state.author}
          />
          <br />
          <br />
          <label htmlFor="img">Image URL</label>
          <br />
          <input
            type="text"
            name="img"
            onChange={this.changeHandler}
            placeholder="Image"
            value={this.state.img}
          />
          <br />
          <br />
          <label htmlFor="content">Content</label>
          <br />
          <textarea
            type="text"
            name="content"
            cols="30"
            rows="5"
            onChange={this.changeHandler}
            placeholder="Your Content Goes Here"
            value={this.state.content}
          ></textarea>
          <br />
          <br />
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Edit;
