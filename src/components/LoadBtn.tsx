import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { getRecentBlockNum, getAbiActions } from "../services/api"
import { loadRecentBlocks, loadAbis } from "../utils"

type ButtonProps = {
    isLoading: Boolean,
    setLoading: (state: boolean) => void,
    setBlocks: (blocks: object[]) => any,
    setAbiActions: (actions: object[]) => any
}

export const Button: React.FC<ButtonProps> = 
    ({
        setLoading, 
        isLoading,
        setBlocks,
        setAbiActions
    }) => {

    const handleRefresh = async (e: any) => {
        if (isLoading) {return}
        setLoading(true)

        const startingPoint = await getRecentBlockNum()
        const recentBlocks = await loadRecentBlocks(startingPoint)
        const abis = await loadAbis(recentBlocks)

        await setBlocks(recentBlocks)
        await setAbiActions(abis)

        return setLoading(false)
    }

    return  <Btn onClick={e => handleRefresh(e)}>
                {isLoading ? <> LOADING </> : <> LOAD </>}
            </Btn>
}

const Btn = styled.button`
    color: #2D232E;
    font-size: 22px;
    cursor: pointer;
    position: fixed;
    padding: .5em;
    background: #E0DDCF;
    border-radius: 15px;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
`