import React, { useState } from "react"
import styled from "styled-components"
import { BlockType, abiActionType } from "../App"
import ReactMustache from "react-mustache"


interface AccordionItemProps extends BlockType { 
    //isExpanded: Boolean,
    abiActions: Array<abiActionType>
}

interface AccordionProps { 
    isLoading: Boolean, 
    blocks: BlockType[], 
    abiActions: Array<abiActionType[]>
}

const BlockResults:  React.FC<AccordionProps> = 
    ({
        blocks, 
        isLoading,
        abiActions
    }) => {

    let blockResults = blocks.map((block, idx) => {
        return <BlockItem
                    id={block.id}
                    timestamp={block.timestamp}
                    transactions={block.transactions}
                    //isExpanded={false}
                    raw={block.raw}
                    actions={block.actions}
                    abiActions={abiActions[idx]}
                />
    })

    return  <Accordion>
                {blockResults}
            </Accordion>
}

const BlockItem: React.FC<AccordionItemProps> = 
    ({
        id,
        timestamp,
        transactions,
        raw,
        actions,
        abiActions,
       // isExpanded
    }) => {
        const [isExpanded, setExpanded] = useState(false)
        const [rawIsVisible, setRawVisible] = useState(false)
        
        const handleClick = () => {
            setExpanded(isExpanded ? false : true)
            console.log(isExpanded)
        }
        //console.log(Promise.resolve(abiActions).then(data => console.log(data)))

        /*
        let contracts = abiActions.map(abi => {
            return <ReactMustache template={abi.ricardian_contract} />
        }) 
        */

        return  <AccordionItem 
                    onClick={() => handleClick()}
                >
                    <div>
                        Block ID: <br/> {id}
                    </div>
                    <div>
                        Timestamp: <br/> {timestamp}
                    </div>
                    <div>
                        Action/Transaction Count: <br/> {transactions.length}
                    </div>
                    {isExpanded && 
                       null //contracts
                    }
                </AccordionItem>

}

const Accordion = styled.div`
    display: flex;
    flex-direction: column
    width: 90%;
    height: auto;
`
const AccordionItem = styled.div`
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around; 
    overflow: scroll;
    padding: 1em;
    margin-bottom: 1em;
    background: #E0DDCF;
    cursor: pointer;
    transition: all 0.3s ease-out;
    & > * {
        padding: 1em;
    }
    &:hover {
        background: #2D232E;
        color: #E0DDCF;
    }
`
const RawItemData = styled.div`
    width: 100%;
    border: 1px solid black;
    padding: 1em;
`
const RicardianContract = styled.div`

`
export default BlockResults