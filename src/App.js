import React from 'react'
import './App.css';
import Home from './components/home/Home'
import Pay from './components/stripe/Pay'
import Router from 'react-easy-router';
import { BrowserRouter } from 'react-router-dom';
import PayConfirm from "./components/stripe/PayConfirm";
import { NotFound } from './components/home/NotFound';

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
            }, {
              path: "/confirm",
              element: <PayConfirm />
            }
          ]
        }
      ]
    }, {
      path: "*",
      element: <NotFound />
    }]

    return <BrowserRouter>
      <Router routes={routes}/>
    </BrowserRouter>
  }

}



export default App;
