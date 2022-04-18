import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import axios from 'axios'

export class Header extends React.Component {

    constructor(props) {
        super(props)

        this.state = {

            first_name: "",
            last_name: "",
        }
    }

    componentDidMount() {
        const token = window.localStorage.getItem('token')
        if (token) {
            axios.get('http://127.0.0.1:8000/weather/users/current', {headers: {Authorization: 'Token ' + token}})
                .then(response => {
                    if (response.status === 200) {
                        console.log("got response for user " + response.data.first_name)
                        this.setState({first_name: response.data.first_name, last_name: response.data.last_name})
                    } else if (response.status === 401) {
                        console.log('401')
                    }
                })
                .catch(error => {
                    if (error.response.status === 401) {
                        console.log("Need to go to login")
                        this.setState({screen: "login"})
                    }

                })
        }
    }

    render() {
        return(
            <Navbar>
                <Container>
                    <Navbar.Brand href="/">Weather App</Navbar.Brand>
                    <Navbar.Toggle /> {/* this does nothing right now*/}
                    <Nav.Link href="/">Dashboard</Nav.Link>
                    <Nav.Link href="/subscriptions">My subscriptions</Nav.Link>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: <a href="/userprofile">{this.state.first_name + ' ' + this.state.last_name}</a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}