import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import {WrappedLoginScreen} from './LoginScreen';
import {Routes, Route} from "react-router-dom";
import {Dashboard} from "./Dashboard";
import {Subscriptions} from './Subscriptions';
import {Container} from 'react-bootstrap';
import {UserProfile} from "./UserProfile";
import {Header} from "./Header";


class App extends React.Component {


    render() {
        return (
            <Container>
                <Header/>
                <Routes>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/subscriptions" element={<Subscriptions/>}/>
                    <Route path="/login" element={<WrappedLoginScreen/>}/>
                    <Route path="/userprofile" element={<UserProfile/>}/>
                    <Route path="/" element={<Dashboard/>}/>
                </Routes>
            </Container>
        )
    }

}

export default App;