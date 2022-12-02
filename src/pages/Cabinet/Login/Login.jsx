import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from "../../../context/UserContext";
import { Button, Form } from "react-bootstrap";
import { firebaseService } from "../../../FirebaseService";
import Message from "../../../shared/message/message";
import {signInWithEmailAndPassword} from "firebase/auth";

const Login = () => {
    const { user, setUser } = useContext(UserContext);
    const [emailInput, setEmailInput] = useState("");
    const [passInput, setPassInput] = useState("");
    const [groupInput, setGroupInput] = useState("");
    const [nameInput, setNameInput] = useState("");
    const [surnameInput, setSurnameInput] = useState("");
    const [groupInputOptions, setGroupInputOptions] = useState([]);

    const [isSignup, setIsSignup] = useState(false);

    const [emailError, setEmailError] = useState("");
    const [emailSuccess, setEmailSuccess] = useState("");
    const [groupError, setGroupError] = useState("");
    const [nameError, setNameError] = useState("");
    const [surnameError, setSurnameError] = useState("");
    const [passError, setPassError] = useState("");

    const [isSend, setIsSend] = useState(false);

    const [isMessage, setIsMessage] = useState(false);
    const [message, setMessage] = useState({});

    useEffect(() => {
        setGroupInputOptions([...user.groups]);
    }, [user.groups]);

    const login = (e) => {
        e.preventDefault();
        let isError = false;
        setEmailSuccess("");
        setEmailError("");
        setGroupError("");
        setNameError("");
        setSurnameError("");
        setPassError("");
        setIsSend(true);
        if (isSignup) {
            if (emailInput.indexOf("@nung.edu.ua") < 0) {
                // setIsMessage(true);
                // setMessage({type: "danger", heading:"Помилка", text: "Невірний тип електронної пошти, використайте пошту університету"});
                setEmailError("Введіть email університету '@nung.edu.ua'");
                isError = true;
            }
            if (groupInput.length === 0) {
                setGroupError("Введіть Вашу групу");
                isError = true;
            }
            if (nameInput.length < 2) {
                setNameError("Введіть Ім'я");
                isError = true;
            }
            if (surnameInput.length < 2) {
                setSurnameError("Введіть прізвище");
                isError = true;
            }
            if (passInput.length < 5) {
                setPassError("Введіть пароль не менше 6 символів");
                isError = true;
            }
            if (isError) {
                return;
            }
            firebaseService.signup(emailInput, passInput, nameInput, surnameInput, groupInput)
                .then(userAuth => {
                    setUser({...user, email: emailInput, group: groupInputOptions, name: nameInput, surname: surnameInput,
                        auth: userAuth});
                }).catch(err => {
                console.log(err);
            });
        } else {
            firebaseService.login(emailInput, passInput)
                .then(userAuth => {
                    setUser({...user, email: emailInput, group: groupInputOptions, name: nameInput, surname: surnameInput,
                        auth: userAuth});
                    firebaseService.saveUser(emailInput, userAuth.user.uid);
                }).catch((error) => {
                    setMessage({type: "danger", heading:"Помилка", text: error.message});
                    setIsMessage(true);
                    console.log("code", error.code);
                    console.log("errors", error.message);
                    console.log(error);
            });
        }

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

    const setSignup = (e) => {
        e.preventDefault();
        setIsSignup(!isSignup);
    }

    return (
        <div className="main-min-height row align-items-center justify-content-center">
            {isMessage ?
                <div className="col-12 align-self-start">
                    <Message type={message.type} heading={message.heading} text={message.text} />
                </div>
                : ""
            }

            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
                <div className="row">
                    <div className="col-12">
                        <h3>{isSignup ? "Реєстрація" : "Логін"}</h3>
                    </div>
                </div>
                <Form className="row" noValidate>
                    <Form.Group className="mb-2 col-12" controlId="formLoginEmail">
                        <Form.Label className="float-start">Email</Form.Label>
                        <Form.Control type="email" placeholder="Email"
                                      value={emailInput}
                                      onChange={e => setEmailInput(e.target.value)}
                                      isValid={isSend && emailError.length === 0}
                                      isInvalid={isSend && emailError.length > 0}
                        />
                        <Form.Text className="text-muted">
                            Корпоративний, @nung.edu.ua
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            {emailError}
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>{emailSuccess}</Form.Control.Feedback>
                    </Form.Group>

                    {isSignup ?
                        <Form.Group className="mb-4 col-12" controlId="formSignup">
                            <Form.Label className="float-start">Група</Form.Label>
                            <Form.Select aria-label="Група" placeholder="Група"
                                 value={groupInput}
                                 onChange={e => setGroupInput(e.target.value)}
                                 isValid={isSend && groupError.length === 0}
                                 isInvalid={isSend && groupError.length > 0}
                            >
                                <option value="">Група</option>
                                {groupInputOptions.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {groupError}
                            </Form.Control.Feedback>
                        </Form.Group> : ""
                    }

                    {isSignup ?
                        <Form.Group className="mb-4 col-12" controlId="formName">
                            <Form.Label className="float-start">Ім'я</Form.Label>
                            <Form.Control type="text" placeholder="Ім'я"
                                          value={nameInput}
                                          onChange={e => setNameInput(e.target.value)}
                                          isValid={isSend && nameError.length === 0}
                                          isInvalid={isSend && nameError.length > 0}
                            />
                            <Form.Control.Feedback type="invalid">
                                {nameError}
                            </Form.Control.Feedback>
                        </Form.Group> : ""
                    }

                    {isSignup ?
                        <Form.Group className="mb-4 col-12" controlId="formSurname">
                            <Form.Label className="float-start">Прізвище</Form.Label>
                            <Form.Control type="text" placeholder="Прізвище"
                                          value={surnameInput}
                                          onChange={e => setSurnameInput(e.target.value)}
                                          isValid={isSend && surnameError.length === 0}
                                          isInvalid={isSend && surnameError.length > 0}
                            />
                            <Form.Control.Feedback type="invalid">
                                {surnameError}
                            </Form.Control.Feedback>
                        </Form.Group> : ""
                    }

                    <Form.Group className="mb-2 col-12" controlId="formLoginPassword">
                        <Form.Label className="float-start">Пароль</Form.Label>
                        <Form.Control type="password" placeholder="Пароль"
                                      value={passInput}
                                      onChange={e => setPassInput(e.target.value)}
                                      isValid={isSend && passError.length === 0}
                                      isInvalid={isSend && passError.length > 0}
                        />
                        <Form.Control.Feedback type="invalid">
                            {passError}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <div className="col-6">
                        <Button variant="link" type="button" onClick={e => forgotPassword(e)}>
                            Забули пароль?
                        </Button>
                    </div>
                    <div className="col-6">
                        <Button variant="link" type="button" onClick={e => setSignup(e)}>
                            {isSignup ? "Вже зареєстрований" : "Зареєструватись..."}
                        </Button>
                    </div>
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
