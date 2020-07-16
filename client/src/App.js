import React from 'react';
import logo from './logo.svg';
import './App.css';
import gql from 'graphql-tag';
import {setClient} from './apollo/apollo-set-server';

export const QUERY_HELLO = gql`
    query Hello {
        hello
    }
`;

function App() {

  try{
    let client = setClient(
      { 
        // api:'http://192.168.114.211:4000/graphql' }
        api:'https://192.168.114.211:8443/graphql'
      }
    );
    console.log(client);
    client.query({
      query: QUERY_HELLO
    }).then((dt) => {
      console.log(dt, ' - - -  dt1');
    })
  }catch(error) {
    console.log(error);
  }
  
  

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
