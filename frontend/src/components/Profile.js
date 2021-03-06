import React, { Component} from 'react';
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
            email:''
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
            this.setState({username:fetcheddata.data.username , name:fetcheddata.data.name , email:fetcheddata.data.email , img:fetcheddata.data.proimage})
        }
    }

    render() {
        return (
            <div>
            <Navbar usersName={this.state.username}/>
            <br/>
            <br/>
                <img src={this.state.img} alt="profilepic" style={{maxWidth:250 , maxHeight:250}}/>
                <br/>
                <br/>
                <Link to="/user/blogs">
                    <Button >My Blogs</Button>
                </Link>
                <div style={{ textAlign:"left" , maxWidth:450 , marginLeft:"auto" , marginRight:"auto"}}>
                    <h3>Name:{this.state.name}</h3>
                    <h3>Username:{this.state.username}</h3>
                    <h3>Email:{this.state.email}</h3> 
                </div>
                <Link to="/profile/edit">
                <Button variant="warning">
                Edit Profile
                </Button>
                </Link>
                
            </div>
       );
    }
}

export default Profile;