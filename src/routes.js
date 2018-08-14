import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import the components for your routes 
import Home from './components/container/Home/Home';
import CreatePostPage from './components/container/CreatePostPage/CreatePostPage';
import Dashboard from './components/container/Dashboard/Dashboard';
import PostPage from './components/container/PostPage/PostPage';
import PostsPage from './components/container/PostsPage/PostsPage';
import UserPage from './components/container/UserPage/UserPage';
import UsersPage from './components/container/UsersPage/UsersPage';
import Gallery from './components/container/Gallery/Gallery';
import AlbumPage from './components/container/AlbumPage/AlbumPage';




export default <Switch>
                  <Route exact path='/' component={Home} />
                  <Route path='/dashboard' component={Dashboard} />
                  <Route path='/create_post' component={CreatePostPage} />
                  <Route path='/posts' component={PostsPage} />
                  <Route path='/post/:post_id' component={PostPage} />
                  <Route exact path='/users' component={UsersPage} />
                  <Route path='/users/:user_id' component={UserPage} />
                  <Route exact path='/gallery' component={Gallery} />
                  <Route path='/gallery/:id' component={AlbumPage} />
              </Switch>