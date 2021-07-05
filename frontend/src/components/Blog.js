import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import './Blog.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

class Blog extends Component {

    constructor(props){
        super(props);
        this.state={
            like:this.props.like
        }
    }

    likeHandler=async()=>{

                
        const data = {
            val:this.state.like? -1 : 1,
            blogid:this.props.id
        }
        const res = await axios.post("/like" , data);
         if(this.state.like){
            this.setState({like:false})
        }
        else{
            this.setState({like:true})
        }

    }

    render() {

        const likeButton= this.state.like ?  <img onClick={this.likeHandler} alt="likebtn" src="https://img.icons8.com/material-outlined/24/000000/like--v1.png"/> : <img onClick={this.likeHandler} alt="likebtn" src="https://img.icons8.com/emoji/24/000000/heart-suit.png"/>

        return (
            <div className="Blog">
                <Card>
                    <Card.Img className="blogimage" src={this.props.img}/>   
                    <Card.Body>
                        <Card.Title>{ this.props.author}</Card.Title>
                    <Card.Text>
                       {this.props.content}
                        </Card.Text>
                        <Link to={`/blogs/${this.props.id}`}>
                            <Button variant="success">Show</Button>
                        </Link><br/>
                            {likeButton}
                    </Card.Body>
                </Card>
                
            </div>
        )
    }
}

export default Blog;
