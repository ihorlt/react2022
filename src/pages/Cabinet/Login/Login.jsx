import React, { useContext, useState } from 'react';
import { UserContext } from "../../../context/UserContext";
import { Button, Form } from "react-bootstrap";
import { firebaseService } from "../../../FirebaseService";

const Login = () => {
    const { user, setUser } = useContext(UserContext);
    let [emailInput, setEmailInput] = useState("");
    let [passInput, setPassInput] = useState("");
    let [emailError, setEmailError] = useState("");
    let [emailSuccess, setEmailSuccess] = useState("");

    const login = (e) => {
        e.preventDefault();
        setEmailSuccess("");
        setEmailError("");
        firebaseService.login(emailInput, passInput)
            .then(userAuth => {
                setUser({...user, email: emailInput, password: passInput, auth: userAuth});
                firebaseService.saveUser(emailInput, userAuth.user.uid);
            }).catch(err => {
            console.log(err);
        });
    }

    const loginWithGoogle = (e) => {
        e.preventDefault();
        setEmailSuccess("");
        setEmailError("");
        firebaseService.loginWithGoogle()
            .then(userAuth => {
                setUser({...user, email: userAuth.email, password: "loginWithGoogle", auth: userAuth});
                firebaseService.saveUser(userAuth.email, userAuth.uid);
            }).catch(err => {
            console.log(err);
        });

    }

    const forgotPassword = (e) => {
        e.preventDefault();
        setEmailSuccess("");
        setEmailError("");
        if (emailInput.length < 6) {
            setEmailError("Введіть коректну адресу пошти");
            return;
        }
        firebaseService.sendPasswordResetEmail(emailInput)
            .then(() => {
                setEmailSuccess("Посилання для створення паролю відіслано на пошту");
            }).catch(() => {
            setEmailError("Невірна Email адреса");
        })
    }

    return (
        <div className="main-min-height  row align-items-center justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
                <Form className="row">
                    <Form.Group className="mb-2 col-12" controlId="formLoginEmail">
                        <Form.Label className="float-start">Email</Form.Label>
                        <Form.Control type="email" placeholder="Email"
                                      value={emailInput}
                                      onChange={e => setEmailInput(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            Корпоративний, @nung.edu.ua
                        </Form.Text>
                        {emailError.length > 0 ?
                            <Form.Text className="d-block text-danger">
                                {emailError}
                            </Form.Text> : ""
                        }
                        {emailSuccess.length > 0 ?
                            <Form.Text className="d-block text-success">
                                {emailSuccess}
                            </Form.Text> : ""
                        }

                    </Form.Group>

                    <Form.Group className="mb-2 col-12" controlId="formLoginPassword">
                        <Form.Label className="float-start">Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароль"
                                      value={passInput}
                                      onChange={e => setPassInput(e.target.value)}
                        />
                    </Form.Group>

                    <div className="col-6">
                        <Button variant="link" type="button" onClick={e => forgotPassword(e)}>
                            Забули пароль?
                        </Button>
                    </div>
                    <div className="col-6">Зареєструватись...</div>
                    <div className="col-6">
                        <Button variant="link" type="button" onClick={e => loginWithGoogle(e)}>
                            Логін з Google
                        </Button>
                    </div>
                    <div className="col-6"></div>

                    <div className="mt-1 col-12">
                        <Button variant="primary" type="submit" className="float-end" onClick={e => login(e)}>
                            Відіслати
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login;
