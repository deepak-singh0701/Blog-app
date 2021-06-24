import axios from 'axios';
import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Navbar from "./Navbar";

class Editprofile extends Component {
    constructor(props){
        super(props);
        this.state={
            userName:"",
            name:"",
            email:""
        }
    }
    
    async componentDidMount(){
        const userdata =await axios.get("/isloggedin");
        this.isloggedin(userdata);
    }

    async isloggedin(fetcheddata){
        if(fetcheddata.data==="loginfirst"){
            this.props.history.push("/login");
        }
        else{
            this.setState({userName:fetcheddata.data.username , name:fetcheddata.data.name , email:fetcheddata.data.email});
        }
    }

    submitHandler=async(e)=>{
        e.preventDefault();
        let res =await axios.post("/profile/edit" , this.state);
        console.log(res.data);
        if(res.data==="success"){
            console.log("here");
            this.props.history.push("/user/profile");
        }
    }

    changeHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    }

    render() {
        return (
        <div>
        <Navbar usersName = {this.state.userName}/>
        <Container style={{maxWidth:400}}>
            <h3>{this.state.userName}</h3>
            <form onSubmit={this.submitHandler}>
                <Form.Label>Name:</Form.Label>
                <Form.Control name="name" type="text" value={this.state.name} onChange={this.changeHandler}></Form.Control>
                <Form.Label>Email:</Form.Label>
                <Form.Control name="email" type="email" value={this.state.email} onChange={this.changeHandler}></Form.Control>
                <Button type="submit">Update</Button>
            </form>
            </Container>
        </div>
        );
    }
}

export default Editprofile;