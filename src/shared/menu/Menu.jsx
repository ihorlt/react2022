import React, { useContext } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { firebaseService } from "../../FirebaseService";
import { UserContext } from "../../context/UserContext";

const Menu = () => {
    const { user, setUser } = useContext(UserContext);
    const logOut = (e) => {
        firebaseService.logout()
            .then(() => {
                setUser({
                    email: "",
                    password: "",
                    auth: null,
                    firebaseUser: null,
                    courses: []
                });
                window.location.href = "/";
            });
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={ Link } to="/home">Courses</Navbar.Brand>
                <Navbar.Toggle />
                <Nav className="me-auto">
                    <Nav.Link as={ Link } to="/selection">Вибрати</Nav.Link>
                    <Nav.Link as={ Link } to="/cab">Кабінет</Nav.Link>
                </Nav>

                <Navbar.Collapse className="justify-content-end">

                    { user.email.length > 6 ?
                        <>
                            <Navbar.Text >
                                <a href="#login">{ user.email }</a>
                            </Navbar.Text>

                            <Button className="ms-3" variant="outline-light" type="button" onClick={e => logOut(e)}>
                                Вихід
                            </Button>


                        </>
                        :
                        ""
                    }



                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;
