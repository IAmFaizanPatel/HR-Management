import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/Employees/PostDetails/PostDetails';
import Navbar from './components/Navigation/Navbar/Navbar';
import Employees from './components/Employees/Home/Home';
import Auth from './components/Auth/Auth';
import Branches from './components/Branches/Branches';
import CreatorOrTag from './components/Employees/CreatorOrTag/CreatorOrTag';
import Home from './components/Home/Home'
import Timesheets from './components/Timesheets/Timesheets'
import Taxbrackets from './components/Taxbrackets/Taxbrackets'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPerson, faPersonDress, faKey } from '@fortawesome/free-solid-svg-icons';

library.add(faPersonDress, faPerson, faKey);

const App = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>

          {/* <Route path="/" exact component={() => <Redirect to="/home" />} />
          <Route path="/posts" exact component={() => (user ? <Employees /> : <Redirect to="/auth" />)} />
          <Route path="/home" exact component={() => (user ? <Home /> : <Redirect to="/auth" />)} />
          <Route path="/branches" exact component={() => (user ? <Branches /> : <Redirect to="/auth" />)} />
          <Route path="/posts/search" exact component={() => (user ? <Employees /> : <Redirect to="/auth" />)} />
          <Route path="/posts/:id" exact component={() => (user ? <PostDetails /> : <Redirect to="/auth" />)} />
          <Route path={['/creators/:name', '/tags/:name']} component={() => (user ? <CreatorOrTag /> : <Redirect to="/auth" />)} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/home" />)} /> */}
          <Route path="/" exact component={() => <Redirect to="/home" />} />
          <Route path="/posts" exact component={Employees} />
          <Route path="/home" exact component={Home} />
          <Route path="/branches" exact component={Branches} />
          <Route path="/posts/search" exact component={Employees} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/posts" />)} />
          <Route path='/timesheets' component={Timesheets} />
          <Route path='/taxbrackets' component={Taxbrackets} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

export default App;
