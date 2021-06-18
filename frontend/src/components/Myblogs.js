import axios from 'axios';
import React, { Component } from 'react';
import Blog from "./Blog";
import Navbar from "./Navbar";

class Myblogs extends Component {
    constructor(props){
        super(props)
        this.state={
            usersName:'',
            blogs:[]
        }
    }

    async componentDidMount(){
        const res = await axios.get("/user/blogs");
        this.isloggedin(res);
        this.setState({blogs:res.data});
    }

    async isloggedin(fetcheddata){
        if(fetcheddata.data==="loginfirst"){
            this.props.history.push("/login");
        }
        else{
            const user = await axios.get("/isloggedin")
            this.setState({usersName:user.data.name});
        }
    }

    render() {
        let myblogs = this.state.blogs.map((blog)=>{
           return <Blog key={blog._id}
            id={blog._id}
            author={blog.author}
            img={blog.img}
            content={blog.content}
            createdAt={blog.createdAt}/>
        });
        return (
            <div>
                 <Navbar usersName={this.state.usersName}/>
                {myblogs}
            </div>
        );
    }
}

export default Myblogs;