import React, { Component, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { Button  } from 'react-bootstrap';

class Profile extends Component {
    constructor(props){
        super(props);

        this.state={
            img:'',
            name:'',
            username:'',
            email:'',
            usersName:''
        }
    }
    async componentDidMount(){
        const userauth= await axios.get("/isloggedin");
        this.isloggedin(userauth);
    }
    async isloggedin(fetcheddata){
        if(fetcheddata.data==="loginfirst"){
            this.props.history.push("/login");
        }
        else{
            this.setState({username:fetcheddata.data.username , name:fetcheddata.data.name , email:fetcheddata.data.email})
        }
    }

    render() {
        return (
            <div>
            <Navbar usersName={this.state.usersName}/>
                <img src={this.state.img}/>
                <Link to="/profile/edit">
                <Button variant="warning">
                Edit Profile
                </Button>
                </Link>
                <h2>Name:{this.state.name}</h2>
                <h3>Username:{this.state.username}</h3>
                <h3>Email:{this.state.email}</h3>
                <Link to="/user/blogs">
                    <Button >My Blogs</Button>
                </Link>
            </div>
       );
    }
}

export default Profile;