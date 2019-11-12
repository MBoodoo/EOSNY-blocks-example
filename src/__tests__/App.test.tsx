import React from 'react';
import ReactDOM from 'react-dom';
import App, { BlockType } from '../App';
import { render, fireEvent, waitForElement } from '@testing-library/react'
import { Button } from "../components/LoadBtn"
import BlockTable from "../components/Results" 

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should render blocks', () => {  
 /// const 
})
// #9 Move event tests and async mocks to v2
