import axios from 'axios';
import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import Navbar from "./Navbar";

class Editprofile extends Component {
    constructor(props){
        super(props);
        this.state={
            img:"",
            userName:"",
            name:"",
            email:"",
            newimg:null,
            img_url:"",
            public_id:''
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
            this.setState({userName:fetcheddata.data.username , name:fetcheddata.data.name , email:fetcheddata.data.email , img:fetcheddata.data.proimage});
        }
    }

    submitHandler=async(e)=>{
        e.preventDefault();
        let res =await axios.post("/profile/edit" , this.state);
        if(res.data==="success"){
            this.props.history.push("/user/profile");
        }
    }
8
    changeHandler=async(e)=>{
        e.preventDefault();
        this.setState({[e.target.name]:e.target.value});
        }

    imageHandler=async (e)=>{
        console.log(this.state);
        const data = new FormData();
        if(this.state.newimg.size<=1024 && (this.state.newimg.type===jpeg || this.state.newimg.type===jpg) ){
            data.append("file" , this.state.newimg);
            data.append("upload_preset" , "irxiwaz0")
            const response = await axios.post("https://api.cloudinary.com/v1_1/rex07/image/upload" , data);
            this.setState({img:response.data.secure_url,img_url:response.data.secure_url , public_id:response.data.public_id});    
        }
    }

    uploadHandler =async (e)=>{
        e.preventDefault();
        const res = await axios.post("/profile/upload" , this.state);
        if(res==="success"){
            this.props.history.push("/profile/edit")
        }
    }


    render() {
        return (
        <div>
        <Navbar usersName = {this.state.userName}/>
        <Container style={{maxWidth:400}}>
            <h3 style={{marginTop:20}}>{this.state.userName}</h3>
            <form onSubmit={this.changeHandler}>
                <img src={this.state.img} alt="profilepic" style={{maxWidth:250 , maxHeight:250}}/><br/><br/>
                <input name="img" onChange={(e)=>{this.setState({newimg:e.target.files[0]})}} type="file" encType="multipart/form-data"/>
                <Button type="submit" onClick={this.imageHandler} variant="warning">Upload Profile Picture</Button><br/><br/> 
            </form>
            <form onSubmit={this.submitHandler}>
                <Form.Label>Name:</Form.Label>
                <Form.Control name="name" type="text" value={this.state.name} onChange={this.changeHandler}></Form.Control>
                <Form.Label>Email:</Form.Label>
                <Form.Control name="email" type="email" value={this.state.email} onChange={this.changeHandler}></Form.Control>
                <br/>
                <Button type="submit">Update</Button>
            </form>
            </Container>
        </div>
        );
    }
}

export default Editprofile;