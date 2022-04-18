import React from 'react';
import Container from 'react-bootstrap/Container';
import { Header } from './Header';

export class Dashboard extends React.Component {

    render() {
        return(
            <>
                {/*<Header/>*/}
                <Container>
                    <h1>Dashboard content</h1>
                </Container>
            </>
        )
    }
}