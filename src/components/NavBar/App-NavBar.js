// src/components/NavBar/NavBar.js
import React from 'react';
import './style.css'
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const AppNavBar = ({ isDarkMode, toggleDarkMode }) => {
    return (
        <Navbar bg={isDarkMode ? 'dark' : 'light'} variant={isDarkMode ? 'dark' : 'light'} expand="lg">
            <Container>
                <Navbar.Brand href="#home">«Speechy»</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link> */}
                    </Nav>
                    <Button onClick={toggleDarkMode} variant={isDarkMode ? 'light' : 'dark'}>
                        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavBar;