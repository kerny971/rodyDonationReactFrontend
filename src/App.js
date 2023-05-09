import React from 'react'
import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home'
import Pay from './components/stripe/Pay'
import Router from 'react-easy-router';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {


  render () {
    const routes = [{
      path: '/',
      element: <Home />,
      children: [
        {
          path: "/donation",
          children: [
            {
              path: "/stripe",
              element: <Pay />
            }
          ]
        }
      ]
    }]

    return <BrowserRouter>
      <Router routes={routes}/>
    </BrowserRouter>
  }

}



export default App;