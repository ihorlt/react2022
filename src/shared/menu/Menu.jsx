import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

const Menu = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="home">Courses</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="selection">Вибрати</Nav.Link>
                    <Nav.Link href="cab">Кабінет</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Menu;
