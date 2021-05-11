import React,{useContext, useEffect} from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import './App.css';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import LoginView from './pages/login';
import SignUp from './pages/signup';
import Validate from './pages/validation';
import Header from './components/Header';
import Alert from './components/Alert'

import {loadUser} from './redux/Actions/auth';

import { Provider } from 'react-redux';
import store from './redux/Store';
import setAuthToken from './utils/setAuthToken';


function App() {

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
    useEffect(() => {
       store.dispatch(loadUser())
    }, [])
  return (
    <Provider store= {store}>
    <Router>
      <Header />
      <Alert />
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={LoginView} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/validate" exact component={Validate} />
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
