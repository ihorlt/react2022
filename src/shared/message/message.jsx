import React, { useState } from "react";
import { Alert } from "react-bootstrap";

function Message({type, heading, text}) {
    const [show, setShow] = useState(true);
    return (
        <Alert variant={type} show={show} onClose={() => setShow(false)} dismissible>
            {heading ? <Alert.Heading>{heading}</Alert.Heading> : ""}
            {text ? <p>{text}</p> : ""}
        </Alert>
    );
}

export default Message;
