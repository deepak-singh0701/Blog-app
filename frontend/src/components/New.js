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

  imageHandler=async (e)=>{
    const data = new FormData();
    if(this.state.newimg.size<=1000000 && (this.state.newimg.type==="image/jpeg" || this.state.newimg.type==="image/jpg") ){
        data.append("file" , this.state.newimg);
        data.append("upload_preset" , "irxiwaz0")
        const response = await axios.post("https://api.cloudinary.com/v1_1/rex07/image/upload" , data);
        this.setState({img:response.data.secure_url,img_url:response.data.secure_url , public_id:response.data.public_id});    
    }
}

  render() {
    return (
      <div>
      <Navbar usersName={this.state.usersName}/>
      <Container style={{maxWidth:450 , marginTop:40}}>
      <br/>
        <form onSubmit={this.imageHandler}>
                <FormControl onChange={(e)=>{this.setState({img:e.target.files[0]})}}
                    type="file"
                    name="img"
                />
                <Button type="submit" variant="warning">Upload</Button>
                </form>
                <br/>
       <form onSubmit={this.submitHandler}>
                <FormControl
                    type="text"
                    name="author"
                    onChange={this.changeHandler}
                    placeholder="Author"
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
