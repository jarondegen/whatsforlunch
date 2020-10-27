import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import Profile from './pages/Profile'
import Feed from './pages/Feed'
import UserList from './components/UsersList';
import NavBar from './components/nav/NavBar'
import UserList from './components/UsersList';
import UploadPage from './components/PhotoUpload/UploadPage';

function App() {

  return (
    <BrowserRouter>
        <NavBar />
        {/* <nav>
            <ul>
                <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                <li><NavLink to="/users" activeclass="active">Users</NavLink></li>
                <li><NavLink to="/profile" activeclass="active">Profile</NavLink></li>
                <li><NavLink to="/posts/new" activeclass="active">Post</NavLink></li>
            </ul>
        </nav> */}
        <Switch>
            <Route path="/users" component={UserList} />
            <Route path="/profile" component={Profile} />
            <Route path="/" component={Feed} />
            <Route path="/users">
                <UserList />
            </Route>
            <Route path="/posts/new" component={UploadPage} />
            <Route path="/">
                <h1>My Home Page</h1>
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
