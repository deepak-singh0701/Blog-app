import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "./Navbar"

class Show extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authorUsername:'',
            author: '',
            img: '',
            content: '',
            createdAt:'',
            usersName:''
        }
    }


    async componentDidMount() {
        let blog=await axios.get(`/blogs/${this.props.match.params.id}`);
        this.isloggedin(blog);
        blog = blog.data;
        this.setState({ author: blog.author, img: blog.img, content: blog.content, createdAt: blog.createdAt  , authorUsername:blog.authorUsername});
    }
    async isloggedin(fetcheddata){
        if(fetcheddata.data==="loginfirst"){
            this.props.history.push("/login");
        }
        else{
            const user = await axios.get("/isloggedin")
            this.setState({usersName:user.data.username});
        }
    }

    deleteBlogHandler = async () => {
        await axios.delete(`/blogs/${this.props.match.params.id}`);
        this.props.history.push('/blogs');
    }


    render() {

        function btn(usersName , authorUsername , del , id){
            if(usersName === authorUsername){
                return <div>
                    <Link to={`/blogs/${id}/edit`}>
                            <Button variant="success">Edit</Button>
                        </Link>
                    <Button onClick={del} style={{ margin: '10px' }}  variant="danger">Delete</Button>
                </div>
                 
            }
        }

        return (
            <div>
                 <Navbar usersName={this.state.usersName}/>
                <h1>Show Blog</h1>
                 <Card>
                    <Card.Img variant="top" src={this.state.img} />
                    <Card.Body>
                        <Card.Title>{ this.state.author}</Card.Title>
                    <Card.Text>
                       {this.state.content}
                        </Card.Text>
                       {btn(this.state.usersName , this.state.authorUsername , this.deleteBlogHandler , this.props.match.params.id)}
                       
                        
                    </Card.Body>
                </Card>
                
            </div>
        )
    }
}

export default Show;
