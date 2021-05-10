import React,{useContext, useEffect} from 'react';
import logo from './logo.svg';
import {BrowserRouter as Router,Switch, Route} from 'react-router-dom'
import './App.css';
import Home from './pages/home';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginView from './pages/login';
import SignUp from './pages/signup';
import Header from './components/Header';
import { GlobalProvider } from './context/GlobalState';


function App() {
  return (
    <GlobalProvider>
    <Router>
      <Header />
      <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={LoginView} />
      <Route path="/signup" exact component={SignUp} />
      </Switch>
    </Router>
    </GlobalProvider>
  );
}

export default App;
