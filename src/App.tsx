import React, { useState } from 'react';
import styled from "styled-components"
import { Button } from "./components/LoadBtn"
import BlockTable from "./components/Results" 
import "./App.css"

// init main types
export type BlockType = {
    id: String,
    timestamp: String,
    transactions: Object[],
    actions: any[]
    raw: object
}

export type abiActionType = {
    type: string,
    ricardian_contract: string
}

const App: React.FC = ({}) => {
  // init state
  const [user, setUser] = useState({
    username: "",
    key: ""
  })
  const [isLoading, setLoading] = useState(false)
  const [blocks, setBlocks] = useState<BlockType[] | any>([])
  const [abiActions, setAbiActions] = useState<Array<abiActionType[]> | any>([])


  return  <Container>
            <BlockTable blocks={blocks}
                        isLoading={isLoading}
                        abiActions={abiActions}
            />
            <Button isLoading={isLoading} 
                    setLoading={setLoading} 
                    setBlocks={setBlocks}
                    setAbiActions={setAbiActions}
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