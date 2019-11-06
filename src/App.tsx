import React, { useState } from 'react';
import styled from "styled-components"
import { Button } from "./components/LoadBtn"
import BlockTable from "./components/Results" 
import "./App.css"

// init main types
export type Block = {
  id: String,
  timestamp: String,
  transactions: Object[],
  actions: Object[]
  raw: object
}

const App: React.FC = ({}) => {
  // init state
  const [isLoading, setLoading] = useState(false)
  const [blocks, setBlocks] = useState<Block[] | any>([])

  // use useContext to cleanup state
  return  <Container>
            <BlockTable blocks={blocks} 
                        isLoading={isLoading}
            />

            <Button isLoading={isLoading} 
                    setLoading={setLoading} 
                    setBlocks={setBlocks}
            /> 
          </Container>
}

const Container = styled.div`
    width: 100vw;
    height: auto;
    padding: 1.5em;
    display: flex;
  
    place-content: center center;
  
`

export default App;
