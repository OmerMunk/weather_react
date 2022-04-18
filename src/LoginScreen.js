import React from 'react';
import Form from 'react-bootstrap/Form'
import { Button } from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import {useLocation,} from "react-router-dom";

export class LoginScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        event.preventDefault()
        // window.localStorage.setItem("username", this.state.username)
        // window.localStorage.setItem("password", this.state.password)
        axios.post('http://127.0.0.1:8000/weather/token/', {
            username: this.state.username,
            password: this.state.password
        })
            .then(result => {
                window.localStorage.setItem("token", result.data.token)
                console.log(result)
                this.props.navigate('/')
            })
            .catch(error => window.alert(error))

    }

    render() {
        return(
            <Form  onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter username"
                                  value={this.state.username}
                                  onChange={(event) => this.setState({username: event.target.value})}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"
                                  value={this.state.password}
                                  onChange={(event) => this.setState({password: event.target.value})}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        )
    }
}

export const WrappedLoginScreen = props => {

    const location = useLocation()
    const navigate = useNavigate()

    return <LoginScreen navigate={navigate} location={location} {...props} />
}