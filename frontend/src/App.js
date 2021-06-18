import React, { Component } from 'react'
import './App.css';
import BlogList from './components/BlogList';
import { Route, Switch } from 'react-router-dom';
import Show from './components/Show';
import New from './components/New';
import Edit from './components/Edit';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import Myblogs from './components/Myblogs';
import Editprofile from './components/Editprofile';


export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
        <Route exact path="/register" component={Register}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/blogs" component={BlogList} />
          <Route exact path="/blogs/new" component={ New}/>
          <Route exact path="/blogs/:id" component={Show} />
          <Route exact path="/blogs/:id/edit" component={ Edit}/>
          <Route exact path="/user/profile" component={Profile}/>
          <Route exact path="/profile/edit" component={Editprofile}/>
          <Route exact path="/user/blogs" component = {Myblogs}/>
        </Switch>
      </div>
    )
  }
}
