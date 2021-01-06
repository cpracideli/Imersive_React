import React, { useState } from 'react';
import Menu from '../components/menu'
import { Jumbotron, Container, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

function Create() {

    const [meta, setMeta] = useState({
        name: '',
        description: '',
        status: '',
    });

    const [response, setResponse] = useState({
        formSave: false,
        type: '',
        message: ''
    });

    const onChangeInput = e => setMeta({ ...meta, [e.target.name]: e.target.value });

    const sendMeta = async e => {
        e.preventDefault();

        setResponse({
            formSave: true,
        });

        try {
            const res = await fetch('http://localhost:8080/api/v1/test', {
                method: 'POST',
                body: JSON.stringify(meta),
                headers: { 'Content-Type': 'application/json' }
            });
            const responseEnv = await res.json();

            if (responseEnv.error) {
                setResponse({
                    formSave: false,
                    type: 'error',
                    message: responseEnv.message

                });
            }
            else {
                setResponse({
                    formSave: false,
                    type: 'success',
                    message: responseEnv.message

                });
            }

        } catch (err) {
            setResponse({
                formSave: false,
                type: 'error',
                message: 'Error: error to create meta, try again'

            });
        }
    }

    return (
        <>
            <Menu></Menu>
            <Jumbotron cluid className="form">
                <style>
                    {`.form{
                        background-color: #171941;
                        color: #bf38ac;
                        padding-top: 30px;
                        paggin-bottom: 150px;
                        margin-botton: 0rem !important;
                    }`}
                </style>

                <Container>
                    <h1 className="display-4 text-center">Create Meta</h1>
                    <br />

                    {response.type === 'error' ? <Alert color="danger">{response.message}</Alert> : null}
                    {response.type === 'success' ? <Alert color="success">{response.message}</Alert> : null}

                    <Form onSubmit={sendMeta}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" placeholder="Meta name" onChange={onChangeInput}></Input>
                        </FormGroup>
                        
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="text" name="description" id="description" placeholder="Meta description" onChange={onChangeInput} ></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="status">Status</Label>
                            <Input type="select" name="status" id="status" onChange={onChangeInput}>
                                <option>Pendding</option>
                                <option>Done</option>
                            </Input>
                        </FormGroup>

                        {response.formSave ? <Button color="secondary" disabled>Enviando...</Button> : <Button outline color="primary" type="submit">Create</Button>}


                    </Form>
                </Container>
            </Jumbotron>
        </>
    );
}

export default Create;