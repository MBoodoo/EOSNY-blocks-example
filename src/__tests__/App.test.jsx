import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import axios, { AxiosResponse } from "axios";
import { render, fireEvent, waitForElement } from '@testing-library/react'
import { Button } from "../components/LoadBtn"
import BlockTable from "../components/Results" 

jest.mock("axios")

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should load blocks', async () => {
    const setLoading = jest.fn()
    const setBlocks = jest.fn()
    const setAbiActions = jest.fn()

    const { getByText, getByRole } = render(
      <Button 
        isLoading={false} 
        setLoading={setLoading} 
        setBlocks={setBlocks}
        setAbiActions={setAbiActions}
      />)
    /*
    fireEvent.click(getByText('LOAD'))
    expect(setLoading).toHaveBeenCalledWith(true)
    await expect(getByRole('button')).toHaveTextContent('LOADING')
    */
        
})
// #9 Move event tests and async mocks to v2