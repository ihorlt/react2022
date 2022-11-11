import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import Login from "./Login/Login";
import { firebaseService } from "../../FirebaseService";

const Cabinet = () => {
    const { user, setUser } = useContext(UserContext);
    console.log("user", user);

    useEffect(() => {
        if (firebaseService.auth.currentUser) {
            setUser({...user, email: firebaseService.auth.currentUser.email, password: "true", auth: firebaseService.auth});
        }
    }, []);

    if (user.auth) {
        firebaseService.getCourses()
            .then(courses => console.log("courses", courses));
    }
    return (
        <div className="container-fluid">
            {user.auth ? user.email.toString() : <Login/> }
        </div>
    );
};

export default Cabinet;
