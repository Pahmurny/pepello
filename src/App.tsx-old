import  { Redirect, Route, Switch } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import './App.css';

import HomePage from '@pages/HomePage';
import TodoPage from '@pages/TodoPage';

function ToHome() {
  return (
    <Redirect to='/home' />
  );
}

class App extends React.Component {
  public render() {
    return (
    <Switch>
      <Route exact={true} path='/home' component={HomePage} />
      <Route path='/todo' component={TodoPage} />
      <Route path='*' component={ToHome}/>
    </Switch>
    );
  }
}

export default App;
