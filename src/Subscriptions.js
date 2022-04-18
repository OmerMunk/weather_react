import React from 'react';
import Container from 'react-bootstrap/Container';
import {Header} from './Header';
import {Button, Form, ListGroup, Modal, ModalHeader, ModalTitle} from "react-bootstrap";
import {render} from "react-dom";
import axios from "axios";
import {getHeader, SUBSCRIPTIONS_IMPORT_URL, SUBSCRIPTIONS_URL} from './request_utils';


export class Subscriptions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            setShow: false,
            showImportModal: false,
            country: "",
            city: "",
            subs: [],
            allowed_subs: "",
            file: null
        }

        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleShowSubs = this.handleShowSubs.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.deleteSub = this.deleteSub.bind(this)
        this.handleFileImport = this.handleFileImport.bind(this)

    }

    handleClose() {
        this.setState({setShow: false})
    }

    handleShow() {
        this.setState({setShow: true})
    }

    handleSubmit(event) {
        console.log("inside handle submit")
        event.preventDefault();
        if (this.state.subs.length < this.state.allowed_subs){
            axios.post(SUBSCRIPTIONS_URL, {
                country: this.state.country,
                city: this.state.city
            }, getHeader())
                .then(response => {
                    console.log(response)
                    this.handleShowSubs()
                })
        }
        else{
            alert("You are allowed to put 3 subscriptions")
        }


    }


    handleShowSubs() {
        console.log("called handle show subs")
        // const token = window.localStorage.getItem('token')
        axios.get(SUBSCRIPTIONS_URL, getHeader())
            // axios.get('http://127.0.0.1:8000/weather/users/current/subscriptions', {headers: {Authorization: 'Token ' + token}})
            .then(response => {
                console.log(response)
                this.setState({subs: response.data.subs})
                this.setState({allowed_subs: response.data.allowed_subs})
            })
    }

    componentDidMount() {
        this.handleShowSubs()
    }

    deleteSub(subId) {
        axios.delete(
            `${SUBSCRIPTIONS_URL}${subId}`,
            getHeader()
        ).then(response => {
            if (response.status === 200) {
                this.handleShowSubs()
            }
        })
    }

    handleFileImport() {
        console.log('called handleFileImport')
        const formData = new FormData();

        // Update the formData object
        formData.append(
            "file",
            this.state.file,
            this.state.file.name
        );
        axios.post(
            SUBSCRIPTIONS_IMPORT_URL,
            formData,
            getHeader()
        ).then(response => {
            if (response.status === 201) {
                this.handleShowSubs()
            }
        })
    }


    render() {

        let subs = this.state.subs.map((sub) => {
                return (
                    <ListGroup key={sub.id}>
                    <span> {sub.country}, {sub.city}
                        <span><Button onClick={() => this.deleteSub(sub.id)} >Delete</Button></span>
                    </span>

                        {/*<Button onClick={() => this.deleteSub(sub.id)}>Delete</Button>*/}
                    </ListGroup>
                )
            }
            // <li>{sub.country}: {sub.city} <span> <Button>Delete</Button> </span></li>
        )


        return (
            <>
                {/*<Header/>*/}
                <Container>

                    <h1>Subscriptions</h1>

                    <ListGroup>
                        {subs}
                    </ListGroup>

                    <p>
                        <Button onClick={this.handleShow}>
                            Add Subscription
                        </Button>
                        <Button onClick={() => this.setState({showImportModal: true})}>
                            Import from file
                        </Button>
                    </p>

                    <Modal show={this.state.setShow} onHide={this.handleClose}>
                        <Form onSubmit={this.handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>Add Subscription</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Country"
                                        value={this.state.country}
                                        onChange={(event) => this.setState({country: event.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter Country"
                                        value={this.state.city}
                                        onChange={(event) => this.setState({city: event.target.value})}
                                    />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                                <Button variant="primary" type="submit" onClick={this.handleClose}>Add</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>

                    <Modal show={this.state.showImportModal} onHide={() => this.setState({showImportModal: false})}>
                        <Modal.Header closeButton>
                            <Modal.Title>Import subscriptions</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>File</Form.Label>
                                    <Form.Text>
                                        <Form.Control
                                            type="file"
                                            accept='.txt'
                                            onChange={(event) => this.setState({file: event.target.files[0]})}/>
                                    </Form.Text>
                                </Form.Group>

                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.handleFileImport}>Save</Button>
                        </Modal.Footer>
                    </Modal>

                    {/*if there is too much subscriptions, alert!*/}
                </Container>
            </>
        )
    }
}