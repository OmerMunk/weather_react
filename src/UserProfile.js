import React from "react";
import {Button, Container, Fade, Form, ListGroup, Modal} from "react-bootstrap";
import {Header} from "./Header";
import axios from "axios";
import {getHeader, PROFILE_URL, SUBSCRIPTIONS_URL} from "./request_utils";
import {MdOutlineHome} from "react-icons/md";

export class UserProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            setShow: false,

            subs: [],

            first_name: "",
            last_name: "",
            country: "",
            city: "",
            address: "",
            new_first_name: "",
            new_last_name: "",
            new_country: "",
            new_city: "",
            new_address: "",
            home_town_checked: false

        }


        this.getProfile = this.getProfile.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleShowSubs = this.handleShowSubs.bind(this)
        this.handleHomeTown = this.handleHomeTown.bind(this)
        this.deleteSub = this.deleteSub.bind(this)
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
        console.log(this.state.country)

        axios.put(PROFILE_URL, {
            new_first_name: this.state.new_first_name,
            new_last_name: this.state.new_last_name,
            new_country: this.state.new_country,
            new_city: this.state.new_city,
            new_address: this.state.new_address,
        }, getHeader())
            .then(response => {
                console.log(response)
                this.getProfile()
            })


    }

    handleShowSubs() {
        console.log("called handle show subs")
        axios.get(SUBSCRIPTIONS_URL, getHeader())
            .then(response => {
                console.log(response)
                this.setState({subs: response.data.subs})
                for (let i = 0; i < this.state.subs.length; i++) {
                    if (this.state.subs[i].country === this.state.country && this.state.subs[i].city === this.state.city) {
                        this.setState({home_town_checked: true})
                    }
                }
            })


    }


    getProfile() {
        console.log("Called getProfile")
        axios.get(PROFILE_URL, getHeader())
            .then(response => {
                console.log(response)
                this.setState({
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    country: response.data.country,
                    city: response.data.city,
                    address: response.data.address,
                    new_first_name: response.data.first_name,
                    new_last_name: response.data.last_name,
                    new_country: response.data.country,
                    new_city: response.data.city,
                    new_address: response.data.address,
                })
            })
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


    handleHomeTown() {
        this.setState({home_town_checked: !this.state.home_town_checked})
        if (this.state.home_town_checked === true) {
            let sub;
            for (let i = 0; i < this.state.subs.length; i++) {
                if (this.state.subs[i].country === this.state.country && this.state.subs[i].city === this.state.city) {
                    sub = this.state.subs[i];
                    this.deleteSub(sub.id)
                }

            }
        } else {
            axios.post(SUBSCRIPTIONS_URL, {
                country: this.state.country,
                city: this.state.city
            }, getHeader())
                .then(response => {
                    console.log(response)
                    this.handleShowSubs()
                })
        }
    }

    componentDidMount() {
        this.getProfile()
        this.handleShowSubs()
    }


    render() {

        let subs = this.state.subs.map((sub) => {
                if (sub.country === this.state.country && sub.city === this.state.city) {
                    return (
                        <ListGroup key={sub.id}>
                            <span> {sub.country}, {sub.city},  <MdOutlineHome/> </span>
                        </ListGroup>
                    )
                } else {
                    return (
                        <ListGroup key={sub.id}>
                            {sub.country}, {sub.city}
                        </ListGroup>
                    )
                }

            }
        )


        return (
            <>
                {/*<Header/>*/}

                <Container>
                    <h1> User Details</h1>
                    <hr/>
                    <p>
                        <strong> First Name: </strong> {this.state.first_name}


                    </p>
                    <p>
                        <strong>Last Name:</strong> {this.state.last_name}
                    </p>
                    <p>
                        <strong> Country:</strong> {this.state.country}
                    </p>
                    <p>
                        <strong> City:</strong> {this.state.city}
                    </p>
                    <p>
                        <strong>Address:</strong> {this.state.address}
                    </p>

                    <p>
                        <Button onClick={this.handleShow}>
                            Edit
                        </Button>
                    </p>

                    <h6><em>Subscriptions:</em></h6>
                    <p>
                        {subs}
                    </p>


                    <Modal show={this.state.setShow} onHide={this.handleClose}>
                        <Form onSubmit={this.handleSubmit}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit User Profile</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form.Group>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={this.state.new_first_name}
                                        onChange={(event) => this.setState({new_first_name: event.target.value})}
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={this.state.new_last_name}
                                        onChange={(event) => this.setState({new_last_name: event.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={this.state.new_country}
                                        onChange={(event) => this.setState({new_country: event.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>City</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={this.state.new_city}
                                        onChange={(event) => this.setState({new_city: event.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={this.state.new_address}
                                        onChange={(event) => this.setState({new_address: event.target.value})}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check
                                        type="switch"
                                        id="custom-switch"
                                        label="Subscribe to home town"
                                        checked={this.state.home_town_checked}
                                        onChange={this.handleHomeTown}
                                    />
                                </Form.Group>

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                                <Button variant="primary" type="submit" onClick={this.handleClose}>Save</Button>
                            </Modal.Footer>
                        </Form>
                    </Modal>


                </Container>

            </>
        )
    }
}