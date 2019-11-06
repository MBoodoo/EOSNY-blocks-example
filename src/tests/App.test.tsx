import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { Button } from "../components/LoadBtn"
import BlockTable from "../components/Results" 

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

// #9 Move event tests and async mocks to v2
