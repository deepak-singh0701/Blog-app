import React, { Component } from 'react'
import Blog from './Blog';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

class BlogList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersName:'',
            blogs: []
        }
    }

    async componentDidMount() {
            const user = await axios.get("/isloggedin")
            if(user.data!=="loginfirst"){
                this.setState({usersName:user.data.name})
            }
            const fetchedBlogs = await axios.get('/blogs');
            this.setState({ blogs: fetchedBlogs.data });
    }


    render() {

        let blogList = this.state.blogs.map((blog) => {
            const content=blog.content.slice(0,200)+"...";
            return <Blog
                key={blog._id}
                id={blog._id}
                author={blog.author}
                img={blog.img}
                content={content}
                createdAt={blog.createdAt}
            />
        })

        return (
            <div className="BlogList">
                <Navbar usersName={this.state.usersName}/>
                {blogList}
            </div>
        )
    }
}

export default BlogList;
