import React, { useState } from "react"
import styled from "styled-components"
import Eos from "../services/EosService"

export default ({setUser, user}) => {
    const [form, setForm] = useState({
        username: "",
        key: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        Eos.authorize(user).then(() => {
            //Success
            setUser({name: user.name})
        })
        .catch(error => {
            console.error(error)
        })
    }

    return  <Container>
                <Form onChange={e => handleChange(e)} value={form.username}/>
                <Form onChange={e => handleChange(e)} value={form.key}/>
                 <Button onSubmit={e => handleSubmit(e)}> 
                    Sign In 
                </Button>
            </Container>
}

const Container = styled.div`
    display: flex;
    height: 10em;
    width: 5em;
    border: 1px solid black;

    position: relative;
`

const Form = styled.input`
    width: 90%
`
const Button = styled.button`
    width: 3em;
    height: 1.5em;
`
const Label = styled.label`

`