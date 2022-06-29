import './App.css';
import CustomerComponent from './component/Customer-Component';
import OrderComponent from './component/Order-Component';
import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Component } from 'react/cjs/react.production.min';
import CreateOrder from './component/CreateOrder-Component';

function App() {
  return(
    <div className="app">
      <div><CreateOrder/></div>
    </div>
  );
}

export default App;
