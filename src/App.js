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

    return (
      <>
        <a href='https://github.com/kerny971' target='_blank'  rel="noreferrer" style={{display: "block", padding: "2em 1em"}} className='container'>
            <h1 style={{ display: "inline-block", margin: "0 .5em 0 0"}} >RodyOne</h1>
            <img src="/github-142-svgrepo-com.svg" alt="Logo Github" style={{height: "2em", transform: "translateY(-.5em)", color: "#FFF"}} />
        </a>
        <BrowserRouter>
          <Router routes={routes}/>
        </BrowserRouter>
      </>
    )
  }

}



export default App;
